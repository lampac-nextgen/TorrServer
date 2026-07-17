import { useState, useEffect, useMemo, useRef, type KeyboardEvent, type SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import axios, { isAxiosError } from 'axios'
import {
  TextField,
  Button,
  Chip,
  CircularProgress,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  type SelectChangeEvent,
} from '@mui/material'
import { CloudDownload as DownloadIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material'
import { torznabSearchHost, torrentsHost, settingsHost, searchHost } from 'utils/Hosts'
import useOnStandaloneAppOutsideClick from 'utils/useOnStandaloneAppOutsideClick'
import { StyledDialog, StyledHeader } from 'style/CustomMaterialUiStyles'
import { LAYOUT_MOBILE_MEDIA } from 'style/materialUISetup'
import { parseSizeToBytes, formatSizeToClassicUnits } from 'utils/Utils'
import { getMoviePosters, shortenTitleForPosterSearch } from 'components/Add/helpers'
import { buttonLoadingIcon } from 'utils/buttonLoading'
import type { BTSets, SearchResultItem, TorznabUrl } from 'types/api'
import { beginSearchRequest, isCurrentSearch } from './searchRequest'

import {
  Content,
  SearchBody,
  SearchToolbar,
  ResultsBar,
  ResultsCount,
  ResultsScroll,
  EmptyState,
  ResultList,
  ResultRow,
  ResultMain,
  ResultTitle,
  MetaBadges,
  ResultAction,
  Footer,
} from './style'

export interface SearchDialogProps {
  handleClose: () => void
}

type SortField = 'size' | 'seeds' | 'peers'
type SortDirection = 'asc' | 'desc'
type TrackerSelection = number | 'rutor'

const resultDedupeKey = (item: SearchResultItem): string =>
  (item.Hash || item.Magnet || item.Link || item.Title || '').toLowerCase()

const mergeSearchResults = (...lists: SearchResultItem[][]): SearchResultItem[] => {
  const seen = new Set<string>()
  const out: SearchResultItem[] = []
  for (const list of lists) {
    for (const item of list || []) {
      const key = resultDedupeKey(item)
      if (key) {
        if (seen.has(key)) continue
        seen.add(key)
      }
      out.push(item)
    }
  }
  return out
}

const axiosErrorMessage = (err: unknown, fallback: string): string => {
  if (isAxiosError(err)) {
    const data = err.response?.data as { error?: string } | undefined
    if (data?.error) return String(data.error)
    if (err.message) return err.message
  }
  if (err instanceof Error && err.message) return err.message
  return fallback
}

export default function SearchDialog({ handleClose }: SearchDialogProps) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [adding, setAdding] = useState(false)
  const [addingKey, setAddingKey] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [trackers, setTrackers] = useState<TorznabUrl[]>([])
  const [enableRutor, setEnableRutor] = useState(false)
  const [enableTorznab, setEnableTorznab] = useState(false)
  const [selectedTracker, setSelectedTracker] = useState<TrackerSelection>(-1)
  const [sortField, setSortField] = useState<SortField>('seeds')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [settingsLoaded, setSettingsLoaded] = useState(false)
  const userSortedRef = useRef(false)
  const searchAbortRef = useRef<AbortController | null>(null)
  const searchGenRef = useRef(0)
  const fullScreen = useMediaQuery(LAYOUT_MOBILE_MEDIA)
  const ref = useOnStandaloneAppOutsideClick(handleClose)

  const hasTorznab = enableTorznab && trackers.length > 0
  const hasRutor = enableRutor
  const hasAnySource = hasTorznab || hasRutor
  const showAllTrackers = hasTorznab

  useEffect(() => {
    const ac = new AbortController()
    axios
      .post(settingsHost(), { action: 'get' }, { signal: ac.signal })
      .then(({ data }: { data?: BTSets }) => {
        if (data) {
          const urls = data.TorznabUrls || []
          const torznabOn = !!data.EnableTorznabSearch
          const rutorOn = !!data.EnableRutorSearch
          setTrackers(urls)
          setEnableTorznab(torznabOn)
          setEnableRutor(rutorOn)
          if (torznabOn && urls.length > 0) {
            setSelectedTracker(-1)
          } else if (rutorOn) {
            setSelectedTracker('rutor')
          }
        }
      })
      .catch(err => {
        if (!axios.isCancel(err) && err?.code !== 'ERR_CANCELED') {
          /* ignore settings load errors */
        }
      })
      .finally(() => {
        if (!ac.signal.aborted) setSettingsLoaded(true)
      })
    return () => ac.abort()
  }, [])

  useEffect(
    () => () => {
      searchAbortRef.current?.abort()
    },
    [],
  )

  const handleSearch = async () => {
    if (!query || !hasAnySource) return

    const { ac, gen } = beginSearchRequest(searchAbortRef, searchGenRef)

    setLoading(true)
    setSearched(true)
    setResults([])
    try {
      if (selectedTracker === -1) {
        const requests: Promise<SearchResultItem[]>[] = []
        if (hasTorznab) {
          requests.push(
            axios
              .get<SearchResultItem[]>(torznabSearchHost(), { params: { query }, signal: ac.signal })
              .then(({ data }) => data || []),
          )
        }
        if (hasRutor) {
          requests.push(
            axios
              .get<SearchResultItem[]>(searchHost(), { params: { query }, signal: ac.signal })
              .then(({ data }) => data || []),
          )
        }
        if (requests.length === 0) {
          if (isCurrentSearch(gen, searchGenRef.current, ac.signal)) setErrorMsg(t('Torznab.NoSearchSources'))
          return
        }
        const settled = await Promise.allSettled(requests)
        if (!isCurrentSearch(gen, searchGenRef.current, ac.signal)) return

        const lists: SearchResultItem[][] = []
        let firstError: unknown
        for (const result of settled) {
          if (result.status === 'fulfilled') {
            lists.push(result.value)
          } else if (!firstError && !axios.isCancel(result.reason) && result.reason?.code !== 'ERR_CANCELED') {
            firstError = result.reason
          }
        }
        if (lists.length === 0) {
          throw firstError || new Error(t('Torznab.SearchFailed'))
        }
        const merged = mergeSearchResults(...lists)
        setResults(merged)
        if (!userSortedRef.current && merged.length > 0) {
          setSortField('seeds')
          setSortDirection('desc')
        }
        return
      }

      let url = torznabSearchHost()
      const params: { query: string; index?: number } = { query }

      if (selectedTracker === 'rutor') {
        url = searchHost()
      } else if (typeof selectedTracker === 'number') {
        params.index = selectedTracker
      }

      const { data } = await axios.get<SearchResultItem[]>(url, { params, signal: ac.signal })
      if (!isCurrentSearch(gen, searchGenRef.current, ac.signal)) return
      const next = data || []
      setResults(next)
      if (!userSortedRef.current && next.length > 0) {
        setSortField('seeds')
        setSortDirection('desc')
      }
    } catch (err) {
      if (axios.isCancel(err) || (isAxiosError(err) && err.code === 'ERR_CANCELED')) return
      if (!isCurrentSearch(gen, searchGenRef.current, ac.signal)) return
      setErrorMsg(axiosErrorMessage(err, t('Torznab.SearchFailed')))
    } finally {
      if (gen === searchGenRef.current) setLoading(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleAdd = async (item: SearchResultItem) => {
    const key = resultDedupeKey(item) || item.Title || 'item'
    setAdding(true)
    setAddingKey(key)
    try {
      const link = item.Magnet || item.Link
      if (!link) {
        setErrorMsg(t('Torznab.NoLinkFound'))
        return
      }
      let poster = item.Poster
      if (!poster && item.Title) {
        const posterQuery = shortenTitleForPosterSearch(item.Title)
        if (posterQuery) {
          const urlList = await getMoviePosters(posterQuery, 'en')
          const [firstPosterUrl] = urlList || []
          if (firstPosterUrl) poster = firstPosterUrl
        }
      }
      await axios.post(torrentsHost(), {
        action: 'add',
        link,
        title: item.Title,
        save_to_db: true,
        poster: poster || '',
      })
      setSuccessMsg(t('Torznab.TorrentAddedSuccessfully'))
    } catch {
      setErrorMsg(t('Torznab.FailedToAddTorrent'))
    } finally {
      setAdding(false)
      setAddingKey(null)
    }
  }

  const handleAlertClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccessMsg('')
    setErrorMsg('')
  }

  const handleSortChip = (field: SortField) => {
    userSortedRef.current = true
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortField(field)
    setSortDirection('desc')
  }

  const sortedResults = useMemo(() => {
    if (results.length === 0) return results

    const sorted = [...results].sort((a, b) => {
      let aVal: number
      let bVal: number

      switch (sortField) {
        case 'size':
          aVal = parseSizeToBytes(a.Size || '0')
          bVal = parseSizeToBytes(b.Size || '0')
          break
        case 'seeds':
          aVal = a.Seed || 0
          bVal = b.Seed || 0
          break
        case 'peers':
          aVal = a.Peer || 0
          bVal = b.Peer || 0
          break
        default:
          return 0
      }

      if (aVal === bVal) return 0
      return sortDirection === 'asc' ? (aVal < bVal ? -1 : 1) : aVal > bVal ? -1 : 1
    })

    return sorted
  }, [results, sortField, sortDirection])

  const emptyMessage = (() => {
    if (!settingsLoaded) return null
    if (!hasAnySource) {
      if (enableTorznab && trackers.length === 0) return t('Torznab.NoIndexersConfigured')
      return t('Torznab.NoSearchSources')
    }
    if (loading) return null
    if (searched && results.length === 0) return t('Torznab.NoResultsFound')
    return null
  })()

  const sortFields: { field: SortField; label: string }[] = [
    { field: 'size', label: t('Torznab.SortBySize') },
    { field: 'seeds', label: t('Torznab.SortBySeeds') },
    { field: 'peers', label: t('Torznab.SortByPeers') },
  ]

  return (
    <StyledDialog open onClose={handleClose} fullScreen={fullScreen} fullWidth maxWidth='md' ref={ref}>
      <StyledHeader>{t('Torznab.SearchTorrents')}</StyledHeader>
      <Content>
        <SearchBody>
          <SearchToolbar>
            <FormControl variant='outlined' size='small' className='search-tracker' disabled={!hasAnySource}>
              <InputLabel>{t('Tracker')}</InputLabel>
              <Select
                value={selectedTracker}
                onChange={(e: SelectChangeEvent<TrackerSelection>) =>
                  setSelectedTracker(e.target.value as TrackerSelection)
                }
                label={t('Tracker')}
              >
                {showAllTrackers && <MenuItem value={-1}>{t('AllTrackers')}</MenuItem>}
                {hasRutor && <MenuItem value='rutor'>{t('Rutor')}</MenuItem>}
                {hasTorznab &&
                  trackers.map((tracker, index) => (
                    <MenuItem key={`${tracker.Host}-${tracker.Key}`} value={index}>
                      {tracker.Name || tracker.Host}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              className='search-query'
              label={t('Torznab.SearchQuery')}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              variant='outlined'
              size='small'
              fullWidth
              placeholder={t('Torznab.SearchMoviesShows')}
              autoFocus
              disabled={!hasAnySource}
            />
            <Button
              className='search-submit'
              variant='contained'
              color='primary'
              onClick={handleSearch}
              disabled={loading || !hasAnySource || !query}
              startIcon={buttonLoadingIcon(loading)}
            >
              {t('Search')}
            </Button>
          </SearchToolbar>

          {searched && results.length > 0 && (
            <ResultsBar>
              <ResultsCount>{t('Torznab.ResultsCount', { count: results.length })}</ResultsCount>
              <ToggleButtonGroup
                exclusive
                size='small'
                value={sortField}
                onChange={(_, field: SortField | null) => {
                  if (field) handleSortChip(field)
                }}
                aria-label={t('Torznab.SortBy')}
                sx={{ flexWrap: 'wrap', gap: 0.5 }}
              >
                {sortFields.map(({ field, label }) => {
                  const active = sortField === field
                  return (
                    <ToggleButton
                      key={field}
                      value={field}
                      selected={active}
                      title={
                        active
                          ? sortDirection === 'asc'
                            ? t('Torznab.SortAscending')
                            : t('Torznab.SortDescending')
                          : t('Torznab.SortBy')
                      }
                      sx={{
                        textTransform: 'none',
                        px: 1.25,
                        height: 28,
                        borderRadius: '14px !important',
                        border: theme => `1px solid ${theme.palette.divider} !important`,
                        '&.Mui-selected': { fontWeight: 600 },
                      }}
                    >
                      {label}
                      {active &&
                        (sortDirection === 'asc' ? (
                          <ArrowUpward sx={{ ml: 0.5, fontSize: 14 }} />
                        ) : (
                          <ArrowDownward sx={{ ml: 0.5, fontSize: 14 }} />
                        ))}
                    </ToggleButton>
                  )
                })}
              </ToggleButtonGroup>
            </ResultsBar>
          )}

          <ResultsScroll>
            {loading && (
              <EmptyState>
                <CircularProgress color='secondary' size={32} />
              </EmptyState>
            )}

            {!loading && emptyMessage && (
              <EmptyState>
                <Typography variant='body2' color='text.secondary'>
                  {emptyMessage}
                </Typography>
              </EmptyState>
            )}

            {!loading && sortedResults.length > 0 && (
              <ResultList>
                {sortedResults.map((item, index) => {
                  const sizeBytes = parseSizeToBytes(item.Size || '0')
                  const formattedSize = formatSizeToClassicUnits(sizeBytes)
                  const itemKey = resultDedupeKey(item) || `${item.Title || 'item'}-${index}`
                  const isAddingThis = adding && addingKey === itemKey
                  return (
                    <ResultRow
                      key={itemKey}
                      role='button'
                      tabIndex={0}
                      onClick={() => !adding && handleAdd(item)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          if (!adding) handleAdd(item)
                        }
                      }}
                    >
                      <ResultMain>
                        <ResultTitle>{item.Title}</ResultTitle>
                        <MetaBadges>
                          <Chip size='small' label={formattedSize} variant='outlined' />
                          <Chip
                            size='small'
                            label={`S ${item.Seed || 0}`}
                            color='success'
                            variant='outlined'
                            sx={{ bgcolor: 'rgba(0, 167, 114, 0.12)' }}
                          />
                          <Chip size='small' label={`P ${item.Peer || 0}`} variant='outlined' />
                        </MetaBadges>
                      </ResultMain>
                      <ResultAction>
                        <IconButton
                          edge='end'
                          aria-label='add'
                          onClick={e => {
                            e.stopPropagation()
                            handleAdd(item)
                          }}
                          disabled={adding}
                          size='small'
                          sx={{ minWidth: 40, minHeight: 40 }}
                        >
                          {isAddingThis ? (
                            <CircularProgress size={18} color='secondary' />
                          ) : (
                            <DownloadIcon color='secondary' />
                          )}
                        </IconButton>
                      </ResultAction>
                    </ResultRow>
                  )
                })}
              </ResultList>
            )}
          </ResultsScroll>
        </SearchBody>
      </Content>

      <Snackbar open={!!successMsg} autoHideDuration={1500} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity='success' variant='filled' sx={{ width: '100%' }}>
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={!!errorMsg} autoHideDuration={1500} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity='error' variant='filled' sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>

      <Footer>
        <Button onClick={handleClose} color='secondary' variant='outlined'>
          {t('Close')}
        </Button>
      </Footer>
    </StyledDialog>
  )
}

import { useState, useEffect, useMemo, type KeyboardEvent, type SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import axios, { isAxiosError } from 'axios'
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Typography,
  Divider,
  IconButton,
  Snackbar,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
} from '@mui/material'
import { CloudDownload as DownloadIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material'
import { torznabSearchHost, torrentsHost, settingsHost, searchHost } from 'utils/Hosts'
import useOnStandaloneAppOutsideClick from 'utils/useOnStandaloneAppOutsideClick'
import { StyledDialog, StyledHeader } from 'style/CustomMaterialUiStyles'
import { parseSizeToBytes, formatSizeToClassicUnits } from 'utils/Utils'
import { getMoviePosters, shortenTitleForPosterSearch } from 'components/Add/helpers'
import type { BTSets, SearchResultItem, TorznabUrl } from 'types/api'
import { useTheme } from 'styled-components'

import { Content } from './style'

export interface SearchDialogProps {
  handleClose: () => void
}

type SortField = '' | 'size' | 'seeds' | 'peers'
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
  const scTheme = useTheme()
  const chromeBorder = scTheme.settingsDialog.contentBG
  const chromeSurface = scTheme.app.paperColor
  const separatorColor = scTheme.addDialog.separatorColor
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [adding, setAdding] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [trackers, setTrackers] = useState<TorznabUrl[]>([])
  const [enableRutor, setEnableRutor] = useState(false)
  const [enableTorznab, setEnableTorznab] = useState(false)
  const [selectedTracker, setSelectedTracker] = useState<TrackerSelection>(-1)
  const [sortField, setSortField] = useState<SortField>('')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [settingsLoaded, setSettingsLoaded] = useState(false)
  const fullScreen = useMediaQuery('(max-width:930px)')
  const isMobile = useMediaQuery('(max-width:600px)')
  const ref = useOnStandaloneAppOutsideClick(handleClose)

  const hasTorznab = enableTorznab && trackers.length > 0
  const hasRutor = enableRutor
  const hasAnySource = hasTorznab || hasRutor
  const showAllTrackers = hasTorznab

  useEffect(() => {
    axios
      .post(settingsHost(), { action: 'get' })
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
      .catch(() => {})
      .finally(() => setSettingsLoaded(true))
  }, [])

  const handleSearch = async () => {
    if (!query || !hasAnySource) return
    setLoading(true)
    setSearched(true)
    setResults([])
    try {
      if (selectedTracker === -1) {
        const requests: Promise<SearchResultItem[]>[] = []
        if (hasTorznab) {
          requests.push(
            axios.get<SearchResultItem[]>(torznabSearchHost(), { params: { query } }).then(({ data }) => data || []),
          )
        }
        if (hasRutor) {
          requests.push(
            axios.get<SearchResultItem[]>(searchHost(), { params: { query } }).then(({ data }) => data || []),
          )
        }
        if (requests.length === 0) {
          setErrorMsg(t('Torznab.NoSearchSources'))
          return
        }
        const settled = await Promise.allSettled(requests)
        const lists: SearchResultItem[][] = []
        let firstError: unknown
        for (const result of settled) {
          if (result.status === 'fulfilled') {
            lists.push(result.value)
          } else if (!firstError) {
            firstError = result.reason
          }
        }
        if (lists.length === 0) {
          throw firstError || new Error(t('Torznab.SearchFailed'))
        }
        setResults(mergeSearchResults(...lists))
        return
      }

      let url = torznabSearchHost()
      const params: { query: string; index?: number } = { query }

      if (selectedTracker === 'rutor') {
        url = searchHost()
      } else if (typeof selectedTracker === 'number') {
        params.index = selectedTracker
      }

      const { data } = await axios.get<SearchResultItem[]>(url, { params })
      setResults(data || [])
    } catch (err) {
      setErrorMsg(axiosErrorMessage(err, t('Torznab.SearchFailed')))
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleAdd = async (item: SearchResultItem) => {
    setAdding(true)
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
    }
  }

  const handleAlertClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccessMsg('')
    setErrorMsg('')
  }

  const toggleSortDirection = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const sortedResults = useMemo(() => {
    if (!sortField || results.length === 0) return results

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
      if (!enableTorznab && !enableRutor) return t('Torznab.NoSearchSources')
      return t('Torznab.NoSearchSources')
    }
    if (searched && results.length === 0 && !loading) return t('Torznab.NoResultsFound')
    return null
  })()

  return (
    <StyledDialog open onClose={handleClose} fullScreen={fullScreen} fullWidth maxWidth='md' ref={ref}>
      <StyledHeader>{t('Torznab.SearchTorrents')}</StyledHeader>
      <Content $isLoading={loading}>
        <div style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '20px',
              alignItems: 'flex-start',
              flexWrap: fullScreen ? 'wrap' : 'nowrap',
            }}
          >
            <FormControl
              variant='outlined'
              size='small'
              style={{
                minWidth: 150,
                flex: fullScreen ? '1 1 100%' : '0 0 auto',
              }}
              disabled={!hasAnySource}
            >
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
              label={t('Torznab.SearchTorznab')}
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
              variant='contained'
              color='primary'
              onClick={handleSearch}
              disabled={loading || !hasAnySource || !query}
              style={{
                minWidth: fullScreen ? '80px' : '100px',
                height: '40px',
              }}
            >
              {loading ? <CircularProgress size={24} color='inherit' /> : t('Search')}
            </Button>
          </div>

          {searched && results.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: isMobile ? '8px' : '4px',
                marginBottom: '16px',
                alignItems: 'center',
                padding: isMobile ? '12px 8px' : '8px 12px',
                backgroundColor: chromeSurface,
                borderRadius: '4px',
                border: `1px solid ${separatorColor}`,
                flexWrap: isMobile ? 'wrap' : 'nowrap',
              }}
            >
              <FormControl
                variant='outlined'
                size='small'
                style={{
                  minWidth: isMobile ? '100%' : 140,
                  flexShrink: 0,
                  flex: isMobile ? '1 1 100%' : '0 0 auto',
                }}
              >
                <InputLabel>{t('Torznab.SortBy')}</InputLabel>
                <Select
                  value={sortField}
                  onChange={(e: SelectChangeEvent<SortField>) => setSortField(e.target.value as SortField)}
                  label={t('Torznab.SortBy')}
                >
                  <MenuItem value=''>{t('Torznab.SortByNone')}</MenuItem>
                  <MenuItem value='size'>{t('Torznab.SortBySize')}</MenuItem>
                  <MenuItem value='seeds'>{t('Torznab.SortBySeeds')}</MenuItem>
                  <MenuItem value='peers'>{t('Torznab.SortByPeers')}</MenuItem>
                </Select>
              </FormControl>
              {sortField && (
                <IconButton
                  size='small'
                  onClick={toggleSortDirection}
                  title={sortDirection === 'asc' ? t('Torznab.SortAscending') : t('Torznab.SortDescending')}
                  style={{
                    marginLeft: isMobile ? 'auto' : '4px',
                    padding: '8px',
                  }}
                >
                  {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
              )}
            </div>
          )}

          <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
            {emptyMessage && (
              <Typography align='center' variant='body1' color='text.secondary'>
                {emptyMessage}
              </Typography>
            )}

            <List>
              {sortedResults.map((item, index) => {
                const sizeBytes = parseSizeToBytes(item.Size || '0')
                const formattedSize = formatSizeToClassicUnits(sizeBytes)
                return (
                  <div key={item.Hash || item.Link || index}>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <IconButton
                          edge='end'
                          aria-label='add'
                          onClick={() => handleAdd(item)}
                          disabled={adding}
                          size='medium'
                          sx={{ minWidth: 44, minHeight: 44 }}
                        >
                          <DownloadIcon color='secondary' />
                        </IconButton>
                      }
                    >
                      <ListItemButton onClick={() => handleAdd(item)}>
                        <ListItemText
                          primary={item.Title}
                          secondary={
                            <>
                              <Typography component='span' variant='body2' color='text.primary'>
                                {formattedSize}
                              </Typography>
                              {` • S: ${item.Seed || 0} P: ${item.Peer || 0}`}
                            </>
                          }
                          slotProps={{
                            primary: {
                              sx: {
                                whiteSpace: isMobile ? 'normal' : 'inherit',
                                fontSize: isMobile ? '0.9rem' : 'inherit',
                              },
                            },
                            secondary: {
                              sx: {
                                fontSize: isMobile ? '0.75rem' : 'inherit',
                              },
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider component='li' />
                  </div>
                )
              })}
            </List>
          </div>
        </div>
      </Content>

      <Snackbar open={!!successMsg} autoHideDuration={1500} onClose={handleAlertClose} message={successMsg} />
      <Snackbar open={!!errorMsg} autoHideDuration={1500} onClose={handleAlertClose} message={errorMsg} />

      <div
        style={{
          padding: '16px',
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: `1px solid ${separatorColor}`,
          backgroundColor: chromeBorder,
        }}
      >
        <Button onClick={handleClose} color='secondary' variant='outlined'>
          {t('Close')}
        </Button>
      </div>
    </StyledDialog>
  )
}

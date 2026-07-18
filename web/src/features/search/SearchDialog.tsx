import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type SyntheticEvent } from 'react'
import axios, { isAxiosError } from 'axios'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import type { SearchResultItem, TorznabUrl } from 'shared/api/types'
import { searchRutor, searchTorznab } from 'shared/api/search'
import { getSettings } from 'shared/api/settings'
import { addTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { queryMax } from 'shared/theme/breakpoints'
import { formatSizeToClassicUnits, parseSizeToBytes } from 'shared/lib/format'
import { getMoviePosters, shortenTitleForPosterSearch } from 'shared/lib/torrentHelpers'
import AppDialog from 'shared/ui/AppDialog'
import { useOptionalAppToast } from 'shared/ui/Toast'
import SearchResultsGrid from 'features/search/SearchResultsGrid'
import { beginSearchRequest, isCurrentSearch } from './searchRequest'

export interface SearchDialogProps {
  open: boolean
  onClose: () => void
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

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const toast = useOptionalAppToast()
  const isMobile = useMediaQuery(queryMax('mobile'))

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

  const hasTorznab = enableTorznab && trackers.length > 0
  const hasRutor = enableRutor
  const hasAnySource = hasTorznab || hasRutor
  const showAllTrackers = hasTorznab

  useEffect(() => {
    if (!open) return
    const ac = new AbortController()
    setSettingsLoaded(false)
    getSettings(ac.signal)
      .then(data => {
        const urls = data.TorznabUrls || []
        const torznabOn = Boolean(data.EnableTorznabSearch)
        const rutorOn = Boolean(data.EnableRutorSearch)
        setTrackers(urls)
        setEnableTorznab(torznabOn)
        setEnableRutor(rutorOn)
        if (torznabOn && urls.length > 0) setSelectedTracker(-1)
        else if (rutorOn) setSelectedTracker('rutor')
      })
      .catch(() => {})
      .finally(() => {
        if (!ac.signal.aborted) setSettingsLoaded(true)
      })
    return () => ac.abort()
  }, [open])

  useEffect(
    () => () => {
      searchAbortRef.current?.abort()
    },
    [],
  )

  const handleSearch = async () => {
    const q = query.trim()
    if (!q || !hasAnySource) return

    const { ac, gen } = beginSearchRequest(searchAbortRef, searchGenRef)
    setLoading(true)
    setSearched(true)
    setResults([])

    try {
      if (selectedTracker === -1) {
        const requests: Promise<SearchResultItem[]>[] = []
        if (hasTorznab) requests.push(searchTorznab(q, undefined, ac.signal))
        if (hasRutor) requests.push(searchRutor(q, ac.signal))
        if (requests.length === 0) {
          if (isCurrentSearch(gen, searchGenRef.current, ac.signal)) {
            setErrorMsg(t('Torznab.NoSearchSources'))
          }
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

      let next: SearchResultItem[] = []
      if (selectedTracker === 'rutor') {
        next = await searchRutor(q, ac.signal)
      } else if (typeof selectedTracker === 'number') {
        next = await searchTorznab(q, selectedTracker, ac.signal)
      }
      if (!isCurrentSearch(gen, searchGenRef.current, ac.signal)) return
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

  const handleAdd = async (item: SearchResultItem) => {
    const link = item.Magnet || item.Link || item.Hash
    if (!link) return

    const key = resultDedupeKey(item)
    setAdding(true)
    setAddingKey(key)
    try {
      let poster = item.Poster || ''
      if (!poster && item.Title) {
        const query = shortenTitleForPosterSearch(item.Title) || item.Title
        const urls = await getMoviePosters(query, i18n.language?.startsWith('ru') ? 'ru' : 'en')
        poster = urls?.[0] || ''
      }
      await addTorrent({
        link,
        title: item.Title,
        poster,
      })
      await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
      setSuccessMsg(t('TorrentAdded'))
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    } finally {
      setAdding(false)
      setAddingKey(null)
    }
  }

  const handleAlertClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
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
    return [...results].sort((a, b) => {
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
  }, [results, sortField, sortDirection])

  const emptyMessage = (() => {
    if (!settingsLoaded) return null
    if (!hasAnySource) {
      if (enableTorznab && trackers.length === 0) return t('Torznab.NoIndexersConfigured')
      return t('Torznab.NoSearchSources')
    }
    if (loading) return null
    if (searched && results.length === 0) return t('NoResults')
    return null
  })()

  const sortFields: { field: SortField; label: string }[] = [
    { field: 'size', label: t('Torznab.SortBySize') },
    { field: 'seeds', label: t('Torznab.SortBySeeds') },
    { field: 'peers', label: t('Torznab.SortByPeers') },
  ]

  const footerButtonSx = isMobile ? { minHeight: 44, px: 2.5 } : undefined

  return (
    <AppDialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
      <DialogTitle>{t('Search')}</DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ pt: 1, pb: 2, alignItems: { sm: 'center' } }}>
          <FormControl size='small' sx={{ minWidth: { sm: 180 } }} disabled={!hasAnySource}>
            <InputLabel>{t('Tracker')}</InputLabel>
            <Select
              value={selectedTracker}
              label={t('Tracker')}
              onChange={(e: SelectChangeEvent<TrackerSelection>) =>
                setSelectedTracker(e.target.value as TrackerSelection)
              }
            >
              {showAllTrackers ? <MenuItem value={-1}>{t('AllTrackers')}</MenuItem> : null}
              {hasRutor ? <MenuItem value='rutor'>{t('Rutor')}</MenuItem> : null}
              {hasTorznab
                ? trackers.map((tracker, index) => (
                    <MenuItem key={`${tracker.Host}-${tracker.Key}`} value={index}>
                      {tracker.Name || tracker.Host}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            size='small'
            label={t('SearchQuery')}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') void handleSearch()
            }}
            disabled={!hasAnySource}
          />

          <Button
            variant='contained'
            onClick={() => void handleSearch()}
            disabled={loading || !hasAnySource || !query.trim()}
            sx={footerButtonSx}
          >
            {loading ? <CircularProgress size={20} color='inherit' /> : t('Search')}
          </Button>
        </Stack>

        {searched && sortedResults.length > 0 ? (
          <Stack direction='row' spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              {t('Torznab.ResultsCount', { count: sortedResults.length })}
            </Typography>
            <ToggleButtonGroup
              exclusive
              size='small'
              value={sortField}
              onChange={(_, field: SortField | null) => {
                if (field) handleSortChip(field)
              }}
            >
              {sortFields.map(({ field, label }) => {
                const active = sortField === field
                return (
                  <ToggleButton key={field} value={field} selected={active} sx={{ textTransform: 'none' }}>
                    {label}
                    {active ? (
                      sortDirection === 'asc' ? (
                        <ArrowUpward sx={{ ml: 0.5, fontSize: 14 }} />
                      ) : (
                        <ArrowDownward sx={{ ml: 0.5, fontSize: 14 }} />
                      )
                    ) : null}
                  </ToggleButton>
                )
              })}
            </ToggleButtonGroup>
          </Stack>
        ) : null}

        <Box sx={{ minHeight: 280 }}>
          {loading ? (
            <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : null}

          {!loading && emptyMessage ? (
            <Typography color='text.secondary' sx={{ py: 4, textAlign: 'center' }}>
              {emptyMessage}
            </Typography>
          ) : null}

          {!loading && sortedResults.length > 0 ? (
            <SearchResultsGrid
              results={sortedResults}
              loading={false}
              adding={adding}
              addingKey={addingKey}
              resultDedupeKey={resultDedupeKey}
              formatSize={item => formatSizeToClassicUnits(parseSizeToBytes(item.Size || '0'))}
              onAdd={item => void handleAdd(item)}
            />
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={footerButtonSx}>
          {t('Close')}
        </Button>
      </DialogActions>

      <Snackbar open={!!successMsg} autoHideDuration={1500} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity='success' variant='filled' sx={{ width: '100%' }}>
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={!!errorMsg} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity='error' variant='filled' sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </AppDialog>
  )
}

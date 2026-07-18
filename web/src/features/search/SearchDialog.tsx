import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Spinner,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from '@heroui/react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import axios, { isAxiosError } from 'axios'
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
            toast?.showToast({ message: t('Torznab.NoSearchSources'), severity: 'error' })
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
      toast?.showToast({ message: axiosErrorMessage(err, t('Torznab.SearchFailed')), severity: 'error' })
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
        const posterQuery = shortenTitleForPosterSearch(item.Title) || item.Title
        const urls = await getMoviePosters(posterQuery, i18n.language?.startsWith('ru') ? 'ru' : 'en')
        poster = urls?.[0] || ''
      }
      await addTorrent({
        link,
        title: item.Title,
        poster,
      })
      await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
      toast?.showToast({ message: t('TorrentAdded'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    } finally {
      setAdding(false)
      setAddingKey(null)
    }
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

  const footerButtonClassName = isMobile ? 'min-h-11 px-4' : undefined
  const trackerKey = selectedTracker === 'rutor' ? 'rutor' : String(selectedTracker)

  return (
    <AppDialog open={open} onClose={onClose} size='lg'>
      <Modal.Header>
        <Modal.Heading>{t('Search')}</Modal.Heading>
        <Modal.CloseTrigger />
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-col gap-2 pb-4 pt-1 sm:flex-row sm:items-end'>
          <Select
            selectedKey={trackerKey}
            onSelectionChange={key => {
              const value = String(key)
              setSelectedTracker(value === 'rutor' ? 'rutor' : Number(value))
            }}
            isDisabled={!hasAnySource}
            className='sm:min-w-[180px]'
          >
            <Label>{t('Tracker')}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {showAllTrackers ? <ListBox.Item id='-1'>{t('AllTrackers')}</ListBox.Item> : null}
                {hasRutor ? <ListBox.Item id='rutor'>{t('Rutor')}</ListBox.Item> : null}
                {hasTorznab
                  ? trackers.map((tracker, index) => (
                      <ListBox.Item key={`${tracker.Host}-${tracker.Key}`} id={String(index)}>
                        {tracker.Name || tracker.Host}
                      </ListBox.Item>
                    ))
                  : null}
              </ListBox>
            </Select.Popover>
          </Select>

          <TextField
            value={query}
            onChange={setQuery}
            isDisabled={!hasAnySource}
            className='flex-1'
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') void handleSearch()
            }}
          >
            <Label>{t('SearchQuery')}</Label>
            <Input />
          </TextField>

          <Button
            variant='primary'
            onPress={() => void handleSearch()}
            isDisabled={loading || !hasAnySource || !query.trim()}
            className={footerButtonClassName}
          >
            {loading ? <Spinner size='sm' color='current' /> : t('Search')}
          </Button>
        </div>

        {searched && sortedResults.length > 0 ? (
          <div className='mb-2 flex flex-wrap items-center gap-2'>
            <p className='text-sm text-default-500'>
              {t('Torznab.ResultsCount', { count: sortedResults.length })}
            </p>
            <ToggleButtonGroup selectionMode='single' selectedKeys={[sortField]} className='flex flex-wrap gap-1'>
              {sortFields.map(({ field, label }) => {
                const active = sortField === field
                return (
                  <ToggleButton key={field} id={field} onPress={() => handleSortChip(field)}>
                    {label}
                    {active ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className='ml-1 size-3.5' />
                      ) : (
                        <ArrowDown className='ml-1 size-3.5' />
                      )
                    ) : null}
                  </ToggleButton>
                )
              })}
            </ToggleButtonGroup>
          </div>
        ) : null}

        <div className='min-h-[280px]'>
          {loading ? (
            <div className='grid place-items-center py-12'>
              <Spinner size='lg' />
            </div>
          ) : null}

          {!loading && emptyMessage ? (
            <p className='py-8 text-center text-default-500'>{emptyMessage}</p>
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={onClose} variant='secondary' className={footerButtonClassName}>
          {t('Close')}
        </Button>
      </Modal.Footer>
    </AppDialog>
  )
}

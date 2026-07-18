import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Button, Input, Label, Spinner, TextField, useMediaQuery } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'
import { CheckSquare, CloudOff, FolderPlus, ListMusic, Search, SearchX, Trash2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { playlistAllUrl } from 'shared/api/extras'
import { dropTorrent, removeTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'
import { listContinueWatching, removeContinueWatching } from 'shared/lib/continueWatching'
import { queryMax } from 'shared/theme/breakpoints'
import { iconBtn } from 'shared/ui/controlClasses'
import { iconEmpty, iconEmptyLg, iconMenu, iconNav } from 'shared/ui/iconProps'
import DialogErrorBoundary from 'shared/ui/DialogErrorBoundary'
import { useOptionalAppToast } from 'shared/ui/Toast'

import TorrentCard from './TorrentCard'

const DetailsDialog = lazy(() => import('features/details/DetailsDialog'))
const EditTorrentDialog = lazy(() => import('features/add/EditTorrentDialog'))

const lazyDialogFallback = (
  <div className='grid place-items-center p-4'>
    <Spinner size='sm' />
  </div>
)

export interface TorrentsPageProps {
  sortABC: boolean
  sortCategory: string
  onAdd?: () => void
  onClearCategory?: () => void
}

/** ~140–180px poster tiles by viewport: denser on phone, roomier on desktop. */
const POSTER_GRID_CLASS = 'torrent-poster-grid grid min-h-full gap-4 p-4 pb-8 sm:gap-4 sm:p-4 md:gap-5 md:p-6'
const SKELETON_TILE_COUNT = 12

function sortTorrents(torrents: TorrentStat[], sortABC: boolean, sortCategory: string): TorrentStat[] {
  const inCategory = torrents.filter(torrent => sortCategory === 'all' || torrent.category === sortCategory)

  if (sortABC) {
    return [...inCategory].sort((a, b) => (a.title || '').localeCompare(b.title || '') || a.hash.localeCompare(b.hash))
  }

  return [...inCategory].sort((a, b) => {
    const recencyDiff = (b.timestamp || 0) - (a.timestamp || 0)
    return recencyDiff !== 0 ? recencyDiff : a.hash.localeCompare(b.hash)
  })
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Poster library grid: filter/sort, multi-select, Continue Watching, details/edit sheets.
 */
export default function TorrentsPage({ sortABC, sortCategory, onAdd, onClearCategory }: TorrentsPageProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()
  const isMobile = useMediaQuery(queryMax('mobile'))
  const gridRef = useRef<HTMLDivElement>(null)
  const [detailsTorrent, setDetailsTorrent] = useState<TorrentStat | null>(null)
  const [resumePlay, setResumePlay] = useState<{ fileIndex: number; timecode: number } | null>(null)
  const [editingTorrent, setEditingTorrent] = useState<TorrentStat | null>(null)
  const [libraryQuery, setLibraryQuery] = useState('')
  const [libraryFilterOpen, setLibraryFilterOpen] = useState(false)
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedHashes, setSelectedHashes] = useState<Set<string>>(() => new Set())
  const [continueTick, setContinueTick] = useState(0)

  const { data: torrents, isLoading, isError, error, refetch } = useTorrentsQuery()

  const visibleTorrents = useMemo(() => {
    const sorted = torrents ? sortTorrents(torrents, sortABC, sortCategory) : []
    const q = libraryQuery.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter(torrent => {
      const hay = `${torrent.title || ''} ${torrent.name || ''} ${torrent.category || ''} ${torrent.hash}`.toLowerCase()
      return hay.includes(q)
    })
  }, [torrents, sortABC, sortCategory, libraryQuery])

  const continueEntries = useMemo(() => {
    void continueTick
    const hashes = new Set((torrents || []).map(item => item.hash))
    return listContinueWatching(hashes).slice(0, 6)
  }, [torrents, continueTick])

  const visibleHashKey = useMemo(() => visibleTorrents.map(torrent => torrent.hash).join(','), [visibleTorrents])
  const prevHashesRef = useRef<Set<string>>(new Set())
  const prevViewRef = useRef({ sortABC, sortCategory, libraryQuery })

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const root = gridRef.current
      if (!root) return

      const currentHashes = visibleHashKey ? visibleHashKey.split(',') : []
      const prevHashes = prevHashesRef.current
      const viewChanged =
        prevViewRef.current.sortABC !== sortABC ||
        prevViewRef.current.sortCategory !== sortCategory ||
        prevViewRef.current.libraryQuery !== libraryQuery

      prevViewRef.current = { sortABC, sortCategory, libraryQuery }

      let tiles: Element[] = []
      if (viewChanged || prevHashes.size === 0) {
        tiles = Array.from(root.querySelectorAll('.torrent-card'))
      } else {
        const newHashes = currentHashes.filter(hash => hash && !prevHashes.has(hash))
        tiles = newHashes
          .map(hash => root.querySelector(`.torrent-card[data-hash="${CSS.escape(hash)}"]`))
          .filter((node): node is Element => node != null)
      }

      prevHashesRef.current = new Set(currentHashes)

      if (!tiles.length) return
      gsap.from(tiles, {
        opacity: 0,
        y: 18,
        duration: 0.45,
        stagger: 0.035,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      })
    },
    { scope: gridRef, dependencies: [visibleHashKey, sortABC, sortCategory, libraryQuery] },
  )

  const toggleSelect = (hash: string) => {
    setSelectedHashes(prev => {
      const next = new Set(prev)
      if (next.has(hash)) next.delete(hash)
      else next.add(hash)
      return next
    })
  }

  const exitSelection = () => {
    setSelectionMode(false)
    setSelectedHashes(new Set())
  }

  const runBulk = async (action: 'drop' | 'delete') => {
    const hashes = [...selectedHashes]
    if (!hashes.length) return
    const mutate = action === 'drop' ? dropTorrent : removeTorrent
    const previous = queryClient.getQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY)
    const remove = new Set(hashes)
    queryClient.setQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY, prev => prev?.filter(item => !remove.has(item.hash)))
    exitSelection()
    try {
      await Promise.all(hashes.map(hash => mutate(hash)))
      await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
      toast?.showToast({
        message: action === 'drop' ? t('DropTorrent') : t('Delete'),
        severity: 'success',
      })
    } catch {
      if (previous) queryClient.setQueryData(TORRENTS_QUERY_KEY, previous)
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const showLibraryFilter = !isMobile || libraryFilterOpen || Boolean(libraryQuery.trim())

  const toolbar = (
    <div className='sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b border-border/60 bg-background/95 px-3 py-2 backdrop-blur-md sm:px-4'>
      {showLibraryFilter ? (
        <TextField
          aria-label={t('FilterLibrary')}
          value={libraryQuery}
          onChange={setLibraryQuery}
          className='min-w-0 flex-1 sm:max-w-xs'
          autoFocus={isMobile && libraryFilterOpen}
        >
          <Label className='sr-only'>{t('FilterLibrary')}</Label>
          <Input placeholder={t('FilterLibrary')} />
        </TextField>
      ) : (
        <Button
          isIconOnly
          variant='secondary'
          className={iconBtn}
          aria-label={t('FilterLibrary')}
          onPress={() => setLibraryFilterOpen(true)}
        >
          <Search {...iconNav} aria-hidden />
        </Button>
      )}
      {isMobile && showLibraryFilter && libraryQuery ? (
        <Button
          isIconOnly
          variant='ghost'
          className={iconBtn}
          aria-label={t('Clear')}
          onPress={() => {
            setLibraryQuery('')
            setLibraryFilterOpen(false)
          }}
        >
          <X {...iconNav} aria-hidden />
        </Button>
      ) : null}
      <Button
        size='sm'
        variant={selectionMode ? 'primary' : 'secondary'}
        className='min-h-11'
        onPress={() => (selectionMode ? exitSelection() : setSelectionMode(true))}
      >
        <CheckSquare {...iconMenu} aria-hidden />
        {selectionMode ? t('Cancel') : t('Select')}
      </Button>
      <Button
        size='sm'
        variant='secondary'
        className='min-h-11'
        onPress={() => window.open(playlistAllUrl(), '_blank')}
        aria-label={t('DownloadAllPlaylists')}
      >
        <ListMusic {...iconMenu} aria-hidden />
        <span className='hidden sm:inline'>{t('DownloadAllPlaylists')}</span>
      </Button>
      {selectionMode && selectedHashes.size > 0 ? (
        <>
          <Button size='sm' variant='outline' className='min-h-11' onPress={() => void runBulk('drop')}>
            {t('DropTorrent')} ({selectedHashes.size})
          </Button>
          <Button size='sm' variant='danger' className='min-h-11' onPress={() => void runBulk('delete')}>
            <Trash2 {...iconMenu} aria-hidden />
            {t('Delete')} ({selectedHashes.size})
          </Button>
        </>
      ) : null}
    </div>
  )

  if (isLoading) {
    return (
      <div className={POSTER_GRID_CLASS}>
        {Array.from({ length: SKELETON_TILE_COUNT }, (_, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <div className='aspect-[2/3] w-full animate-pulse rounded-2xl bg-surface-secondary' />
            <div className='h-3.5 w-4/5 animate-pulse rounded-full bg-surface-secondary' />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    const status = (error as { response?: { status?: number } } | null)?.response?.status
    const unauthorized = status === 401 || status === 403
    return (
      <div className='grid min-h-[60vh] place-items-center p-6 text-center'>
        <div className='flex flex-col items-center gap-3'>
          <CloudOff {...iconEmptyLg} className='text-muted' />
          <p className='text-lg font-semibold text-foreground'>
            {unauthorized ? t('AuthRequired') : t('NoServerConnection')}
          </p>
          <Button variant='primary' onPress={() => void refetch()}>
            {t('Retry')}
          </Button>
        </div>
      </div>
    )
  }

  if (!torrents?.length) {
    return (
      <div className='grid min-h-[60vh] place-items-center p-6'>
        <div className='flex min-h-[190px] w-full max-w-[280px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-surface p-8 text-center'>
          <FolderPlus size={40} strokeWidth={1.25} className='text-accent' aria-hidden />
          <p className='text-lg font-semibold text-foreground'>{t('NoTorrentsAdded')}</p>
          <Button variant='primary' onPress={onAdd} isDisabled={!onAdd}>
            {t('AddFirstTorrent')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {toolbar}

      {continueEntries.length > 0 && !selectionMode && !libraryQuery ? (
        <section className='border-b border-border/60 px-3 py-3 sm:px-4'>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted'>{t('ContinueWatching')}</p>
          <div className='flex gap-2 overflow-x-auto pb-1'>
            {continueEntries.map(entry => {
              const torrent = torrents.find(item => item.hash === entry.hash)
              if (!torrent) return null
              return (
                <button
                  key={`${entry.hash}:${entry.fileIndex}`}
                  type='button'
                  className='flex min-w-[220px] max-w-[280px] shrink-0 items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-left hover-fine:bg-surface-secondary'
                  onClick={() => {
                    setResumePlay({ fileIndex: entry.fileIndex, timecode: entry.timecode })
                    setDetailsTorrent(torrent)
                  }}
                >
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-semibold'>{entry.title}</p>
                    <p className='truncate text-xs text-muted'>{entry.fileName}</p>
                  </div>
                  <button
                    type='button'
                    className='rounded-md p-1 text-muted hover-fine:bg-surface-tertiary hover-fine:text-foreground'
                    aria-label={t('Clear')}
                    onClick={event => {
                      event.stopPropagation()
                      removeContinueWatching(entry.hash, entry.fileIndex)
                      setContinueTick(v => v + 1)
                    }}
                  >
                    <X {...iconMenu} aria-hidden />
                  </button>
                </button>
              )
            })}
          </div>
        </section>
      ) : null}

      {!visibleTorrents.length ? (
        <div className='grid min-h-[40vh] place-items-center p-6 text-center'>
          <div className='flex flex-col items-center gap-3 text-muted'>
            <SearchX {...iconEmpty} />
            <p>{libraryQuery.trim() ? t('NoSearchResults') : t('NoTorrentsInCategory')}</p>
            {libraryQuery.trim() ? (
              <Button variant='secondary' onPress={() => setLibraryQuery('')}>
                <Search {...iconMenu} aria-hidden />
                {t('Clear')}
              </Button>
            ) : onClearCategory ? (
              <Button variant='secondary' onPress={onClearCategory}>
                {t('ShowAllTorrents')}
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        <div ref={gridRef} className={POSTER_GRID_CLASS}>
          {visibleTorrents.map(torrent => (
            <TorrentCard
              key={torrent.hash}
              torrent={torrent}
              onSelect={torrent => {
                setResumePlay(null)
                setDetailsTorrent(torrent)
              }}
              onEdit={setEditingTorrent}
              selectionMode={selectionMode}
              selected={selectedHashes.has(torrent.hash)}
              onToggleSelect={toggleSelect}
            />
          ))}
        </div>
      )}

      {detailsTorrent ? (
        <Suspense fallback={lazyDialogFallback}>
          <DialogErrorBoundary onClose={() => setDetailsTorrent(null)}>
            <DetailsDialog
              torrent={detailsTorrent}
              autoPlayFileId={resumePlay?.fileIndex}
              autoPlayTimecode={resumePlay?.timecode}
              onClose={() => {
                setDetailsTorrent(null)
                setResumePlay(null)
              }}
              onEdit={(torrent: TorrentStat) => {
                setDetailsTorrent(null)
                setResumePlay(null)
                setEditingTorrent(torrent)
              }}
            />
          </DialogErrorBoundary>
        </Suspense>
      ) : null}

      <Suspense fallback={lazyDialogFallback}>
        <EditTorrentDialog
          torrent={editingTorrent}
          open={Boolean(editingTorrent)}
          onClose={() => setEditingTorrent(null)}
        />
      </Suspense>
    </>
  )
}

export { sortTorrents }

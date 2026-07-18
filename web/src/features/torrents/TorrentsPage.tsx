import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Button, Spinner } from '@heroui/react'
import { CloudOff, FolderPlus, SearchX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'

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
const POSTER_GRID_CLASS = 'torrent-poster-grid grid min-h-full gap-3 p-3 pb-8 sm:gap-4 sm:p-4 md:gap-5 md:p-6'
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

export default function TorrentsPage({ sortABC, sortCategory, onAdd, onClearCategory }: TorrentsPageProps) {
  const { t } = useTranslation()
  const gridRef = useRef<HTMLDivElement>(null)
  const [detailsTorrent, setDetailsTorrent] = useState<TorrentStat | null>(null)
  const [editingTorrent, setEditingTorrent] = useState<TorrentStat | null>(null)

  const { data: torrents, isLoading, isError, refetch } = useTorrentsQuery()

  const visibleTorrents = useMemo(
    () => (torrents ? sortTorrents(torrents, sortABC, sortCategory) : []),
    [torrents, sortABC, sortCategory],
  )

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tiles = gridRef.current?.querySelectorAll('.torrent-card')
      if (!tiles?.length) return
      gsap.from(tiles, {
        opacity: 0,
        y: 18,
        duration: 0.45,
        stagger: 0.035,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      })
    },
    { scope: gridRef, dependencies: [visibleTorrents.length, sortABC, sortCategory] },
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
    return (
      <div className='grid min-h-[60vh] place-items-center p-6 text-center'>
        <div className='flex flex-col items-center gap-3'>
          <CloudOff size={44} strokeWidth={1.25} className='text-muted' />
          <p className='text-lg font-semibold text-foreground'>
            {t('NoServerConnection', { defaultValue: 'No connection to server' })}
          </p>
          <Button variant='primary' onPress={() => void refetch()}>
            {t('Retry', { defaultValue: 'Retry' })}
          </Button>
        </div>
      </div>
    )
  }

  if (!torrents?.length) {
    return (
      <div className='grid min-h-[60vh] place-items-center p-6'>
        <div className='flex min-h-[190px] w-full max-w-[280px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-surface p-8 text-center'>
          <FolderPlus size={40} className='text-accent' aria-hidden />
          <p className='text-lg font-semibold text-foreground'>{t('NoTorrentsAdded')}</p>
          <Button variant='primary' onPress={onAdd} isDisabled={!onAdd}>
            {t('AddFirstTorrent')}
          </Button>
        </div>
      </div>
    )
  }

  if (!visibleTorrents.length) {
    return (
      <div className='grid min-h-[40vh] place-items-center p-6 text-center'>
        <div className='flex flex-col items-center gap-3 text-muted'>
          <SearchX size={36} strokeWidth={1.25} />
          <p>{t('NoTorrentsInCategory')}</p>
          {onClearCategory ? (
            <Button variant='secondary' onPress={onClearCategory}>
              {t('ShowAllTorrents', { defaultValue: 'Show all' })}
            </Button>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <>
      <div ref={gridRef} className={POSTER_GRID_CLASS}>
        {visibleTorrents.map(torrent => (
          <TorrentCard key={torrent.hash} torrent={torrent} onSelect={setDetailsTorrent} onEdit={setEditingTorrent} />
        ))}
      </div>

      {detailsTorrent ? (
        <Suspense fallback={lazyDialogFallback}>
          <DetailsDialog
            torrent={detailsTorrent}
            onClose={() => setDetailsTorrent(null)}
            onEdit={(torrent: TorrentStat) => {
              setDetailsTorrent(null)
              setEditingTorrent(torrent)
            }}
          />
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

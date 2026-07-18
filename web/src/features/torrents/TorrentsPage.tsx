import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Button } from '@heroui/react'
import { CloudOff, FolderPlus, SearchX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'

import TorrentCard from './TorrentCard'

const DetailsDialog = lazy(() => import('features/details/DetailsDialog'))
const EditTorrentDialog = lazy(() => import('features/add/EditTorrentDialog'))

export interface TorrentsPageProps {
  sortABC: boolean
  sortCategory: string
  onAdd?: () => void
}

/** ~150-200px poster tiles, auto-filling available width. */
const POSTER_GRID_STYLE = { gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }
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

export default function TorrentsPage({ sortABC, sortCategory, onAdd }: TorrentsPageProps) {
  const { t } = useTranslation()
  const gridRef = useRef<HTMLDivElement>(null)
  const [detailsTorrent, setDetailsTorrent] = useState<TorrentStat | null>(null)
  const [editingTorrent, setEditingTorrent] = useState<TorrentStat | null>(null)

  const { data: torrents, isLoading, isError } = useTorrentsQuery()

  const visibleTorrents = useMemo(
    () => (torrents ? sortTorrents(torrents, sortABC, sortCategory) : []),
    [torrents, sortABC, sortCategory],
  )

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tiles = gridRef.current?.querySelectorAll('.torrent-card')
      if (!tiles?.length) return
      gsap.from(tiles, { opacity: 0, y: 18, duration: 0.45, stagger: 0.035, ease: 'power2.out' })
    },
    { scope: gridRef, dependencies: [visibleTorrents.length, sortABC, sortCategory] },
  )

  if (isLoading) {
    return (
      <div className='grid min-h-full gap-3 p-3 sm:gap-4 sm:p-4 md:p-6' style={POSTER_GRID_STYLE}>
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
        </div>
      </div>
    )
  }

  if (!torrents?.length) {
    return (
      <div className='grid min-h-[60vh] place-items-center p-6'>
        <button
          type='button'
          onClick={onAdd}
          disabled={!onAdd}
          className='group flex min-h-[190px] min-w-[280px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-surface p-8 text-center transition-colors hover:border-accent/60 disabled:cursor-not-allowed disabled:opacity-50'
        >
          <FolderPlus size={40} className='text-accent transition-transform duration-200 group-hover:scale-110' />
          <span className='text-lg font-semibold text-foreground'>{t('NoTorrentsAdded')}</span>
          <Button variant='primary' className='pointer-events-none'>
            {t('AddFirstTorrent')}
          </Button>
        </button>
      </div>
    )
  }

  if (!visibleTorrents.length) {
    return (
      <div className='grid min-h-[40vh] place-items-center p-6 text-center'>
        <div className='flex flex-col items-center gap-2 text-muted'>
          <SearchX size={36} strokeWidth={1.25} />
          <p>{t('NoTorrentsInCategory')}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div ref={gridRef} className='grid min-h-full gap-3 p-3 pb-8 sm:gap-4 sm:p-4 md:p-6' style={POSTER_GRID_STYLE}>
        {visibleTorrents.map(torrent => (
          <TorrentCard key={torrent.hash} torrent={torrent} onSelect={setDetailsTorrent} onEdit={setEditingTorrent} />
        ))}
      </div>

      {detailsTorrent ? (
        <Suspense fallback={null}>
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

      <Suspense fallback={null}>
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

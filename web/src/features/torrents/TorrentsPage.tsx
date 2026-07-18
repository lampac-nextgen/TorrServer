import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Button } from '@heroui/react'
import { CloudOff, FolderPlus } from 'lucide-react'
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

function sortTorrents(torrents: TorrentStat[], sortABC: boolean, sortCategory: string) {
  const filtered = torrents.filter(t => sortCategory === 'all' || t.category === sortCategory)

  if (sortABC) {
    return [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || '') || a.hash.localeCompare(b.hash))
  }

  return [...filtered].sort((a, b) => {
    const tsA = a.timestamp || 0
    const tsB = b.timestamp || 0
    if (tsA !== tsB) return tsB - tsA
    return a.hash.localeCompare(b.hash)
  })
}

export default function TorrentsPage({ sortABC, sortCategory, onAdd }: TorrentsPageProps) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<TorrentStat | null>(null)
  const [editing, setEditing] = useState<TorrentStat | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const { data: torrents, isLoading, isError } = useTorrentsQuery()

  const sorted = useMemo(
    () => (torrents ? sortTorrents(torrents, sortABC, sortCategory) : []),
    [torrents, sortABC, sortCategory],
  )

  useGSAP(
    () => {
      if (!gridRef.current) return
      const cards = gridRef.current.querySelectorAll('.torrent-card')
      if (!cards.length) return
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power2.out',
      })
    },
    { scope: gridRef, dependencies: [sorted.length, sortABC, sortCategory] },
  )

  if (isLoading) {
    return (
      <div
        className='grid min-h-full gap-3 p-4'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className='flex flex-col gap-2'>
            <div className='aspect-[2/3] animate-pulse rounded-xl bg-[#1a2620]' />
            <div className='h-4 animate-pulse rounded bg-[#1a2620]' />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className='grid min-h-[200px] place-items-center p-6 text-center text-[var(--muted,#8fafa0)]'>
        <CloudOff size={48} strokeWidth={1.25} className='mb-2 opacity-60' />
        <p className='text-lg font-semibold text-[var(--foreground,#e6f2ec)]'>{t('NoServerConnection')}</p>
      </div>
    )
  }

  if (!torrents?.length) {
    return (
      <div className='grid min-h-[200px] place-items-center p-6 text-center'>
        <button
          type='button'
          onClick={onAdd}
          disabled={!onAdd}
          className='grid min-h-[180px] min-w-[260px] place-items-center gap-3 rounded-2xl border border-dashed border-[var(--border,#2a3b32)] bg-[var(--surface,#121a16)] p-6 transition-colors hover:border-[#00a572]/50 disabled:opacity-50'
        >
          <FolderPlus size={48} className='text-[#00a572] opacity-80' />
          <span className='text-lg font-semibold text-[var(--foreground,#e6f2ec)]'>{t('NoTorrentsAdded')}</span>
          <Button variant='primary' className='pointer-events-none'>
            {t('AddFirstTorrent')}
          </Button>
        </button>
      </div>
    )
  }

  if (!sorted.length) {
    return (
      <div className='grid min-h-[200px] place-items-center p-6'>
        <p className='text-[var(--muted,#8fafa0)]'>{t('NoTorrentsInCategory')}</p>
      </div>
    )
  }

  return (
    <>
      <div
        ref={gridRef}
        className='grid min-h-full gap-3 p-3 pb-6 sm:gap-4 sm:p-4 md:p-5'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
      >
        {sorted.map(torrent => (
          <TorrentCard key={torrent.hash} torrent={torrent} onSelect={setSelected} onEdit={setEditing} />
        ))}
      </div>

      {selected ? (
        <Suspense fallback={null}>
          <DetailsDialog
            torrent={selected}
            onClose={() => setSelected(null)}
            onEdit={torrent => {
              setSelected(null)
              setEditing(torrent)
            }}
          />
        </Suspense>
      ) : null}

      <Suspense fallback={null}>
        <EditTorrentDialog torrent={editing} open={Boolean(editing)} onClose={() => setEditing(null)} />
      </Suspense>
    </>
  )
}

export { sortTorrents }

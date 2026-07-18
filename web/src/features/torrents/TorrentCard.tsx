import { useRef, useState } from 'react'
import { Chip, useMediaQuery } from '@heroui/react'
import { ImageOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { getPeerString, humanizeSize, humanizeSpeed } from 'shared/lib/format'
import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import { GETTING_INFO, PRELOAD, WORKING } from 'shared/torrent/states'

import TorrentCardActions from './TorrentCardActions'

export interface TorrentCardProps {
  torrent: TorrentStat
  onSelect: (torrent: TorrentStat) => void
  onEdit?: (torrent: TorrentStat) => void
  selectionMode?: boolean
  selected?: boolean
  onToggleSelect?: (hash: string) => void
}

type ChipColor = 'default' | 'success' | 'warning' | 'accent'

function statusChipColor(stat?: number): ChipColor {
  switch (stat) {
    case WORKING:
      return 'success'
    case PRELOAD:
    case GETTING_INFO:
      return 'accent'
    default:
      return 'default'
  }
}

function progressPercent(torrent: TorrentStat): number | null {
  const size = torrent.torrent_size ?? 0
  const loaded = torrent.loaded_size ?? 0
  if (size <= 0 || loaded <= 0) return null
  return Math.min(100, Math.round((loaded / size) * 100))
}

/** True hover devices only — touch / hybrid get always-visible actions (avoids sticky synthetic hover). */
const HOVER_FINE_MQ = '(hover: hover) and (pointer: fine)'

export default function TorrentCard({
  torrent,
  onSelect,
  onEdit,
  selectionMode = false,
  selected = false,
  onToggleSelect,
}: TorrentCardProps) {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLElement>(null)
  const hoverFine = useMediaQuery(HOVER_FINE_MQ)
  const [posterBroken, setPosterBroken] = useState(false)

  const title = torrent.title || torrent.name || torrent.hash
  const percent = progressPercent(torrent)

  const statusLabel = (() => {
    const labels: Partial<Record<number, string>> = {
      [GETTING_INFO]: t('TorrentGettingInfo'),
      [PRELOAD]: t('TorrentPreload'),
      [WORKING]: t('TorrentWorking'),
    }
    return torrent.stat != null ? (labels[torrent.stat] ?? null) : null
  })()

  const categoryLabel = torrent.category
    ? t(TORRENT_CATEGORIES.find(category => category.key === torrent.category)?.name ?? torrent.category)
    : null

  const blurFocusedControl = () => {
    const active = document.activeElement
    if (active instanceof HTMLElement && cardRef.current?.contains(active)) active.blur()
  }

  const openDetails = () => {
    if (selectionMode) {
      onToggleSelect?.(torrent.hash)
      return
    }
    onSelect(torrent)
  }

  return (
    <article
      ref={cardRef}
      className={`torrent-card group flex min-w-0 flex-col gap-2 ${
        selected ? 'rounded-2xl ring-2 ring-accent ring-offset-2 ring-offset-background' : ''
      }`}
      data-hash={torrent.hash}
      onMouseLeave={hoverFine ? blurFocusedControl : undefined}
    >
      <div
        role='button'
        tabIndex={0}
        aria-label={title}
        aria-pressed={selectionMode ? selected : undefined}
        onClick={openDetails}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openDetails()
          }
        }}
        className='relative aspect-[2/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-secondary ring-1 ring-border transition-shadow duration-200 hover-fine:shadow-lg hover-fine:ring-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      >
        {torrent.poster && !posterBroken ? (
          <img
            src={torrent.poster}
            alt=''
            loading='lazy'
            className='h-full w-full object-cover'
            onError={() => setPosterBroken(true)}
          />
        ) : (
          <div className='grid h-full w-full place-items-center text-muted'>
            <ImageOff size={30} strokeWidth={1.5} />
          </div>
        )}

        {percent != null && percent < 100 ? (
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-black/40'>
            <div className='h-full bg-accent transition-[width] duration-300' style={{ width: `${percent}%` }} />
          </div>
        ) : null}

        <div className='pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-1 bg-gradient-to-b from-black/60 to-transparent p-2'>
          {statusLabel ? (
            <Chip
              size='sm'
              color={statusChipColor(torrent.stat)}
              variant={torrent.stat === WORKING ? 'primary' : 'secondary'}
            >
              <Chip.Label>
                {statusLabel}
                {percent != null && percent < 100 ? ` · ${percent}%` : ''}
              </Chip.Label>
            </Chip>
          ) : percent != null && percent < 100 ? (
            <Chip size='sm' variant='secondary'>
              <Chip.Label>{percent}%</Chip.Label>
            </Chip>
          ) : (
            <span />
          )}
          {categoryLabel ? (
            <Chip size='sm' variant='soft'>
              <Chip.Label className='max-w-[6.5rem] truncate'>{categoryLabel}</Chip.Label>
            </Chip>
          ) : null}
        </div>

        {!selectionMode ? (
          <div
            className={
              hoverFine
                ? 'pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 has-[:focus-visible]:pointer-events-auto has-[:focus-visible]:opacity-100'
                : 'absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-2 pb-2 pt-10'
            }
          >
            <TorrentCardActions
              torrent={torrent}
              onDetails={() => onSelect(torrent)}
              onEdit={onEdit ? () => onEdit(torrent) : undefined}
            />
          </div>
        ) : null}
      </div>

      <div className='min-w-0 px-0.5'>
        <h3 className='line-clamp-2 text-sm font-semibold leading-snug text-foreground' title={title}>
          {title}
        </h3>
        <p className='mt-0.5 truncate text-xs tabular-nums text-muted' title={title}>
          {humanizeSize(torrent.torrent_size)}
          {percent != null ? ` · ${percent}%` : ''} · ↓{humanizeSpeed(torrent.download_speed)} ·{' '}
          {getPeerString(torrent) ?? '—'}
        </p>
      </div>
    </article>
  )
}

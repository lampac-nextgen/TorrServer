import { useRef, useState, type ReactNode } from 'react'
import { Chip, useMediaQuery } from '@heroui/react'
import { ArrowDown, HardDrive, ImageOff, Play, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import type { ContinueWatchEntry } from 'shared/lib/continueWatching'
import { humanizeSize, humanizeSpeed } from 'shared/lib/format'
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
  resumeEntry?: ContinueWatchEntry
  onResume?: () => void
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

function MetaItem({ icon, label, tip }: { icon: ReactNode; label: string; tip?: string }) {
  return (
    <span className='inline-flex min-w-0 items-center gap-1' title={tip || label}>
      <span className='shrink-0 text-muted/80' aria-hidden>
        {icon}
      </span>
      <span className='truncate tabular-nums'>{label}</span>
    </span>
  )
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
  resumeEntry,
  onResume,
}: TorrentCardProps) {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLElement>(null)
  const hoverFine = useMediaQuery(HOVER_FINE_MQ)
  const [posterBroken, setPosterBroken] = useState(false)

  const title = torrent.title || torrent.name || torrent.hash
  const downloadSpeed = torrent.download_speed ?? 0
  const showSpeed = torrent.stat === WORKING || torrent.stat === PRELOAD || downloadSpeed > 0

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

  const peersActive = torrent.active_peers
  const peersTotal = torrent.total_peers ?? 0
  const seeders = torrent.connected_seeders ?? 0
  const peersLabel =
    peersActive == null
      ? '—'
      : seeders > 0
        ? `${peersActive}/${peersTotal} · ↑${seeders}`
        : `${peersActive}/${peersTotal}`

  const speedLabel = showSpeed ? (downloadSpeed > 0 ? humanizeSpeed(downloadSpeed) : '—') : '—'

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
      {/* The poster is a plain container; opening details is its own full-bleed <button> below the overlays.
          Nesting the Play / Actions / Continue buttons inside a role="button" element is invalid ARIA. */}
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-surface-secondary ring-1 ring-border transition-shadow duration-200 hover-fine:shadow-lg hover-fine:ring-accent/50 has-[>button:focus-visible]:ring-2 has-[>button:focus-visible]:ring-accent has-[>button:focus-visible]:ring-offset-2 has-[>button:focus-visible]:ring-offset-background'>
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

        <button
          type='button'
          aria-label={title}
          aria-pressed={selectionMode ? selected : undefined}
          onClick={openDetails}
          className='absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-none'
        />

        <div className='pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-1.5 bg-gradient-to-b from-black/60 to-transparent p-2'>
          {statusLabel ? (
            <Chip
              size='sm'
              color={statusChipColor(torrent.stat)}
              variant={torrent.stat === WORKING ? 'primary' : 'secondary'}
            >
              <Chip.Label>{statusLabel}</Chip.Label>
            </Chip>
          ) : (
            <span />
          )}
          {categoryLabel ? (
            <Chip size='sm' variant='soft' className='max-w-[42%] shrink-0'>
              <Chip.Label className='truncate'>{categoryLabel}</Chip.Label>
            </Chip>
          ) : null}
        </div>

        {resumeEntry && !selectionMode && onResume ? (
          <button
            type='button'
            className={`absolute left-2 z-20 inline-flex min-h-8 max-w-[calc(100%-1rem)] items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white hover-fine:bg-black/85 ${
              hoverFine ? 'bottom-2' : 'bottom-16'
            }`}
            onClick={event => {
              event.stopPropagation()
              onResume()
            }}
          >
            <Play size={12} strokeWidth={2} fill='currentColor' aria-hidden />
            <span className='truncate'>{t('Continue')}</span>
          </button>
        ) : null}

        {!selectionMode ? (
          <div
            className={
              hoverFine
                ? 'pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-100 has-[:focus-visible]:opacity-100'
                : 'pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-2 pb-2 pt-10'
            }
          >
            {/* The overlay lets clicks through to the details button; only the controls themselves catch them. */}
            <div
              className={
                hoverFine
                  ? 'pointer-events-none group-hover:pointer-events-auto has-[:focus-visible]:pointer-events-auto'
                  : 'pointer-events-auto'
              }
            >
              <TorrentCardActions
                torrent={torrent}
                onDetails={() => onSelect(torrent)}
                onEdit={onEdit ? () => onEdit(torrent) : undefined}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className='min-w-0 px-0.5'>
        <h3
          className='line-clamp-2 h-10 overflow-hidden text-xs font-semibold leading-5 text-foreground sm:text-sm'
          title={title}
        >
          {title}
        </h3>
        <div className='mt-1 grid h-[2rem] grid-cols-2 content-start gap-x-2.5 gap-y-1 text-[11px] leading-none text-muted sm:h-[2.125rem] sm:text-xs'>
          <MetaItem
            icon={<HardDrive className='size-3' strokeWidth={2} />}
            label={humanizeSize(torrent.torrent_size)}
            tip={t('Size')}
          />
          <MetaItem
            icon={<ArrowDown className='size-3' strokeWidth={2.25} />}
            label={speedLabel}
            tip={t('DownloadSpeed')}
          />
          <MetaItem icon={<Users className='size-3' strokeWidth={2} />} label={peersLabel} tip={t('Peers')} />
        </div>
      </div>
    </article>
  )
}

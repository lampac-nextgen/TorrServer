import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Chip, useMediaQuery } from '@heroui/react'
import { ImageOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import { GETTING_INFO, PRELOAD, WORKING } from 'shared/torrent/states'

import TorrentCardActions from './TorrentCardActions'

export interface TorrentCardProps {
  torrent: TorrentStat
  onSelect: (torrent: TorrentStat) => void
  onEdit?: (torrent: TorrentStat) => void
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

export default function TorrentCard({ torrent, onSelect, onEdit }: TorrentCardProps) {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  /** Touch devices have no hover, so the action overlay must be shown permanently instead of revealed on mouseenter. */
  const isCoarsePointer = useMediaQuery('(pointer: coarse)')

  const title = torrent.title || torrent.name || torrent.hash

  const statusLabel = (() => {
    // IN_DB/CLOSED are the "resting" state for most cards — a chip there is just noise, not information.
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

  useGSAP(
    () => {
      const overlay = overlayRef.current
      const card = cardRef.current
      if (!overlay || !card || isCoarsePointer) return

      const reveal = () => {
        overlay.style.pointerEvents = 'auto'
        gsap.to(overlay, { opacity: 1, duration: 0.2, ease: 'power2.out' })
      }
      const conceal = () => {
        overlay.style.pointerEvents = 'none'
        gsap.to(overlay, { opacity: 0, duration: 0.15, ease: 'power2.in' })
      }

      card.addEventListener('mouseenter', reveal)
      card.addEventListener('mouseleave', conceal)
      card.addEventListener('focusin', reveal)
      card.addEventListener('focusout', conceal)

      return () => {
        card.removeEventListener('mouseenter', reveal)
        card.removeEventListener('mouseleave', conceal)
        card.removeEventListener('focusin', reveal)
        card.removeEventListener('focusout', conceal)
      }
    },
    { scope: cardRef, dependencies: [isCoarsePointer] },
  )

  return (
    <article ref={cardRef} className='torrent-card group flex min-w-0 flex-col gap-2' data-hash={torrent.hash}>
      <div
        role='button'
        tabIndex={0}
        aria-label={title}
        onClick={() => onSelect(torrent)}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onSelect(torrent)
          }
        }}
        className='relative aspect-[2/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-secondary ring-1 ring-border transition-shadow duration-200 hover:shadow-lg hover:ring-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      >
        {torrent.poster ? (
          <img src={torrent.poster} alt='' loading='lazy' className='h-full w-full object-cover' />
        ) : (
          <div className='grid h-full w-full place-items-center text-muted'>
            <ImageOff size={30} strokeWidth={1.5} />
          </div>
        )}

        <div className='pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-1 bg-gradient-to-b from-black/60 to-transparent p-2'>
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
            <Chip size='sm' variant='soft'>
              <Chip.Label className='max-w-[6.5rem] truncate'>{categoryLabel}</Chip.Label>
            </Chip>
          ) : null}
        </div>

        <div
          ref={overlayRef}
          style={isCoarsePointer ? undefined : { opacity: 0, pointerEvents: 'none' }}
          className={
            isCoarsePointer
              ? 'absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-2 pb-2 pt-10'
              : 'absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent'
          }
        >
          <TorrentCardActions
            torrent={torrent}
            onDetails={() => onSelect(torrent)}
            onEdit={onEdit ? () => onEdit(torrent) : undefined}
          />
        </div>
      </div>

      <h3 className='line-clamp-2 px-0.5 text-sm font-semibold leading-snug text-foreground' title={title}>
        {title}
      </h3>
    </article>
  )
}

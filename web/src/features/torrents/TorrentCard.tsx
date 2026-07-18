import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Chip } from '@heroui/react'
import { ImageOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { CLOSED, GETTING_INFO, IN_DB, PRELOAD, WORKING } from 'shared/torrent/states'

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

  const title = torrent.title || torrent.name || torrent.hash

  const statusLabel = (() => {
    if (torrent.stat == null) return null
    const labels: Record<number, string> = {
      [GETTING_INFO]: t('TorrentGettingInfo'),
      [PRELOAD]: t('TorrentPreload'),
      [WORKING]: t('TorrentWorking'),
      [CLOSED]: t('TorrentClosed'),
      [IN_DB]: t('TorrentInDb'),
    }
    return labels[torrent.stat] ?? null
  })()

  useGSAP(
    () => {
      const overlay = overlayRef.current
      const card = cardRef.current
      if (!overlay || !card) return

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
    { scope: cardRef },
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
        className='relative aspect-[2/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-secondary ring-1 ring-border transition-shadow duration-200 hover:shadow-lg hover:ring-accent/50'
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
          {torrent.category ? (
            <Chip size='sm' variant='soft'>
              <Chip.Label className='max-w-[6.5rem] truncate'>{t(torrent.category)}</Chip.Label>
            </Chip>
          ) : null}
        </div>

        <div
          ref={overlayRef}
          style={{ opacity: 0, pointerEvents: 'none' }}
          className='absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent'
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

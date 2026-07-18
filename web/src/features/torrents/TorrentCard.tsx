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

function statusColor(stat?: number): 'default' | 'success' | 'warning' | 'accent' {
  switch (stat) {
    case WORKING:
      return 'success'
    case PRELOAD:
    case GETTING_INFO:
      return 'accent'
    case CLOSED:
    case IN_DB:
      return 'default'
    default:
      return 'default'
  }
}

export default function TorrentCard({ torrent, onSelect, onEdit }: TorrentCardProps) {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const title = torrent.title || torrent.name || torrent.hash
  const poster = torrent.poster

  const statusLabel = (() => {
    const map: Record<number, string> = {
      [GETTING_INFO]: t('TorrentGettingInfo'),
      [PRELOAD]: t('TorrentPreload'),
      [WORKING]: t('TorrentWorking'),
      [CLOSED]: t('TorrentClosed'),
      [IN_DB]: t('TorrentInDB'),
    }
    return torrent.stat != null ? map[torrent.stat] || String(torrent.stat) : '—'
  })()

  useGSAP(
    () => {
      const overlay = overlayRef.current
      const card = cardRef.current
      if (!overlay || !card) return

      const onEnter = () => {
        gsap.to(overlay, { opacity: 1, duration: 0.2, ease: 'power2.out' })
      }
      const onLeave = () => {
        gsap.to(overlay, { opacity: 0, duration: 0.15, ease: 'power2.in' })
      }

      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)
      card.addEventListener('focusin', onEnter)
      card.addEventListener('focusout', onLeave)

      return () => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
        card.removeEventListener('focusin', onEnter)
        card.removeEventListener('focusout', onLeave)
      }
    },
    { scope: cardRef },
  )

  return (
    <article
      ref={cardRef}
      className='group torrent-card flex min-w-0 flex-col gap-2'
      data-hash={torrent.hash}
    >
      <div
        className='relative aspect-[2/3] w-full cursor-pointer overflow-hidden rounded-xl bg-surface-secondary shadow-sm ring-1 ring-border transition-shadow hover:shadow-lg hover:ring-accent/40'
        onClick={() => onSelect(torrent)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect(torrent)
          }
        }}
        role='button'
        tabIndex={0}
        aria-label={title}
      >
        {poster ? (
          <img
            src={poster}
            alt=''
            loading='lazy'
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='grid h-full w-full place-items-center text-muted'>
            <ImageOff size={32} strokeWidth={1.5} />
          </div>
        )}

        <div className='pointer-events-none absolute inset-x-0 top-2 flex flex-wrap gap-1 px-2'>
          <Chip size='sm' color={statusColor(torrent.stat)} variant={torrent.stat === WORKING ? 'primary' : 'secondary'}>
            <Chip.Label>{statusLabel}</Chip.Label>
          </Chip>
          {torrent.category ? (
            <Chip size='sm' variant='secondary'>
              <Chip.Label>{t(torrent.category)}</Chip.Label>
            </Chip>
          ) : null}
        </div>

        <div
          ref={overlayRef}
          className='absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/75 via-black/35 to-black/10 opacity-0'
        >
          <TorrentCardActions
            torrent={torrent}
            onDetails={() => onSelect(torrent)}
            onEdit={onEdit ? () => onEdit(torrent) : undefined}
            className='pointer-events-auto opacity-100'
          />
        </div>
      </div>

      <h3 className='line-clamp-2 px-0.5 text-sm font-semibold leading-snug text-foreground' title={title}>
        {title}
      </h3>
    </article>
  )
}

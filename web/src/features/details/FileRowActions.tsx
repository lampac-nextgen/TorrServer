import { lazy, Suspense } from 'react'
import { Button, Tooltip } from '@heroui/react'
import { Copy, Download, ExternalLink, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ExternalPlayerLink } from 'shared/lib/externalPlayers'
import { useOptionalAppToast } from 'shared/ui/Toast'

/** Lazy: keeps hls.js out of the Details bundle — only fetched once a file is actually played. */
const VideoPlayer = lazy(() => import('features/player/VideoPlayer'))

export type { ExternalPlayerLink }

export interface FileRowActionsProps {
  preloadLabel: string
  onPreload: () => void
  playerSupported: boolean
  playerTitle?: string
  playerSrc: string
  downloadSrc: string
  hls?: boolean
  heartbeatSrc?: string
  onPlayerNotSupported: () => void
  openLinkHref?: string
  showOpenLink?: boolean
  copyText: string
  externalPlayers: ExternalPlayerLink[]
}

const actionButtonClass = 'min-w-[72px] max-w-full flex-1'

/** Per-file action row: preload, inline player / open link, external player deep links, copy link. */
export default function FileRowActions({
  preloadLabel,
  onPreload,
  playerSupported,
  playerTitle,
  playerSrc,
  downloadSrc,
  hls,
  heartbeatSrc,
  onPlayerNotSupported,
  openLinkHref,
  showOpenLink,
  copyText,
  externalPlayers,
}: FileRowActionsProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()

  const copyDirectLink = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  return (
    <div className='flex w-full flex-wrap gap-1.5'>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant='secondary' size='sm' onPress={onPreload} className={actionButtonClass}>
            <Download className='size-4' aria-hidden />
            {preloadLabel}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{preloadLabel}</Tooltip.Content>
      </Tooltip.Root>

      {playerSupported ? (
        <Suspense
          fallback={
            <Button variant='secondary' size='sm' className={actionButtonClass} isDisabled>
              <Loader2 className='size-4 animate-spin' aria-hidden />
              {t('Play')}
            </Button>
          }
        >
          <VideoPlayer
            title={playerTitle}
            videoSrc={playerSrc}
            downloadSrc={downloadSrc}
            hls={hls}
            heartbeatSrc={heartbeatSrc}
            onNotSupported={onPlayerNotSupported}
            inlineTrigger
          />
        </Suspense>
      ) : (
        showOpenLink &&
        openLinkHref && (
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Button
                variant='secondary'
                size='sm'
                className={actionButtonClass}
                onPress={() => window.open(openLinkHref, '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className='size-4' aria-hidden />
                {t('OpenLink')}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>{t('OpenLink')}</Tooltip.Content>
          </Tooltip.Root>
        )
      )}

      {externalPlayers.map(player => (
        <Tooltip.Root key={player.label}>
          <Tooltip.Trigger>
            <Button
              variant='secondary'
              size='sm'
              className={actionButtonClass}
              onPress={() => {
                window.location.href = player.href
              }}
            >
              {player.label}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{player.label}</Tooltip.Content>
        </Tooltip.Root>
      ))}

      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant='secondary' size='sm' className={actionButtonClass} onPress={() => void copyDirectLink()}>
            <Copy className='size-4' aria-hidden />
            {t('CopyLink')}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{t('CopyLink')}</Tooltip.Content>
      </Tooltip.Root>
    </div>
  )
}

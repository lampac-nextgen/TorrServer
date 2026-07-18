import { lazy, Suspense } from 'react'
import { Button, Tooltip } from '@heroui/react'
import { Copy, Download, ExternalLink, Loader2, Play } from 'lucide-react'
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
  hash?: string
  fileIndex?: number
  captionSrc?: string
  initialTimecode?: number
  trackTimecode?: boolean
  onViewedChange?: () => void
}

const iconBtn =
  'inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center p-0 [&_svg]:m-0 [&_svg]:block'
const playerBtn = 'min-h-10 shrink-0 px-2.5 font-medium'

/**
 * Per-file actions: primary Play, direct external-player buttons, then icon Copy/Preload.
 */
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
  hash,
  fileIndex,
  captionSrc,
  initialTimecode = 0,
  trackTimecode = false,
  onViewedChange,
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
    <div className='flex flex-wrap items-center gap-1.5'>
      {playerSupported ? (
        <Suspense
          fallback={
            <Button variant='primary' size='sm' className='min-h-10 shrink-0 px-3' isDisabled>
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
            inlineTriggerPrimary
            hash={hash}
            fileIndex={fileIndex}
            captionSrc={captionSrc}
            initialTimecode={initialTimecode}
            trackTimecode={trackTimecode}
            onViewedChange={onViewedChange}
          />
        </Suspense>
      ) : showOpenLink && openLinkHref ? (
        <Button
          variant='primary'
          size='sm'
          className='min-h-10 shrink-0 px-3'
          onPress={() => window.open(openLinkHref, '_blank', 'noopener,noreferrer')}
        >
          <Play className='size-4' fill='currentColor' aria-hidden />
          {t('Play')}
        </Button>
      ) : null}

      {externalPlayers.map(player => (
        <Button
          key={player.label}
          variant='secondary'
          size='sm'
          className={playerBtn}
          onPress={() => {
            window.location.href = player.href
          }}
        >
          {player.label}
        </Button>
      ))}

      {showOpenLink && openLinkHref && playerSupported ? (
        <Tooltip.Root>
          <Tooltip.Trigger>
            <Button
              variant='secondary'
              size='sm'
              isIconOnly
              className={iconBtn}
              aria-label={t('OpenLink')}
              onPress={() => window.open(openLinkHref, '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className='size-4' aria-hidden />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('OpenLink')}</Tooltip.Content>
        </Tooltip.Root>
      ) : null}

      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button
            variant='secondary'
            size='sm'
            isIconOnly
            className={iconBtn}
            aria-label={t('CopyLink')}
            onPress={() => void copyDirectLink()}
          >
            <Copy className='size-4' aria-hidden />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{t('CopyLink')}</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button
            variant='secondary'
            size='sm'
            isIconOnly
            className={iconBtn}
            aria-label={preloadLabel}
            onPress={onPreload}
          >
            <Download className='size-4' aria-hidden />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{preloadLabel}</Tooltip.Content>
      </Tooltip.Root>
    </div>
  )
}

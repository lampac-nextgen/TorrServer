import { lazy, Suspense } from 'react'
import { Button, ButtonGroup, Spinner, Tooltip } from '@heroui/react'
import { Copy, Download, ExternalLink, Info, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ExternalPlayerLink } from 'shared/lib/externalPlayers'
import { iconBtn } from 'shared/ui/controlClasses'
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
  onProbeMedia?: () => void
}

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
  onProbeMedia,
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

  const externalButtons = externalPlayers.map(player => (
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
  ))

  return (
    <div className='flex flex-wrap items-center gap-1.5'>
      {playerSupported ? (
        <Suspense
          fallback={
            <Button variant='primary' size='sm' className='min-h-10 shrink-0 px-3' isDisabled isPending>
              {() => (
                <>
                  <Spinner size='sm' color='current' />
                  {t('Play')}
                </>
              )}
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
          <Play fill='currentColor' aria-hidden />
          {t('Play')}
        </Button>
      ) : null}

      {externalPlayers.length > 1 ? <ButtonGroup>{externalButtons}</ButtonGroup> : externalButtons}

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
              <ExternalLink aria-hidden />
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
            <Copy aria-hidden />
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
            <Download aria-hidden />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{preloadLabel}</Tooltip.Content>
      </Tooltip.Root>

      {onProbeMedia ? (
        <Tooltip.Root>
          <Tooltip.Trigger>
            <Button
              variant='secondary'
              size='sm'
              isIconOnly
              className={iconBtn}
              aria-label={t('MediaInfo', { defaultValue: 'Media info' })}
              onPress={onProbeMedia}
            >
              <Info aria-hidden />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('MediaInfo', { defaultValue: 'Media info' })}</Tooltip.Content>
        </Tooltip.Root>
      ) : null}
    </div>
  )
}

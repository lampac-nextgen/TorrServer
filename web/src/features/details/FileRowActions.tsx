import { Button, ButtonGroup, Spinner, Tooltip } from '@heroui/react'
import { Copy, Download, ExternalLink, Info, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ExternalPlayerLink } from 'shared/lib/externalPlayers'
import { iconBtn } from 'shared/ui/controlClasses'
import { useOptionalAppToast } from 'shared/ui/Toast'

export type { ExternalPlayerLink }

export interface FileRowActionsProps {
  preloadLabel: string
  onPreload: () => void
  playerSupported: boolean
  onPlay: () => void
  isPlayPending?: boolean
  openLinkHref?: string
  showOpenLink?: boolean
  copyText: string
  externalPlayers: ExternalPlayerLink[]
  onProbeMedia?: () => void
}

const playerBtn = 'min-h-11 shrink-0 px-3 font-medium'

/**
 * Per-file actions: primary Play (via shared launcher), external players, then icon Copy/Preload/Info.
 */
export default function FileRowActions({
  preloadLabel,
  onPreload,
  playerSupported,
  onPlay,
  isPlayPending = false,
  openLinkHref,
  showOpenLink,
  copyText,
  externalPlayers,
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
        <Button
          variant='primary'
          size='sm'
          className='min-h-11 shrink-0 px-3'
          isPending={isPlayPending}
          onPress={onPlay}
        >
          {({ isPending }) => (
            <>
              {isPending ? <Spinner size='sm' color='current' /> : <Play fill='currentColor' aria-hidden />}
              {t('Play')}
            </>
          )}
        </Button>
      ) : showOpenLink && openLinkHref ? (
        <Button
          variant='primary'
          size='sm'
          className='min-h-11 shrink-0 px-3'
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
              aria-label={t('MediaInfo')}
              onPress={onProbeMedia}
            >
              <Info aria-hidden />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('MediaInfo')}</Tooltip.Content>
        </Tooltip.Root>
      ) : null}
    </div>
  )
}

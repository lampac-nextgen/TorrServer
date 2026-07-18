import { Button, Tooltip } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { useOptionalAppToast } from 'shared/ui/Toast'

import VideoPlayer from 'features/player/VideoPlayer'

export interface ExternalPlayerLink {
  label: string
  href: string
}

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

const actionClass = 'min-w-[72px] max-w-full flex-1'

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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  return (
    <div className='flex w-full flex-wrap gap-1'>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant='secondary' size='sm' onPress={onPreload} className={actionClass}>
            {preloadLabel}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{preloadLabel}</Tooltip.Content>
      </Tooltip.Root>

      {playerSupported ? (
        <VideoPlayer
          title={playerTitle}
          videoSrc={playerSrc}
          downloadSrc={downloadSrc}
          hls={hls}
          heartbeatSrc={heartbeatSrc}
          onNotSupported={onPlayerNotSupported}
          inlineTrigger
        />
      ) : (
        showOpenLink &&
        openLinkHref && (
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Button
                variant='secondary'
                size='sm'
                className={actionClass}
                onPress={() => window.open(openLinkHref, '_blank', 'noopener,noreferrer')}
              >
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
              className={actionClass}
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

      <Button variant='secondary' size='sm' className={actionClass} onPress={() => void copyLink()}>
        {t('CopyLink')}
      </Button>
    </div>
  )
}

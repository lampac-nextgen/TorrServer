import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
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

const actionSx = {
  flex: '1 1 auto',
  minWidth: 72,
  maxWidth: '100%',
} as const

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
    <Stack direction='row' useFlexGap spacing={0.5} sx={{ flexWrap: 'wrap', width: '100%' }}>
      <Tooltip title={preloadLabel}>
        <Button onClick={onPreload} variant='outlined' color='primary' size='small' sx={actionSx}>
          {preloadLabel}
        </Button>
      </Tooltip>

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
          <Tooltip title={t('OpenLink')}>
            <Button
              component='a'
              href={openLinkHref}
              target='_blank'
              rel='noreferrer'
              variant='outlined'
              color='primary'
              size='small'
              sx={actionSx}
            >
              {t('OpenLink')}
            </Button>
          </Tooltip>
        )
      )}

      {externalPlayers.map(player => (
        <Tooltip key={player.label} title={player.label}>
          <Button component='a' href={player.href} variant='outlined' color='primary' size='small' sx={actionSx}>
            {player.label}
          </Button>
        </Tooltip>
      ))}

      <Button variant='outlined' color='primary' size='small' sx={actionSx} onClick={() => void copyLink()}>
        {t('CopyLink')}
      </Button>
    </Stack>
  )
}

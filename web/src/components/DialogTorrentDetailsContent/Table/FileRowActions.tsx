import { Button, Tooltip } from '@mui/material'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import { useOptionalAppToast } from 'components/Feedback/AppSnackbar'

import VideoPlayer from '../../VideoPlayer'

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
  width: '100%',
  minWidth: 0,
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

  return (
    <div className='button-cell'>
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

      <CopyToClipboard
        text={copyText}
        onCopy={() => toast?.showToast({ message: t('Copied', { defaultValue: 'Copied' }), severity: 'success' })}
      >
        <Button variant='outlined' color='primary' size='small' sx={actionSx}>
          {t('CopyLink')}
        </Button>
      </CopyToClipboard>
    </div>
  )
}

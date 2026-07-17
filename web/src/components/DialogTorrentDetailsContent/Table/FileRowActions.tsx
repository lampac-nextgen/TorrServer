import { useState, type MouseEvent, type ReactNode } from 'react'
import { Button, IconButton, Menu, MenuItem, ListItemText } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const openMenu = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  const menuItems: ReactNode[] = []
  externalPlayers.forEach(player => {
    menuItems.push(
      <MenuItem
        key={player.label}
        component='a'
        href={player.href}
        onClick={closeMenu}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ListItemText>{player.label}</ListItemText>
      </MenuItem>,
    )
  })
  menuItems.push(
    <CopyToClipboard key='copy' text={copyText}>
      <MenuItem
        onClick={() => {
          closeMenu()
        }}
      >
        <ListItemText>{t('CopyLink')}</ListItemText>
      </MenuItem>
    </CopyToClipboard>,
  )
  if (playerSupported && showOpenLink && openLinkHref) {
    menuItems.push(
      <MenuItem
        key='open'
        component='a'
        href={openLinkHref}
        target='_blank'
        rel='noreferrer'
        onClick={closeMenu}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ListItemText>{t('OpenLink')}</ListItemText>
      </MenuItem>,
    )
  }

  return (
    <div className='button-cell'>
      <Button onClick={onPreload} variant='outlined' color='primary' size='small'>
        {preloadLabel}
      </Button>
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
          <a style={{ textDecoration: 'none' }} href={openLinkHref} target='_blank' rel='noreferrer'>
            <Button variant='outlined' color='primary' size='small'>
              {t('OpenLink')}
            </Button>
          </a>
        )
      )}
      <IconButton aria-label={t('More', { defaultValue: 'More' })} size='small' onClick={openMenu}>
        <MoreVertIcon fontSize='small' />
      </IconButton>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={closeMenu}>
        {menuItems}
      </Menu>
    </div>
  )
}

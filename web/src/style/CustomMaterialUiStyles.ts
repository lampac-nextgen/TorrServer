import { ListItemButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { pwaChromeBottom, pwaFooterHeight } from 'components/App/PWAFooter/style'
import styled, { css } from 'styled-components'
import { Header } from 'style/DialogStyles'
import { isStandaloneApp } from 'utils/Utils'

import { standaloneMedia } from './standaloneMedia'

/** Footer / sidebar menu item — same Open Sans metrics as the rest of the app. */
export const StyledMenuButtonWrapper = styled(ListItemButton)`
  ${standaloneMedia(css`
    width: 100%;
    height: ${pwaFooterHeight}px;
    min-height: ${pwaFooterHeight}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    padding: 4px 2px !important;
    font-family: 'Open Sans', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.2;
    text-transform: none;

    .MuiSvgIcon-root {
      font-size: 22px;
    }
  `)}
`

/**
 * PWA dialogs: hideBackdrop (master). Paper fills the area above the footer so
 * the torrent list cannot bleed through.
 */
export const StyledDialog = styled(Dialog).attrs({
  ...(isStandaloneApp && { hideBackdrop: true, transitionDuration: 0 }),
})`
  ${standaloneMedia(css`
    margin-bottom: ${pwaChromeBottom};

    .MuiDialog-container {
      height: 100%;
      max-height: 100%;
      align-items: stretch;
    }

    .MuiDialog-container .MuiPaper-root {
      box-shadow: none;
      height: 100% !important;
      max-height: none !important;
      width: 100%;
      margin: 0 !important;
      border-radius: 0;
      font-family: 'Open Sans', sans-serif;
      letter-spacing: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  `)}
`

export const StyledHeader = styled(Header)`
  ${standaloneMedia(css`
    padding-top: calc(10px + env(safe-area-inset-top, 0px));
    font-family: 'Open Sans', sans-serif;
    letter-spacing: 0;
  `)}
`

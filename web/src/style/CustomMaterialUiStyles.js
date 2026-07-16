import { ListItemButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { pwaFooterHeight } from 'components/App/PWAFooter/style'
import styled, { css } from 'styled-components'
import { Header } from 'style/DialogStyles'
import { isStandaloneApp } from 'utils/Utils'

import { standaloneMedia } from './standaloneMedia'

export const StyledMenuButtonWrapper = styled(ListItemButton)`
  ${standaloneMedia(css`
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 10px;
  `)}
`

export const StyledDialog = styled(Dialog).attrs({
  ...(isStandaloneApp && { hideBackdrop: true, transitionDuration: 0 }),
})`
  ${standaloneMedia(css`
    margin-bottom: calc(${pwaFooterHeight}px + env(safe-area-inset-bottom, 0px));

    .MuiDialog-container .MuiPaper-root {
      box-shadow: none;
      max-height: calc(100% - env(safe-area-inset-bottom, 0px));
    }
  `)}
`

export const StyledHeader = styled(Header)`
  ${standaloneMedia(css`
    padding-top: 47px;
  `)}
`

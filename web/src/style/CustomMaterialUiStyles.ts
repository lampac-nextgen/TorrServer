import { ListItemButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import type { SxProps, Theme } from '@mui/material/styles'
import { DIALOG_SAFE_TOP, pwaFooterChrome } from 'components/App/PWAFooter/style'
import styled, { css } from 'styled-components'
import { Header } from 'style/DialogStyles'
import { isStandaloneApp } from 'utils/Utils'

import { standaloneMedia } from './standaloneMedia'

/** Flex column paper — scroll children use flex:1; min-height:0. */
export const dialogPaperSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100%',
  overflow: 'hidden',
}

/**
 * PWA footer tab — layout only (master).
 * Inherit Open Sans from body; denser label for 4-up chrome.
 */
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

/**
 * PWA dialog: hideBackdrop + lift above footer.
 * Immersive video: add class `ts-immersive` to drop footer margin.
 */
export const StyledDialog = styled(Dialog).attrs({
  ...(isStandaloneApp && { hideBackdrop: true, transitionDuration: 0 }),
})`
  ${standaloneMedia(css`
    margin-bottom: ${pwaFooterChrome};

    &.ts-immersive {
      margin-bottom: 0;
    }

    .MuiDialog-container .MuiPaper-root {
      box-shadow: none;
    }
  `)}
`

export const StyledHeader = styled(Header)`
  ${standaloneMedia(css`
    padding-top: ${DIALOG_SAFE_TOP};
  `)}
`

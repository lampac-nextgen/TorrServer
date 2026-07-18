import { ListItemButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import type { SxProps, Theme } from '@mui/material/styles'
import styled from 'styled-components'
import { Header } from 'style/DialogStyles'
import { mediaMax } from 'style/breakpoints'

/** Flex column paper — scroll children use flex:1; min-height:0. */
export const dialogPaperSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 'calc(100dvh - var(--app-chrome-top) - var(--app-chrome-bottom))',
  overflow: 'hidden',
}

/** Nav / sidebar list button — tab chrome via parent `.ts-bottom-nav`. */
export const StyledMenuButtonWrapper = styled(ListItemButton)`
  .ts-nav-tab-only {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .ts-nav-list-only {
    display: contents;
  }

  .ts-bottom-nav & {
    .ts-nav-tab-only {
      display: flex;
    }

    .ts-nav-list-only {
      display: none;
    }
  }
`

/** Adaptive dialog — normal backdrop; inset above bottom chrome on mobile. */
export const StyledDialog = styled(Dialog)`
  ${mediaMax('mobile')} {
    .MuiDialog-container .MuiPaper-root {
      margin-bottom: var(--app-chrome-bottom);
    }

    &.ts-immersive .MuiDialog-container .MuiPaper-root {
      margin-bottom: 0;
    }
  }
`

export const StyledHeader = styled(Header)`
  padding-top: max(15px, var(--safe-top));

  ${mediaMax('mobile')} {
    padding-top: max(12px, var(--safe-top));
  }
`

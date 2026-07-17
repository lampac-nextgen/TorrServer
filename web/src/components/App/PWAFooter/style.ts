import { standaloneMedia } from 'style/standaloneMedia'
import styled, { css } from 'styled-components'

/**
 * PWA chrome content rows (icons/labels only — safe-area added separately).
 * Footer matches StyledMenuButtonWrapper (60px); header stays compact for toggles.
 * Was 90px and created a large empty band under/above centered tabs.
 */
export const pwaFooterHeight = 60
export const pwaHeaderHeight = 56

/** Aliases kept for existing imports. */
export const HEADER_CONTENT = pwaHeaderHeight
export const FOOTER_CONTENT = pwaFooterHeight

export const pwaChromeBottom = `${pwaFooterHeight}px`
export const pwaChromeTop = `${pwaHeaderHeight}px`

/**
 * Standalone dialog/header top pad.
 * Prefer safe-area; floor 47px so Dynamic Island / translucent status bar never clips title
 * when env() is under-reported.
 */
export const DIALOG_SAFE_TOP = 'max(47px, env(safe-area-inset-top, 0px))'

/** Total footer chrome including home-indicator band. */
export const pwaFooterChrome = `calc(${pwaFooterHeight}px + env(safe-area-inset-bottom, 0px))`

/** Total header chrome including notch / Dynamic Island. */
export const pwaHeaderChrome = `calc(${pwaHeaderHeight}px + env(safe-area-inset-top, 0px))`

export default styled.div`
  ${({
    theme: {
      app: { sidebarBGColor },
    },
  }) => css`
    background: ${sidebarBGColor};
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 4;
    /* content-box: tab row + safe-area padding paints home-indicator (no gap below bar). */
    box-sizing: content-box;
    height: ${pwaFooterHeight}px;
    padding-bottom: env(safe-area-inset-bottom, 0px);

    display: none;

    ${standaloneMedia(css`
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      justify-items: center;
      align-items: stretch;
    `)}
  `}
`

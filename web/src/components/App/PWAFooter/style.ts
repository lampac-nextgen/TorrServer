import { standaloneMedia } from 'style/standaloneMedia'
import styled, { css } from 'styled-components'

/** Master PWA chrome — fixed 90px bands (safe-area is NOT added on top). */
export const pwaFooterHeight = 90
export const pwaHeaderHeight = pwaFooterHeight

export const HEADER_CONTENT = pwaHeaderHeight
export const FOOTER_CONTENT = pwaFooterHeight

export const pwaChromeBottom = `${pwaFooterHeight}px`
export const pwaChromeTop = `${pwaHeaderHeight}px`

/**
 * Dialog top pad in standalone — master used plain 47px.
 * Keep max(..., env) so Island never clips when env is larger.
 */
export const DIALOG_SAFE_TOP = 'max(47px, env(safe-area-inset-top, 0px))'

/** Dialog lift above footer — master: exactly footer height (no extra safe-area). */
export const pwaFooterChrome = `${pwaFooterHeight}px`

/** Header grid/fixed height — master: exactly 90px. */
export const pwaHeaderChrome = `${pwaHeaderHeight}px`

export default styled.div`
  background: #575757;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 4;
  height: ${pwaFooterHeight}px;
  box-sizing: border-box;

  display: none;

  ${standaloneMedia(css`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    justify-items: center;
    align-items: center;
  `)}
`

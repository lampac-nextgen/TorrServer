import { createGlobalStyle } from 'styled-components'

import { mediaMax } from './breakpoints'
import { MOBILE_BOTTOM_NAV_PX, MOBILE_HEADER_PX } from './chrome'

/**
 * Master typography + adaptive chrome tokens.
 * Bottom nav height matches upstream PWA footer (90px); safe-area added separately.
 */
export default createGlobalStyle`
  :root {
    --safe-top: env(safe-area-inset-top, 0px);
    --safe-bottom: env(safe-area-inset-bottom, 0px);
    --app-header-h: ${MOBILE_HEADER_PX}px;
    --app-bottom-nav-h: 0px;
    --app-chrome-top: calc(var(--app-header-h) + var(--safe-top));
    --app-chrome-bottom: calc(var(--app-bottom-nav-h) + var(--safe-bottom));
  }

  ${mediaMax('mobile')} {
    :root {
      /* 90px total band — safe-area is padding inside the nav, not added on top */
      --app-bottom-nav-h: ${MOBILE_BOTTOM_NAV_PX}px;
      --app-chrome-bottom: ${MOBILE_BOTTOM_NAV_PX}px;
    }
  }

  html {
    height: 100%;
    overflow: hidden;
    font-family: 'Open Sans', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  body {
    height: 100%;
    overflow: hidden;
    font-family: inherit;
    box-sizing: border-box;
    letter-spacing: -0.1px;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    height: 100%;
    overflow: hidden;
    font-family: inherit;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
    letter-spacing: -0.1px;
  }

  /* Only OPEN modals — keepMounted Drawers leave .MuiModal-root with aria-hidden=true */
  body:has(.MuiModal-root:not([aria-hidden='true'])) .ts-bottom-nav {
    pointer-events: none;
  }

  /* Immersive video: hide bottom chrome entirely */
  body:has(.ts-immersive.MuiDialog-root:not([aria-hidden='true'])) .ts-bottom-nav,
  body:has(.MuiModal-root:not([aria-hidden='true']) .ts-immersive) .ts-bottom-nav {
    visibility: hidden;
  }
`

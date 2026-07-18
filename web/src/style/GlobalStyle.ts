import { createGlobalStyle } from 'styled-components'

import { mediaMax } from './breakpoints'
import {
  FONT_STACK,
  LETTER_SPACING,
  MOBILE_BOTTOM_NAV_PX,
  MOBILE_HEADER_PX,
  TOUCH_TARGET_PX,
  radius,
  space,
  typography,
} from './tokens'

/**
 * Viewport shell + design tokens (Wave 1 SSOT).
 * Bottom nav: 90px band including safe-area padding (not stacked on top).
 */
export default createGlobalStyle`
  :root {
    --safe-top: env(safe-area-inset-top, 0px);
    --safe-bottom: env(safe-area-inset-bottom, 0px);
    --app-header-h: ${MOBILE_HEADER_PX}px;
    --app-bottom-nav-h: 0px;
    --app-chrome-top: calc(var(--app-header-h) + var(--safe-top));
    --app-chrome-bottom: calc(var(--app-bottom-nav-h) + var(--safe-bottom));

    --ts-font-label: ${typography.label};
    --ts-font-meta: ${typography.meta};
    --ts-font-body: ${typography.body};
    --ts-font-title: ${typography.title};
    --ts-font-heading: ${typography.heading};
    --ts-font-button: ${typography.button};
    --ts-space-xs: ${space.xs}px;
    --ts-space-sm: ${space.sm}px;
    --ts-space-md: ${space.md}px;
    --ts-space-lg: ${space.lg}px;
    --ts-radius-sm: ${radius.sm}px;
    --ts-radius-md: ${radius.md}px;
    --ts-radius-lg: ${radius.lg}px;
    --ts-touch: ${TOUCH_TARGET_PX}px;
  }

  ${mediaMax('mobile')} {
    :root {
      --app-bottom-nav-h: ${MOBILE_BOTTOM_NAV_PX}px;
      --app-chrome-bottom: ${MOBILE_BOTTOM_NAV_PX}px;
    }
  }

  html {
    height: 100%;
    overflow: hidden;
    font-family: ${FONT_STACK};
    font-size: 16px;
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
    font-size: ${typography.body};
    box-sizing: border-box;
    letter-spacing: ${LETTER_SPACING};
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
    letter-spacing: ${LETTER_SPACING};
  }

  /* Only OPEN modals — keepMounted Drawers leave .MuiModal-root with aria-hidden=true */
  body:has(.MuiModal-root:not([aria-hidden='true'])) .ts-bottom-nav {
    pointer-events: none;
  }

  body:has(.ts-immersive.MuiDialog-root:not([aria-hidden='true'])) .ts-bottom-nav,
  body:has(.MuiModal-root:not([aria-hidden='true']) .ts-immersive) .ts-bottom-nav {
    visibility: hidden;
  }
`

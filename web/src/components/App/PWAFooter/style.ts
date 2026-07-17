import { standaloneMedia } from 'style/standaloneMedia'
import styled, { css } from 'styled-components'

/**
 * Compact PWA chrome (production).
 * Content heights stay small; safe-area is added only for the home indicator /
 * status bar so we do not waste ~90+34px like a padded master clone.
 */
export const pwaFooterHeight = 56
export const pwaHeaderHeight = 52

/** Reserved bottom chrome: nav content + home-indicator. */
export const pwaChromeBottom = `calc(${pwaFooterHeight}px + env(safe-area-inset-bottom, 0px))`

/** Reserved top chrome: header content + status-bar. */
export const pwaChromeTop = `calc(${pwaHeaderHeight}px + env(safe-area-inset-top, 0px))`

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
    height: ${pwaChromeBottom};
    padding-bottom: env(safe-area-inset-bottom, 0px);
    box-sizing: border-box;

    display: none;

    ${standaloneMedia(css`
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      justify-items: center;
      align-items: center;
    `)}
  `}
`

import { mediaMax } from 'style/breakpoints'
import { MOBILE_BOTTOM_NAV_PX } from 'style/chrome'
import styled, { css } from 'styled-components'

/**
 * Bottom nav — master PWA footer pattern: fixed, full-width, 90px + safe-area.
 * Always visible at ≤700 (browser and Home Screen).
 */
export default styled.nav`
  ${({
    theme: {
      app: { sidebarBGColor },
    },
  }) => css`
    display: none;
    background: ${sidebarBGColor};
    color: #fff;
    box-sizing: border-box;
    align-items: stretch;

    ${mediaMax('mobile')} {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      justify-items: stretch;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      /* Hardcoded master 90px — do not rely only on CSS vars */
      height: calc(${MOBILE_BOTTOM_NAV_PX}px + env(safe-area-inset-bottom, 0px));
      padding-bottom: env(safe-area-inset-bottom, 0px);
      padding-left: env(safe-area-inset-left, 0px);
      padding-right: env(safe-area-inset-right, 0px);
      z-index: 1100;
    }

    .MuiListItemButton-root {
      width: 100%;
      height: ${MOBILE_BOTTOM_NAV_PX}px;
      min-height: ${MOBILE_BOTTOM_NAV_PX}px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      padding: 8px 2px !important;
      color: #fff;
      gap: 2px;

      .MuiListItemIcon-root {
        min-width: 0;
        color: inherit;
        justify-content: center;
        margin: 0;

        svg {
          font-size: 26px;
          fill: currentColor;
        }
      }

      .MuiListItemText-root {
        margin: 0;
        text-align: center;

        .MuiTypography-root {
          font-size: 10px;
          line-height: 1.2;
          font-weight: 400;
        }
      }
    }

    .ts-nav-list-label {
      display: none;
    }

    .ts-nav-tab-label {
      display: block;
      font-size: 10px;
      line-height: 1.2;
      text-align: center;
    }
  `}
`

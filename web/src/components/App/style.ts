import { IconButton } from '@mui/material'
import { alphaCss } from 'shared/theme/color'
import { mediaMax } from 'style/breakpoints'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { resolveThemeColors } from 'shared/theme/color'

export const AppWrapper = styled.div<{ $isDrawerOpen?: boolean }>`
  ${({$isDrawerOpen,
    theme,
  }) => {
    const {app: { appSecondaryColor },} = resolveThemeColors(theme)
    return css`
    height: 100%;
    max-height: 100dvh;
    background: ${alphaCss(appSecondaryColor, 0.8)};
    display: grid;
    grid-template-columns: ${$isDrawerOpen ? '240px' : '60px'} 1fr;
    /* Desktop: header + content only. Bottom nav row only on mobile. */
    grid-template-rows: var(--app-chrome-top) minmax(0, 1fr);
    grid-template-areas:
      'head head'
      'side content';
    transition: grid-template-columns 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    overflow: hidden;

    ${mediaMax('mobile')} {
      grid-template-columns: 0 1fr;
      /* Spacer row = bottom nav 90px band */
      grid-template-rows: var(--app-chrome-top) minmax(0, 1fr) var(--app-chrome-bottom);
      grid-template-areas:
        'head head'
        'content content'
        'nav nav';
    }
  `
  }}
`

export const CenteredGrid = styled.div`
  grid-area: content;
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`

export const AppHeader = styled.div`
  ${({ theme }) => {
    const { primary } = resolveThemeColors(theme)
    return css`
    background: ${primary};
    color: #fff;
    grid-area: head;
    display: grid;
    grid-auto-flow: column;
    align-items: end;
    grid-template-columns: max-content minmax(0, 1fr) max-content;
    gap: 8px;
    box-shadow:
      0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%),
      0px 1px 10px 0px rgb(0 0 0 / 12%);
    padding: 0 16px;
    padding-top: var(--safe-top);
    padding-bottom: 8px;
    box-sizing: border-box;
    height: var(--app-chrome-top);
    z-index: 3;
    min-width: 0;

    ${mediaMax('mobile')} {
      grid-template-columns: minmax(0, 1fr) max-content;

      /* Menu toggle hidden — bottom nav is primary chrome */
      > :first-child {
        display: none;
      }
    }
  `
  }}
`

export const AppSidebarStyle = styled.div<{ $isDrawerOpen?: boolean }>`
  ${({ theme }) => {
    const {app: { appSecondaryColor, sidebarBGColor, sidebarFillColor },} = resolveThemeColors(theme)
    return css`
    grid-area: side;
    z-index: 2;
    overflow-x: hidden;
    border-right: 1px solid ${alphaCss(appSecondaryColor, 0.12)};
    background: ${sidebarBGColor};
    color: ${sidebarFillColor};
    white-space: nowrap;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
      width: 0;
      background: transparent;
    }

    svg {
      fill: ${sidebarFillColor};
    }

    ${mediaMax('mobile')} {
      display: none;
    }
  `
  }}
`

export const TorrentListWrapper = styled.div`
  grid-area: content;
  padding: 20px;
  overflow: auto;
  min-height: 0;
  min-width: 0;
  height: 100%;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  display: grid;
  place-content: start;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 450px), 570px));
  gap: 20px;

  ${mediaMax('list3')} {
    padding: 10px;
    gap: 15px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${mediaMax('list2')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${mediaMax('mobile')} {
    grid-template-columns: minmax(0, 1fr);
    padding: 10px;
    gap: 12px;
    /* Master PWA: extra clearance above fixed footer */
    padding-bottom: 16px;
  }
`

export const HeaderToggle = styled(IconButton)`
  ${({ theme }) => {
    const {app: { headerToggleColor },} = resolveThemeColors(theme)
    return css`
    && {
      border-radius: 50%;
      background: ${headerToggleColor};
      color: #fff;
      font-weight: 600;
      padding: 0;
      width: 35px;
      height: 35px;

      &:hover {
        background: ${alphaCss(headerToggleColor, 0.7)};
      }

      ${mediaMax('mobile')} {
        width: 28px;
        height: 28px;
        font-size: 12px;

        svg {
          font-size: 17px;
        }
      }
    }
  `
  }}
`

export const StyledIconButton = styled(IconButton)`
  margin-right: 6px;

  ${mediaMax('mobile')} {
    display: none;
  }
`

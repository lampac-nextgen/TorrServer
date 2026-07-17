import { IconButton } from '@mui/material'
import { rgba } from 'polished'
import { standaloneMedia } from 'style/standaloneMedia'
import styled, { css } from 'styled-components'

import { pwaChromeBottom, pwaChromeTop } from './PWAFooter/style'

export const AppWrapper = styled.div<{ $isDrawerOpen?: boolean }>`
  ${({
    $isDrawerOpen,
    theme: {
      app: { appSecondaryColor },
    },
  }) => css`
    height: 100%;
    background: ${rgba(appSecondaryColor, 0.8)};
    display: grid;
    grid-template-columns: ${$isDrawerOpen ? '220px' : '52px'} 1fr;
    grid-template-rows: 52px 1fr;
    grid-template-areas:
      'head head'
      'side content';
    transition: grid-template-columns 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

    @media (max-width: 930px) {
      grid-template-columns: 0 1fr;
    }

    ${standaloneMedia(css`
      grid-template-columns: 0 1fr;
      grid-template-rows: ${pwaChromeTop} minmax(0, 1fr) ${pwaChromeBottom};
      height: 100vh;
      height: 100dvh;
    `)}
  `}
`

export const CenteredGrid = styled.div`
  display: grid;
  place-items: center;

  ${standaloneMedia(css`
    height: 100vh;
    width: 100vw;
  `)}
`

export const AppHeader = styled.div`
  ${({ theme: { primary } }) => css`
    background: ${primary};
    color: #fff;
    grid-area: head;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-template-columns: max-content minmax(0, 1fr) max-content;
    gap: 8px;
    box-shadow:
      0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%),
      0px 1px 10px 0px rgb(0 0 0 / 12%);
    padding: 0 16px;
    z-index: 3;
    min-width: 0;

    @media (max-width: 930px) {
      padding: 0 8px;
      gap: 4px;
    }

    ${standaloneMedia(css`
      grid-template-columns: max-content 1fr;
      align-items: center;
      padding: 0 12px;
      padding-top: env(safe-area-inset-top, 0px);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: ${pwaChromeTop};
      box-sizing: border-box;
      z-index: 3;
      font-family: 'Open Sans', sans-serif;
      letter-spacing: normal;

      .MuiTypography-root {
        font-family: 'Open Sans', sans-serif;
        letter-spacing: normal;
      }
    `)}
  `}
`
export const AppSidebarStyle = styled.div<{ $isDrawerOpen?: boolean }>`
  ${({
    $isDrawerOpen,
    theme: {
      app: { appSecondaryColor, sidebarBGColor, sidebarFillColor },
    },
  }) => css`
    grid-area: side;
    z-index: 2;
    overflow-x: hidden;
    border-right: 1px solid ${rgba(appSecondaryColor, 0.12)};
    background: ${sidebarBGColor};
    color: ${sidebarFillColor};
    white-space: nowrap;
    /* hide scrollbars */
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
      width: 0; /* Remove scrollbar space */
      background: transparent;
    }

    svg {
      fill: ${sidebarFillColor};
    }

    @media (max-width: 930px) {
      position: fixed;
      top: 52px;
      left: 0;
      bottom: 0;
      width: 240px;
      transform: translateX(${$isDrawerOpen ? '0' : '-100%'});
      transition: transform 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
      box-shadow: ${$isDrawerOpen ? '2px 0 8px rgba(0,0,0,0.3)' : 'none'};
    }

    ${standaloneMedia(css`
      display: none;
    `)}
  `}
`
export const TorrentListWrapper = styled.div`
  grid-area: content;
  padding: 20px;
  overflow: auto;

  display: grid;
  place-content: start;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 450px), 570px));
  gap: 20px;

  @media (max-width: 1260px), (max-height: 500px) {
    padding: 10px;
    gap: 15px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 930px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 12px;
    gap: 12px;
  }

  ${standaloneMedia(css`
    min-height: 0;
    overflow: auto;
  `)}
`

/** Filled circular header actions (theme via app.headerToggleColor). */
export const HeaderToggle = styled(IconButton)`
  ${({
    theme: {
      app: { headerToggleColor },
    },
  }) => css`
    && {
      border-radius: 50%;
      background: ${headerToggleColor};
      color: #fff;
      font-weight: 600;
      padding: 0;
      width: 36px;
      height: 36px;

      &:hover {
        background: ${rgba(headerToggleColor, 0.7)};
      }

      @media (max-width: 930px) {
        width: 32px;
        height: 32px;
        font-size: 12px;

        svg {
          font-size: 18px;
        }
      }
    }
  `}
`

export const SidebarOverlay = styled.div<{ $isDrawerOpen?: boolean }>`
  display: none;

  @media (max-width: 930px) {
    display: ${({ $isDrawerOpen }) => ($isDrawerOpen ? 'block' : 'none')};
    position: fixed;
    top: 52px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;

    ${standaloneMedia(css`
      top: ${pwaChromeTop};
    `)}
  }
`

/** Menu hamburger — hidden in standalone PWA (footer nav). */
export const StyledIconButton = styled(IconButton)`
  margin-right: 4px;

  ${standaloneMedia(css`
    display: none;
  `)}
`

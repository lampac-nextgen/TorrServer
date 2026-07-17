import { IconButton } from '@mui/material'
import { rgba } from 'polished'
import { mediaMax, MEDIA_SHORT_VIEWPORT } from 'style/breakpoints'
import { standaloneMedia } from 'style/standaloneMedia'
import styled, { css } from 'styled-components'

import { pwaFooterChrome, pwaHeaderChrome } from './PWAFooter/style'

export const AppWrapper = styled.div<{ $isDrawerOpen?: boolean }>`
  ${({
    $isDrawerOpen,
    theme: {
      app: { appSecondaryColor },
    },
  }) => css`
    height: 100%;
    min-height: 100dvh;
    background: ${rgba(appSecondaryColor, 0.8)};
    display: grid;
    grid-template-columns: ${$isDrawerOpen ? '240px' : '60px'} 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas:
      'head head'
      'side content';
    transition: grid-template-columns 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    overflow: hidden;

    ${mediaMax('mobile')} {
      grid-template-columns: 0 1fr;
      grid-template-rows: calc(60px + env(safe-area-inset-top, 0px)) 1fr;
    }

    ${standaloneMedia(css`
      grid-template-columns: 0 1fr;
      grid-template-rows: ${pwaHeaderChrome} 1fr ${pwaFooterChrome};
      height: 100dvh;
      min-height: 100dvh;
      background: ${rgba(appSecondaryColor, 0.8)};
    `)}
  `}
`

export const CenteredGrid = styled.div`
  display: grid;
  place-items: center;
  min-width: 0;
  width: 100%;

  ${standaloneMedia(css`
    min-height: 100%;
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
    padding-top: env(safe-area-inset-top, 0px);
    z-index: 3;
    min-width: 0;

    ${mediaMax('mobile')} {
      height: calc(60px + env(safe-area-inset-top, 0px));
      box-sizing: border-box;
      align-items: end;
      padding-bottom: 8px;
    }

    ${standaloneMedia(css`
      grid-template-columns: max-content 1fr;
      align-items: end;
      padding: 7px 16px;
      padding-top: calc(7px + env(safe-area-inset-top, 0px));
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: ${pwaHeaderChrome};
      box-sizing: border-box;
      z-index: 3;
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
      position: fixed;
      top: calc(60px + env(safe-area-inset-top, 0px));
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
  min-height: 0;
  min-width: 0;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  display: grid;
  place-content: start;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 450px), 570px));
  gap: 20px;

  ${mediaMax('list3')}, ${MEDIA_SHORT_VIEWPORT} {
    padding: 10px;
    gap: 15px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${mediaMax('list2')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${mediaMax('mobile')} {
    grid-template-columns: minmax(0, 1fr);
  }

  ${standaloneMedia(css`
    /* Grid row is already 1fr between header/footer — do not re-subtract chrome. */
    height: auto;
    padding-bottom: 15px;
  `)}
`

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
      width: 35px;
      height: 35px;

      &:hover {
        background: ${rgba(headerToggleColor, 0.7)};
      }

      ${mediaMax('mobile')} {
        width: 44px;
        height: 44px;
        font-size: 12px;

        svg {
          font-size: 20px;
        }
      }
    }
  `}
`

export const SidebarOverlay = styled.div<{ $isDrawerOpen?: boolean }>`
  display: none;

  ${mediaMax('mobile')} {
    display: ${({ $isDrawerOpen }) => ($isDrawerOpen ? 'block' : 'none')};
    position: fixed;
    top: calc(60px + env(safe-area-inset-top, 0px));
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`

export const StyledIconButton = styled(IconButton)`
  margin-right: 6px;

  ${standaloneMedia(css`
    display: none;
  `)}
`

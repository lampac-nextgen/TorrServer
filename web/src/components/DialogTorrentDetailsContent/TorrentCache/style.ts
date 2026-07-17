import styled, { css } from 'styled-components'

import { snakeSettings, type SnakeThemeMode } from './snakeSettings'

export const ScrollNotification = styled.div<{ $themeType?: SnakeThemeMode }>`
  margin-top: 10px;
  text-transform: uppercase;
  align-self: center;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ $themeType }) => ($themeType === 'dark' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.5)')};
`

export const SnakeWrapper = styled.div<{ $isMini?: boolean; $themeType?: SnakeThemeMode }>`
  width: 100%;
  min-width: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  ${({ $isMini, $themeType }) =>
    $isMini
      ? css`
          display: grid;
          justify-content: center;
          max-height: ${snakeSettings[$themeType ?? 'light'].mini.cacheMaxHeight}px;
        `
      : css`
          max-height: min(70vh, 640px);
        `}

  canvas {
    display: block;
    max-width: 100%;
  }
`

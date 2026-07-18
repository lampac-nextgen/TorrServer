import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { resolveThemeColors } from 'shared/theme/color'

import { snakeSettings, type SnakeThemeMode } from './snakeSettings'

export const ScrollNotification = styled.div<{ $themeType?: SnakeThemeMode }>`
  margin-top: var(--ts-space-sm);
  text-transform: uppercase;
  align-self: center;
  font-size: var(--ts-font-label);
  letter-spacing: 0.4px;
  color: ${({ $themeType }) => ($themeType === 'dark' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.5)')};
`

export const SnakeTooltip = styled.div`
  position: absolute;
  z-index: 2;
  pointer-events: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.3;
  white-space: nowrap;
  background: rgba(20, 28, 24, 0.92);
  color: #fff;
`

export const SnakeWrapper = styled.div<{
  $isMini?: boolean
  $themeType?: SnakeThemeMode
}>`
  width: 100%;
  min-width: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  position: relative;

  ${({ $isMini, $themeType }) =>
    $isMini
      ? css`
          display: grid;
          justify-content: center;
          max-height: ${snakeSettings[$themeType ?? 'light'].mini.cacheMaxHeight}px;
        `
      : css`
          max-height: min(70dvh, 640px);
        `}

  canvas {
    display: block;
    max-width: 100%;
  }
`

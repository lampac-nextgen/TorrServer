import styled, { css } from 'styled-components'

import { snakeSettings } from './snakeSettings'

export const ScrollNotification = styled.div`
  margin-top: 10px;
  text-transform: uppercase;
  align-self: center;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ $themeType }) => ($themeType === 'dark' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.5)')};
`

export const SnakeWrapper = styled.div`
  width: 100%;
  min-width: 0;

  ${({ $isMini, $themeType }) =>
    $isMini &&
    css`
      display: grid;
      justify-content: center;
      max-height: ${snakeSettings[$themeType].mini.cacheMaxHeight}px;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
    `}

  canvas {
    display: block;
    max-width: 100%;
  }
`

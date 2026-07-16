import { standaloneMedia } from 'style/standaloneMedia'
import styled, { css } from 'styled-components'

export const pwaFooterHeight = 90

export default styled.div`
  background: #575757;
  color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: ${pwaFooterHeight}px;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  box-sizing: content-box;

  display: none;

  ${standaloneMedia(css`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    justify-items: center;
    align-items: center;
  `)}
`

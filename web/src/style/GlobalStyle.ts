import { createGlobalStyle, css } from 'styled-components'

import { standaloneMedia } from './standaloneMedia'

/**
 * One typography stack for browser + PWA (Open Sans via Google Fonts CDN in index.html).
 * `standaloneMedia` must not override font-size / letter-spacing / font-family.
 */
export default createGlobalStyle`
  *,
  *::before,
  *::after {  
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    overflow-x: clip;
  }

  body {  
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: normal;
    -webkit-tap-highlight-color: transparent;
    background: #eee;
    overscroll-behavior-y: none;

    ${standaloneMedia(css`
      /* Layout / chrome only — never PWA-specific type */
      height: 100%;
      min-height: 100dvh;
      background: #323637;
    `)}
  }

  button {
    font-family: 'Open Sans', sans-serif;
    letter-spacing: normal;
  }

  img, video, canvas {
    max-width: 100%;
  }
`

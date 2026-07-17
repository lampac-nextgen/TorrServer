import { createGlobalStyle, css } from 'styled-components'

import { standaloneMedia } from './standaloneMedia'

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
  }

  body {  
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: normal;
    -webkit-tap-highlight-color: transparent;
    font-synthesis: none;

    ${standaloneMedia(css`
      height: 100vh;
      height: 100dvh;
      /* Match browser web metrics — avoid PWA-only tight tracking */
      letter-spacing: normal;
    `)}
  }

  button {
    font-family: "Open Sans", sans-serif;
    letter-spacing: normal;
  }

  /* Better tap targets and overflow safety on small screens */
  img, video, canvas {
    max-width: 100%;
  }
`

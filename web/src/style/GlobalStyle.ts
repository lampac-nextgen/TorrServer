import { createGlobalStyle, css } from 'styled-components'

import { standaloneMedia } from './standaloneMedia'

/** Master typography baseline — letter-spacing -0.1px (do not invent “normal”). */
export default createGlobalStyle`
  *,
  *::before,
  *::after {  
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  body {  
    font-family: "Open Sans", sans-serif;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.1px;
    -webkit-tap-highlight-color: transparent;

    ${standaloneMedia(css`
      /* Master: height only. Safe-area/chrome live in App shell — not body paint. */
      height: 100%;
      min-height: 100dvh;
    `)}
  }

  button {
    font-family: "Open Sans", sans-serif;
    letter-spacing: -0.1px;
  }
`

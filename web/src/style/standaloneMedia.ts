import type { Interpolation, RuleSet } from 'styled-components'
import { css } from 'styled-components'

/**
 * CSS standalone rules must match JS `detectStandaloneApp()`.
 * Use for layout/chrome only (display, height, safe-area padding).
 * Do NOT put font-size / letter-spacing / font-family here — one type stack for all modes.
 */
export const standaloneMedia = (styles: Interpolation<object>): RuleSet<object> => css`
  @media screen and (display-mode: standalone) {
    ${styles};
  }

  html[data-standalone='1'] & {
    ${styles};
  }
`

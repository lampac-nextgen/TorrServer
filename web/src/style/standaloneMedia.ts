import type { Interpolation, RuleSet } from 'styled-components'
import { css } from 'styled-components'

/**
 * CSS standalone rules must match JS `detectStandaloneApp()`.
 * `display-mode: standalone` covers most PWAs; `html[data-standalone='1']`
 * covers iOS `navigator.standalone` where the media query may not match.
 */
export const standaloneMedia = (styles: Interpolation<object>): RuleSet<object> => css`
  @media screen and (display-mode: standalone) {
    ${styles};
  }

  html[data-standalone='1'] & {
    ${styles};
  }
`

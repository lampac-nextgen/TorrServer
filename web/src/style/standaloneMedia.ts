import type { Interpolation, RuleSet } from 'styled-components'
import { css } from 'styled-components'

export const standaloneMedia = (styles: Interpolation<object>): RuleSet<object> => css`
  @media screen and (display-mode: standalone) {
    ${styles};
  }
`

import { mediaMax } from 'style/breakpoints'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { resolveThemeColors } from 'shared/theme/color'

export const DetailedViewWidgetSection = styled.section`
  ${({ theme }) => {
    const {detailedView: { gradientStartColor, gradientEndColor },} = resolveThemeColors(theme)
    return css`
    padding: 40px;
    background: linear-gradient(145deg, ${gradientStartColor}, ${gradientEndColor});

    ${mediaMax('mobile')} {
      padding: 20px;
    }
  `
  }}
`

export const DetailedViewCacheSection = styled.section`
  ${({ theme }) => {
    const {detailedView: { cacheSectionBGColor },} = resolveThemeColors(theme)
    return css`
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${cacheSectionBGColor};
    flex: 1;

    ${mediaMax('mobile')} {
      padding: 20px;
    }
  `
  }}
`

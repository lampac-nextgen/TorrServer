import { mediaMax } from 'style/breakpoints'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { resolveThemeColors } from 'shared/theme/color'

export const MainSectionButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 16px;
  align-items: stretch;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  > a,
  > span {
    display: flex;
    min-width: 0;
    width: 100%;
  }

  > .MuiButton-root,
  > a > .MuiButton-root,
  > span > .MuiButton-root {
    width: 100%;
    min-height: 44px;
    height: 100%;
    box-sizing: border-box;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  ${mediaMax('mobile')} {
    grid-template-columns: 1fr;
  }
`

export const SmallLabel = styled.div<{ $mb?: number }>`
  ${({$mb,
    theme,
  }) => {
    const {torrentFunctions: { fontColor },} = resolveThemeColors(theme)
    return css`
    ${$mb && `margin-bottom: ${$mb}px`};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    color: ${fontColor};

    ${mediaMax('mobile')} {
      font-size: 13px;
      font-weight: 400;
      ${$mb && `margin-bottom: ${$mb / 1.5}px`};
    }
  `
  }}
`

import styled, { css } from 'styled-components'

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

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`

export const SmallLabel = styled.div<{ $mb?: number }>`
  ${({
    $mb,
    theme: {
      torrentFunctions: { fontColor },
    },
  }) => css`
    ${$mb && `margin-bottom: ${$mb}px`};
    font-size: 13px;
    font-weight: 500;
    line-height: 1.2;
    color: ${fontColor};

    @media (max-width: 800px) {
      font-size: 12px;
      ${$mb && `margin-bottom: ${$mb / 1.5}px`};
    }
  `}
`

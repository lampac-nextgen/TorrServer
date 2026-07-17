import styled, { css } from 'styled-components'
import { standaloneMedia } from 'style/standaloneMedia'
import { mediaMax } from 'style/breakpoints'
import { DIALOG_SAFE_TOP } from 'components/App/PWAFooter/style'

export const DialogWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  font-weight: 400;
  padding: 16px 20px;

  img {
    width: 48px;
  }

  ${mediaMax('mobile')} {
    font-size: 18px;
    padding: 10px 16px;

    img {
      width: 40px;
    }
  }

  ${standaloneMedia(css`
    padding-top: ${DIALOG_SAFE_TOP};
  `)}
`

export const ThanksSection = styled.section`
  ${({
    theme: {
      aboutDialog: { bandBG, bandFontColor },
    },
  }) => css`
    padding: 16px 20px;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    background: ${bandBG};
    color: ${bandFontColor};

    ${mediaMax('mobile')} {
      font-size: 14px;
      padding: 20px 16px;
    }
  `}
`

export const Section = styled.section`
  padding: 16px 20px;

  > span {
    font-size: 15px;
    font-weight: 500;
    display: block;
    margin-bottom: 12px;
  }

  a {
    text-decoration: none;
  }

  > div {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    ${mediaMax('tablet')} {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    ${mediaMax('mobile')} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    ${mediaMax('compact')} {
      grid-template-columns: 1fr;
    }
  }
`

export const FooterSection = styled.div`
  ${({
    theme: {
      aboutDialog: { bandBG },
    },
  }) => css`
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    background: ${bandBG};
  `}
`

export const LinkWrapper = styled.a<{ $isLink?: boolean }>`
  ${({ $isLink }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: start;
    border: 1px solid;
    padding: 7px 10px;
    border-radius: 5px;
    text-transform: uppercase;
    text-decoration: none;
    background: #545a5e;
    color: #f1eff3;
    transition: 0.2s;
    min-width: 0;

    > * {
      transition: 0.2s;
    }

    ${
      $isLink
        ? css`
            :hover {
              filter: brightness(1.1);

              > * {
                transform: translateY(0px);
              }
            }
          `
        : css`
            cursor: default;
          `
    }
  `}
`

export const LinkIcon = styled.div`
  display: grid;
  margin-right: 10px;
`

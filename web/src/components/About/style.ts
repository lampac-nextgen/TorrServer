import styled, { css } from 'styled-components'
import { standaloneMedia } from 'style/standaloneMedia'

export const DialogWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
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

  @media (max-width: 930px) {
    font-size: 18px;
    padding: 10px 16px;

    img {
      width: 40px;
    }
  }

  ${standaloneMedia(css`
    padding-top: 24px;
  `)}
`

export const ThanksSection = styled.section`
  padding: 16px 20px;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  background: #e8e5eb;
  color: #323637;

  @media (max-width: 930px) {
    font-size: 14px;
    padding: 20px 16px;
  }
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
    grid-template-columns: repeat(4, max-content);

    @media (max-width: 930px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 780px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 550px) {
      grid-template-columns: 1fr;
    }
  }
`

export const FooterSection = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  background: #e8e5eb;
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

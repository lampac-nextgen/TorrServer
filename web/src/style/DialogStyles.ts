import styled, { css } from 'styled-components'

export const Header = styled.div`
  ${({ theme: { primary } }) => css`
    background: ${primary};
    font-size: 18px;
    color: #fff;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    letter-spacing: normal;
    box-shadow:
      0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%),
      0px 1px 10px 0px rgb(0 0 0 / 12%);
    padding: 12px 16px;
    position: relative;
  `}
`

/** Shared dialog footer used by Settings, Search, Add. */
export const DialogFooter = styled.div`
  ${({
    theme: {
      settingsDialog: { footerBG },
      addDialog: { separatorColor },
    },
  }) => css`
    padding: 12px 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: stretch;
    gap: 8px;
    border-top: 1px solid ${separatorColor};
    background: ${footerBG};

    .MuiButton-root {
      min-height: 36px;
      min-width: 96px;
      padding-left: 14px;
      padding-right: 14px;
    }

    @media (max-width: 500px) {
      padding: 12px;
      /* Keep DOM order: Cancel → Default → Save (primary at bottom for thumb reach) */
      flex-direction: column;
      justify-content: stretch;

      .MuiButton-root {
        width: 100%;
        min-width: 0;
      }
    }
  `}
`

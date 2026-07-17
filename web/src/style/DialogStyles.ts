import styled, { css } from 'styled-components'
import { mediaMax } from 'style/breakpoints'

export const Header = styled.div`
  ${({ theme: { primary } }) => css`
    background: ${primary};
    font-size: 18px;
    color: #fff;
    font-weight: 500;
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
      min-height: 44px;
      min-width: 96px;
      padding-left: 14px;
      padding-right: 14px;
    }

    ${mediaMax('compact')} {
      padding: 12px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;

      /* Cancel | Reset on first row; Save full-width below (primary thumb reach) */
      .MuiButton-root:last-child {
        grid-column: 1 / -1;
      }

      .MuiButton-root {
        width: 100%;
        min-width: 0;
        min-height: 44px;
      }
    }
  `}
`

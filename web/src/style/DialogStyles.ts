import styled, { css } from 'styled-components'

export const Header = styled.div`
  ${({ theme: { primary } }) => css`
    background: ${primary};
    font-size: 20px;
    color: #fff;
    font-weight: 600;
    box-shadow:
      0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%),
      0px 1px 10px 0px rgb(0 0 0 / 12%);
    padding: 15px 24px;
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
    padding: 16px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: stretch;
    gap: 10px;
    border-top: 1px solid ${separatorColor};
    background: ${footerBG};

    .MuiButton-root {
      min-height: 40px;
      min-width: 128px;
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (max-width: 500px) {
      padding: 12px;
      flex-direction: column-reverse;
      justify-content: stretch;

      .MuiButton-root {
        width: 100%;
        min-width: 0;
      }
    }
  `}
`

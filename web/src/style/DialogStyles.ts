import styled, { css } from 'styled-components'
import { mediaMax } from 'style/breakpoints'
import { TOUCH_TARGET_PX, cssVar, space, typography } from 'style/tokens'

export const Header = styled.div`
  ${({ theme: { primary } }) => css`
    background: ${primary};
    color: #fff;
    font-size: ${typography.heading};
    font-weight: 600;
    box-shadow:
      0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%),
      0px 1px 10px 0px rgb(0 0 0 / 12%);
    padding: ${space.md}px ${space.xxl}px;
    position: relative;

    ${mediaMax('mobile')} {
      font-size: ${typography.body};
      padding: ${space.md}px ${space.lg}px;
    }
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
    padding: ${space.md}px ${space.lg}px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: stretch;
    gap: ${space.sm}px;
    border-top: 1px solid ${separatorColor};
    background: ${footerBG};

    .MuiButton-root {
      min-height: ${TOUCH_TARGET_PX}px;
      min-width: 96px;
      padding-left: 14px;
      padding-right: 14px;
    }

    ${mediaMax('compact')} {
      padding: ${space.md}px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${space.sm}px;

      .MuiButton-root:last-child {
        grid-column: 1 / -1;
      }

      .MuiButton-root {
        width: 100%;
        min-width: 0;
        min-height: ${TOUCH_TARGET_PX}px;
      }
    }
  `}
`

export { cssVar }

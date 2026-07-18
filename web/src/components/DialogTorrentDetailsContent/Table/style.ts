import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { resolveThemeColors } from 'shared/theme/color'
import { mediaMax } from 'style/breakpoints'

const viewedIndicator = (theme: Parameters<typeof resolveThemeColors>[0]) => {
  const {
    table: { defaultPrimaryColor },
  } = resolveThemeColors(theme)
  return css`
    &::before {
      content: '';
      width: 10px;
      height: 10px;
      background: ${defaultPrimaryColor};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `
}

export const TableStyle = styled.table`
  ${({ theme }) => {
    const {table: {
        defaultPrimaryColor,
        rowBGColor,
        viewedRowBGColor,
        dividerColor,
        rowFontColor,
        outlinedButtonBorderColor,
      },} = resolveThemeColors(theme)
    return css`
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.8125rem;
    width: 100%;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    color: ${rowFontColor};

    thead tr {
      background: ${defaultPrimaryColor};
      color: #fff;
      text-align: left;
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 500;
    }

    th,
    td {
      padding: 10px 12px;
    }

    tbody tr {
      border-bottom: 1px solid ${dividerColor};
      background: ${rowBGColor};

      &:last-of-type {
        border-bottom: 2px solid ${defaultPrimaryColor};
      }

      &.viewed-file-row {
        background: ${viewedRowBGColor};
      }
    }

    td {
      &.viewed-file-indicator {
        position: relative;

        ${viewedIndicator(theme)}
      }
    }

    .button-cell {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
      gap: 6px;
      min-width: 0;
      width: 100%;

      > * {
        min-width: 0;
        display: flex;
      }

      .MuiButton-root {
        width: 100%;
        min-width: 0;
        min-height: 32px;
        height: 32px;
        padding: 0 8px;
        font-size: 12px;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .MuiButton-outlined {
        border-color: ${outlinedButtonBorderColor};
      }
    }

    ${mediaMax('shortTable')} {
      display: none;
    }
  `
  }}
`

export const ShortTableWrapper = styled.div`
  display: none;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  ${mediaMax('shortTable')} {
    display: grid;
  }

  ${mediaMax('tablet')} {
    gap: 15px;
    grid-template-columns: 1fr;
  }
`

export const ShortTable = styled.div<{ $isViewed?: boolean }>`
  ${({$isViewed,
    theme,
  }) => {
    const {table: {
        defaultPrimaryColor,
        defaultSecondaryColor,
        defaultTertiaryColor,
        shortTableButtonsBGColor,
        viewedPrimaryColor,
        viewedSecondaryColor,
        viewedTertiaryColor,
      },} = resolveThemeColors(theme)
    return css`
    display: grid;
    width: 100%;
    grid-template-rows: repeat(3, max-content);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    .short-table {
      &-name {
        background: ${$isViewed ? viewedPrimaryColor : defaultPrimaryColor};
        display: grid;
        place-items: center;
        padding: 15px;
        color: #fff;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 600;
        word-break: break-word;

        ${mediaMax('tablet')} {
          font-size: 12px;
          padding: 10px;
        }
      }
      &-data {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: ${$isViewed ? 'max-content' : '1fr'};
        grid-auto-columns: 1fr;
      }
      &-field {
        display: grid;
        grid-template-rows: 30px 1fr;
        background: ${$isViewed ? viewedPrimaryColor : defaultPrimaryColor};
        &:not(:last-child) {
          border-right: 1px solid ${$isViewed ? viewedPrimaryColor : defaultPrimaryColor};
        }

        &-name {
          background: ${$isViewed ? viewedSecondaryColor : defaultSecondaryColor};
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          display: grid;
          place-items: center;
          padding: 0 10px;

          ${mediaMax('tablet')} {
            font-size: 12px;
          }
        }

        &-value {
          background: ${$isViewed ? viewedTertiaryColor : defaultTertiaryColor};
          display: grid;
          place-items: center;
          color: #fff;
          font-size: 13px;
          padding: 12px 10px;
          position: relative;

          ${mediaMax('tablet')} {
            font-size: 12px;
            padding: 10px 8px;
          }
        }
      }

      &-viewed-indicator {
        ${$isViewed && viewedIndicator(theme)}
      }

      &-buttons {
        padding: 12px;
        border-bottom: 2px solid ${$isViewed ? viewedPrimaryColor : defaultPrimaryColor};
        background: ${shortTableButtonsBGColor};

        .button-cell {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          width: 100%;

          & > *:last-child:nth-child(odd) {
            grid-column: 1 / -1;
          }
        }

        .MuiButton-root {
          min-height: 44px;
          font-size: 12px;
          padding: 6px 8px;
        }

        ${mediaMax('phone')} {
          padding: 10px;

          .button-cell {
            gap: 6px;
          }

          .MuiButton-root {
            min-height: 44px;
            font-size: 12px;
          }
        }
      }
    }
  `
  }}
`

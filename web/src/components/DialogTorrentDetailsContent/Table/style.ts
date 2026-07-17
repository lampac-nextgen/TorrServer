import styled, { css } from 'styled-components'

const viewedIndicator = css`
  ${({
    theme: {
      table: { defaultPrimaryColor },
    },
  }) => css`
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
  `}
`
export const TableStyle = styled.table`
  ${({
    theme: {
      table: {
        defaultPrimaryColor,
        rowBGColor,
        viewedRowBGColor,
        dividerColor,
        rowFontColor,
        outlinedButtonBorderColor,
      },
    },
  }) => css`
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

        ${viewedIndicator}
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

    @media (max-width: 970px) {
      display: none;
    }
  `}
`

export const ShortTableWrapper = styled.div`
  display: none;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 970px) {
    display: grid;
  }

  @media (max-width: 820px) {
    gap: 15px;
    grid-template-columns: 1fr;
  }
`

export const ShortTable = styled.div<{ $isViewed?: boolean }>`
  ${({
    $isViewed,
    theme: {
      table: {
        defaultPrimaryColor,
        defaultSecondaryColor,
        defaultTertiaryColor,
        shortTableButtonsBGColor,
        viewedPrimaryColor,
        viewedSecondaryColor,
        viewedTertiaryColor,
      },
    },
  }) => css`
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

        @media (max-width: 880px) {
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

          @media (max-width: 880px) {
            font-size: 11px;
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

          @media (max-width: 880px) {
            font-size: 12px;
            padding: 10px 8px;
          }
        }
      }

      &-viewed-indicator {
        ${$isViewed && viewedIndicator}
      }

      &-buttons {
        padding: 20px;
        border-bottom: 2px solid ${$isViewed ? viewedPrimaryColor : defaultPrimaryColor};
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        align-items: center;
        gap: 20px;
        background: ${shortTableButtonsBGColor};

        .MuiButton-root {
          min-height: 44px;
        }

        @media (max-width: 410px) {
          gap: 10px;
          grid-template-columns: 1fr;
        }
      }
    }
  `}
`

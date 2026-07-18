import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { resolveThemeColors } from 'shared/theme/color'
import { DialogFooter } from 'style/DialogStyles'
import { mediaMax } from 'style/breakpoints'

export const Content = styled.div`
  ${({ theme }) => {
    const {settingsDialog: { contentBG },} = resolveThemeColors(theme)
    return css`
    background: ${contentBG};
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: calc(100dvh - var(--app-chrome-top) - var(--app-chrome-bottom));

    ${mediaMax('mobile')} {
      max-height: none;
      flex: 1 1 auto;
    }
  `
  }}
`

export const SearchBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  ${mediaMax('compact')} {
    padding: 12px 12px 0;
  }
`

export const SearchToolbar = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 12px;
  position: sticky;
  top: 0;
  z-index: 2;
  padding-bottom: 4px;
  background: ${({ theme }) => resolveThemeColors(theme).settingsDialog.contentBG};

  .search-tracker {
    min-width: 150px;
    flex: 0 0 auto;
  }

  .search-query {
    flex: 1 1 200px;
    min-width: 0;
  }

  .search-submit {
    min-width: 100px;
    height: 40px;
    flex: 0 0 auto;
  }

  ${mediaMax('compact')} {
    .search-tracker {
      flex: 1 1 100%;
      min-width: 0;
    }

    .search-submit {
      min-width: 80px;
    }
  }

  ${mediaMax('phone')} {
    flex-direction: column;

    .search-query,
    .search-submit {
      flex: 1 1 100%;
      width: 100%;
      min-width: 0;
    }

    .search-submit {
      min-width: 0;
    }
  }
`

export const ResultsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 8px;
  padding: 4px 0;

  ${mediaMax('compact')} {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;

    .MuiToggleButtonGroup-root {
      width: 100%;
      display: flex;
    }

    .MuiToggleButton-root {
      flex: 1 1 0;
    }
  }
`

export const ResultsCount = styled.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`

export const ResultsScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px 12px;
`

export const EmptyState = styled.div`
  display: grid;
  place-items: center;
  min-height: 160px;
  padding: 24px 12px;
  text-align: center;
  opacity: 0.7;
`

export const ResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const ResultRow = styled.li`
  ${({ theme }) => {
    const {app: { paperColor },
      addDialog: { separatorColor },} = resolveThemeColors(theme)
    return css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px 12px;
    align-items: center;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid ${separatorColor};
    background: ${paperColor};
    cursor: pointer;
    transition: filter 0.15s ease;

    &:hover {
      filter: brightness(0.97);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    ${mediaMax('compact')} {
      padding: 8px 10px;
      gap: 6px 8px;
    }
  `
  }}
`

export const ResultMain = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const ResultTitle = styled.div`
  font-size: 13px;
  line-height: 1.35;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;

  ${mediaMax('compact')} {
    font-size: 12.5px;
  }
`

export const MetaBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`

export const ResultAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Footer = styled(DialogFooter)`
  ${mediaMax('phone')} {
    .MuiButton-root {
      width: 100%;
    }
  }
`

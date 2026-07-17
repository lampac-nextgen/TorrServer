import styled, { css } from 'styled-components'

export const Content = styled.div`
  ${({
    theme: {
      settingsDialog: { contentBG },
    },
  }) => css`
    background: ${contentBG};
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: calc(100vh - 160px);

    @media (max-width: 930px) {
      max-height: none;
      flex: 1 1 auto;
    }
  `}
`

export const SearchBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  @media (max-width: 600px) {
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
  background: ${({
    theme: {
      settingsDialog: { contentBG },
    },
  }) => contentBG};

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

  @media (max-width: 600px) {
    .search-tracker {
      flex: 1 1 100%;
      min-width: 0;
    }

    .search-submit {
      min-width: 80px;
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
`

export const ResultsCount = styled.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`

export const SortChips = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`

export const SortChip = styled.button<{ $active?: boolean }>`
  ${({
    $active,
    theme: {
      app: { paperColor },
      addDialog: { separatorColor },
    },
  }) => css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 28px;
    padding: 0 10px;
    border-radius: 14px;
    border: 1px solid ${separatorColor};
    background: ${$active ? paperColor : 'transparent'};
    color: inherit;
    font-size: 12px;
    font-weight: ${$active ? 600 : 400};
    cursor: pointer;
    line-height: 1;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;

    &:hover {
      background: ${paperColor};
    }

    svg {
      font-size: 14px;
    }
  `}
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
  ${({
    theme: {
      app: { paperColor },
      addDialog: { separatorColor },
    },
  }) => css`
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

    @media (max-width: 600px) {
      padding: 8px 10px;
      gap: 6px 8px;
    }
  `}
`

export const ResultMain = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const ResultTitle = styled.div`
  font-size: 14px;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`

export const MetaBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`

export const MetaBadge = styled.span<{ $tone?: 'neutral' | 'seeds' | 'peers' }>`
  ${({
    $tone = 'neutral',
    theme: {
      addDialog: { separatorColor },
    },
  }) => {
    const tones = {
      neutral: { bg: separatorColor },
      seeds: { bg: 'rgba(0, 167, 114, 0.22)' },
      peers: { bg: separatorColor },
    }
    const { bg } = tones[$tone]
    return css`
      display: inline-flex;
      align-items: center;
      height: 20px;
      padding: 0 8px;
      border-radius: 10px;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      line-height: 1;
      white-space: nowrap;
      background: ${bg};
      opacity: 0.95;
    `
  }}
`

export const ResultAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Footer = styled.div`
  ${({
    theme: {
      settingsDialog: { footerBG },
      addDialog: { separatorColor },
    },
  }) => css`
    padding: 16px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    border-top: 1px solid ${separatorColor};
    background: ${footerBG};
    flex-shrink: 0;

    @media (max-width: 600px) {
      padding: 12px;
    }
  `}
`

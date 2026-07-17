import styled, { css } from 'styled-components'

export const TorrentCard = styled.div`
  ${({
    theme: {
      torrentCard: { cardPrimaryColor },
    },
  }) => css`
    border-radius: 5px;
    display: grid;
    grid-template-columns: 110px minmax(0, 1fr) minmax(132px, 0.9fr);
    grid-template-rows: 180px;
    grid-template-areas: 'poster description buttons';
    gap: 8px;
    padding: 8px;
    background: ${cardPrimaryColor};
    box-shadow:
      0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%),
      0px 1px 10px 0px rgb(0 0 0 / 12%);
    min-width: 0;

    @media (max-width: 1260px), (max-height: 500px) {
      grid-template-areas:
        'poster description'
        'buttons buttons';

      grid-template-columns: 70px minmax(0, 1fr);
      grid-template-rows: 110px max-content;
    }

    @media (max-width: 770px) {
      grid-template-columns: 60px minmax(0, 1fr);
      grid-template-rows: 90px max-content;
    }

    @media (max-width: 420px) {
      grid-template-columns: 52px minmax(0, 1fr);
      gap: 8px;
      padding: 8px;
    }
  `}
`

export const TorrentCardPoster = styled.button<{ $isPoster?: boolean }>`
  grid-area: poster;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  width: 100%;
  height: 100%;
  display: block;
  color: inherit;
  font: inherit;

  :hover {
    filter: brightness(0.7);
  }

  ${({
    $isPoster,
    theme: {
      torrentCard: { cardSecondaryColor, accentCardColor },
    },
  }) =>
    $isPoster
      ? css`
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
          }
        `
      : css`
          display: grid;
          place-items: center;
          background: ${cardSecondaryColor};
          border: 1px solid ${accentCardColor};

          svg {
            transform: translateY(-3px);
          }
        `};

  @media (max-width: 1260px), (max-height: 500px) {
    svg {
      width: 50%;
    }
  }
`

export const TorrentCardButtons = styled.div`
  grid-area: buttons;
  display: grid;
  gap: 8px;

  @media (max-width: 1260px), (max-height: 500px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 340px) {
    gap: 5px;
  }
`
export const TorrentCardDescription = styled.div`
  ${({
    theme: {
      torrentCard: { cardSecondaryColor, sectionLabelColor },
    },
  }) => css`
    grid-area: description;
    background: ${cardSecondaryColor};
    border-radius: 5px;
    padding: 5px;
    display: grid;
    grid-template-rows: 55% 1fr;
    gap: 10px;

    @media (max-width: 770px) {
      grid-template-rows: 60% 1fr;
      gap: 3px;
    }

    .description-title-wrapper {
      display: flex;
      flex-direction: column;
      min-width: 0;
      gap: 4px;
    }

    .description-title-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-width: 0;
    }

    .description-section-name {
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.4px;
      color: ${sectionLabelColor};
      min-width: 0;

      @media (max-width: 770px) {
        font-size: 0.65rem;
        line-height: 12px;
      }
    }

    .description-status-wrapper {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      margin-inline-start: 4px;
    }

    .description-torrent-title {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-word;
      line-height: 1.25;
    }

    .description-statistics-wrapper {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr);
      gap: 6px;
      align-self: end;
      min-width: 0;
    }

    .description-statistics-element-wrapper {
      min-width: 0;
    }

    .description-statistics-element-value {
      margin-bottom: 8px;
      margin-left: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-variant-numeric: tabular-nums;
      font-size: 0.875rem;
      line-height: 1.2;

      @media (max-width: 1260px), (max-height: 500px) {
        font-size: 0.7rem;
        margin-bottom: 0;
        margin-left: 0;
      }
    }

    .description-torrent-title,
    .description-statistics-element-value {
      @media (max-width: 770px) {
        font-size: 0.6rem;
      }

      @media (max-width: 410px) {
        font-size: 0.7rem;
      }
    }
  `}
`

export const StatusIndicators = styled.div<{ $color?: string }>`
  ${({ $color }) => css`
    height: 8px;
    width: 8px;
    background-color: ${$color};
    border-radius: 50%;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  `}
`

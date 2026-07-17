import styled, { css } from 'styled-components'

export const TorrentCard = styled.div`
  ${({
    theme: {
      torrentCard: { cardPrimaryColor },
    },
  }) => css`
    border-radius: 5px;
    display: grid;
    grid-template-columns: 120px minmax(0, 260px) minmax(0, 1fr);
    grid-template-rows: 210px;
    grid-template-areas: 'poster description buttons';
    gap: 10px;
    padding: 10px;
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

export const TorrentCardPoster = styled.div<{ $isPoster?: boolean }>`
  grid-area: poster;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  position: relative;

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
  gap: 10px;

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
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.4px;
      color: ${sectionLabelColor};
      min-width: 0;

      @media (max-width: 770px) {
        font-size: 0.75rem;
        line-height: 14px;
      }
    }

    .description-status-chip {
      flex-shrink: 0;
      max-width: 55%;
      height: 22px;

      .MuiChip-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-inline: 8px;
        font-size: 0.7rem;
        font-weight: 600;
      }
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
      margin-bottom: 10px;
      margin-left: 0;

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

export const StyledButton = styled.button`
  ${({
    theme: {
      torrentCard: { buttonBGColor, accentCardColor },
    },
  }) => css`
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.15s ease,
      opacity 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    text-transform: uppercase;
    background: ${buttonBGColor};
    color: #fff;
    font-size: 0.9rem;
    letter-spacing: 0.009em;
    padding: 0 12px;
    min-height: 44px;
    min-width: 0;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;

    svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    :hover {
      background: ${accentCardColor};
    }

    :active {
      transform: scale(0.98);
    }

    :disabled {
      cursor: wait;
      opacity: 0.75;
    }

    > :first-child {
      margin-right: 10px;
    }

    @media (max-width: 1260px), (max-height: 500px) {
      padding: 8px 10px;
      justify-content: center;
      font-size: 0.8rem;
      min-height: 44px;

      svg {
        display: none;
      }

      > :first-child {
        margin-right: 0;
      }
    }

    @media (max-width: 770px) {
      font-size: 0.7rem;
    }

    @media (max-width: 420px) {
      font-size: 0.65rem;
      padding: 8px 6px;
      min-height: 44px;
    }
  `}
`

export const StatusIndicators = styled.div<{ $color?: string }>`
  ${({ $color }) => css`
    height: 8px;
    width: 8px;
    background-color: ${$color};
    border-radius: 50%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  `}
`

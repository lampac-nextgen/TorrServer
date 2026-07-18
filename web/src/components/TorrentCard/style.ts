import { mediaMax, MEDIA_SHORT_VIEWPORT } from 'style/breakpoints'
import { cssVar, radius, typography } from 'style/tokens'
import styled, { css } from 'styled-components'

export const TorrentCard = styled.div`
  ${({
    theme: {
      torrentCard: { cardPrimaryColor },
    },
  }) => css`
    border-radius: ${radius.sm}px;
    display: grid;
    grid-template-columns: 120px 260px 1fr;
    grid-template-rows: 180px;
    grid-template-areas: 'poster description buttons';
    gap: 10px;
    padding: 10px;
    background: ${cardPrimaryColor};
    box-shadow:
      0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%),
      0px 1px 10px 0px rgb(0 0 0 / 12%);
    min-width: 0;

    ${mediaMax('list3')}, ${MEDIA_SHORT_VIEWPORT} {
      grid-template-areas:
        'poster description'
        'buttons buttons';

      grid-template-columns: 70px 1fr;
      grid-template-rows: 110px max-content;
    }

    ${mediaMax('cardDense')} {
      grid-template-columns: 60px 1fr;
      grid-template-rows: 90px max-content;
    }
  `}
`

export const TorrentCardPoster = styled.button<{ $isPoster?: boolean }>`
  grid-area: poster;
  border-radius: ${radius.sm}px;
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
            border-radius: ${radius.sm}px;
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

  ${mediaMax('list3')}, ${MEDIA_SHORT_VIEWPORT} {
    svg {
      width: 50%;
    }
  }
`

export const TorrentCardButtons = styled.div`
  grid-area: buttons;
  display: grid;
  gap: 10px;

  ${mediaMax('list3')}, ${MEDIA_SHORT_VIEWPORT} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  ${mediaMax('cardDense')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${mediaMax('narrow')} {
    gap: 5px;
  }
`

export const TorrentCardDescription = styled.div`
  ${({
    theme: {
      torrentCard: { cardSecondaryColor, accentCardColor },
    },
  }) => css`
    grid-area: description;
    background: ${cardSecondaryColor};
    border-radius: ${radius.sm}px;
    padding: 5px;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    gap: 8px;
    min-width: 0;
    min-height: 0;

    ${mediaMax('cardDense')} {
      gap: 3px;
    }

    .description-title-wrapper {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
    }

    .description-section-name {
      text-transform: uppercase;
      font-size: ${cssVar.fontLabel};
      font-weight: 600;
      letter-spacing: 0.4px;
      color: ${accentCardColor};
      min-width: 0;
      flex-shrink: 0;
      line-height: 1.2;
    }

    .description-status-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 8px;
      height: 8px;
      margin-inline-end: 4px;
      vertical-align: middle;
      flex-shrink: 0;
    }

    .description-torrent-title {
      min-width: 0;
      overflow: hidden;
      font-size: ${cssVar.fontTitle};
      font-weight: 400;
      line-height: 1.25;
      overflow-wrap: anywhere;
      word-break: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }

    .description-statistics-wrapper {
      display: grid;
      grid-template-columns: 80px 80px 1fr;
      align-self: end;
      min-width: 0;
      flex-shrink: 0;

      ${mediaMax('list3')}, ${MEDIA_SHORT_VIEWPORT} {
        grid-template-columns: 70px 70px 1fr;
      }

      ${mediaMax('cardDense')} {
        grid-template-columns: 65px 65px 1fr;
      }

      ${mediaMax('mobile')} {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .description-statistics-element-wrapper {
      min-width: 0;
    }

    .description-statistics-element-value {
      margin-bottom: 6px;
      margin-left: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: ${cssVar.fontTitle};
      line-height: 1.2;

      ${mediaMax('list3')}, ${MEDIA_SHORT_VIEWPORT} {
        font-size: ${typography.meta};
        margin-bottom: 0;
      }
    }

    .description-torrent-title,
    .description-statistics-element-value {
      ${mediaMax('cardDense')} {
        font-size: 0.6rem;
        -webkit-line-clamp: 2;
      }

      ${mediaMax('micro')} {
        font-size: 9px;
      }
    }
  `}
`

export const StatusIndicators = styled.div<{ $color: string }>`
  ${({ $color }) => css`
    height: 8px;
    width: 8px;
    background-color: ${$color};
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  `}
`

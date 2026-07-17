import { mediaMax, MEDIA_SHORT_VIEWPORT } from 'style/breakpoints'
import styled, { css } from 'styled-components'

export const TorrentCard = styled.div`
  ${({
    theme: {
      torrentCard: { cardPrimaryColor },
    },
  }) => css`
    border-radius: 5px;
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

    /* Compact when multi-col list starts (list3) — also covers list2. */
    ${mediaMax('list3')}, ${MEDIA_SHORT_VIEWPORT} {
      grid-template-areas:
        'poster description'
        'buttons buttons';

      grid-template-columns: 70px 1fr;
      grid-template-rows: 110px max-content;
    }

    ${mediaMax('mobile')} {
      grid-template-columns: 60px 1fr;
      grid-template-rows: 90px max-content;
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

  ${mediaMax('phone')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
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
    min-width: 0;

    ${mediaMax('mobile')} {
      grid-template-rows: 60% 1fr;
      gap: 3px;
    }

    .description-title-wrapper {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .description-section-name {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.4px;
      color: ${sectionLabelColor};
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      ${mediaMax('mobile')} {
        font-size: 12px;
        line-height: 1.2;
      }
    }

    .description-status-wrapper {
      display: inline-block;
      height: 8px;
      margin-inline-end: 4px;
      vertical-align: baseline;
    }

    .description-torrent-title {
      overflow: hidden;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 14px;
    }

    .description-statistics-wrapper {
      display: grid;
      grid-template-columns: 80px 80px 1fr;
      align-self: end;
      min-width: 0;

      ${mediaMax('list3')}, ${MEDIA_SHORT_VIEWPORT} {
        grid-template-columns: 70px 70px 1fr;
      }

      ${mediaMax('mobile')} {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .description-statistics-element-wrapper {
      min-width: 0;
    }

    .description-statistics-element-value {
      margin-bottom: 10px;
      margin-left: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;

      ${mediaMax('list3')}, ${MEDIA_SHORT_VIEWPORT} {
        font-size: 12px;
        margin-bottom: 0;
      }
    }

    .description-torrent-title,
    .description-statistics-element-value {
      ${mediaMax('mobile')} {
        font-size: 12px;
      }

      ${mediaMax('phone')} {
        font-size: 12px;
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
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  `}
`

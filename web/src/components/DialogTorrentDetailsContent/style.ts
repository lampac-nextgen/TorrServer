import { rgba } from 'polished'
import { mediaMax } from 'style/breakpoints'
import styled, { css } from 'styled-components'

export const DialogContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 70%) minmax(0, 1fr);
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    'main cache'
    'file-list file-list';
  min-width: 0;

  ${mediaMax('detailsStack')} {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(3, min-content);
    grid-template-areas:
      'main'
      'cache'
      'file-list';
  }
`

/** Scroll body under DialogHeader — flex child of dialog paper. */
export const DetailsScrollBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
`

export const Poster = styled.div<{ $poster?: boolean }>`
  ${({
    $poster,
    theme: {
      dialogTorrentDetailsContent: { posterBGColor },
    },
  }) => css`
    height: 400px;
    border-radius: 5px;
    overflow: hidden;
    align-self: center;

    ${
      $poster
        ? css`
            img {
              border-radius: 5px;
              height: 100%;
            }
          `
        : css`
            width: 300px;
            display: grid;
            place-items: center;
            background: ${posterBGColor};

            svg {
              transform: scale(2.5) translateY(-3px);
            }
          `
    }

    ${mediaMax('desktop')} {
      align-self: start;
    }

    ${mediaMax('tablet')} {
      ${
        $poster
          ? css`
              height: 200px;
            `
          : css`
              display: none;
            `
      }
    }
  `}
`

export const MainSection = styled.section`
  ${({
    theme: {
      dialogTorrentDetailsContent: { gradientStartColor, gradientEndColor },
    },
  }) => css`
    grid-area: main;
    padding: 40px;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 30px;
    background: linear-gradient(145deg, ${gradientStartColor}, ${gradientEndColor});

    ${mediaMax('tablet')} {
      grid-template-columns: 1fr;
      padding: 20px;
    }
  `}
`

export const CacheSection = styled.section`
  ${({
    theme: {
      dialogTorrentDetailsContent: { cacheSectionBGColor },
    },
  }) => css`
    grid-area: cache;
    padding: 40px;
    display: grid;
    align-content: start;
    grid-template-rows: min-content min-content min-content;
    background: ${cacheSectionBGColor};
    min-width: 0;

    ${mediaMax('tablet')} {
      padding: 20px;
    }
  `}
`

export const TorrentFilesSection = styled.section`
  ${({
    theme: {
      dialogTorrentDetailsContent: { torrentFilesSectionBGColor },
    },
  }) => css`
    grid-area: file-list;
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${torrentFilesSectionBGColor};

    ${mediaMax('tablet')} {
      padding: 20px;
    }
  `}
`

export const SectionSubName = styled.div<{ $mb?: number }>`
  ${({
    $mb,
    theme: {
      dialogTorrentDetailsContent: { subNameFontColor },
    },
  }) => css`
    ${$mb && `margin-top: ${$mb / 3}px`};
    ${$mb && `margin-bottom: ${$mb}px`};
    line-height: 1.2;
    color: ${subNameFontColor};

    ${mediaMax('tablet')} {
      ${$mb && `margin-top: ${$mb / 4}px`};
      ${$mb && `margin-bottom: ${$mb / 2}px`};
      font-size: 14px;
    }
  `}
`

export const SectionTitle = styled.div<{ $color?: string; $mb?: number }>`
  ${({
    $color,
    $mb,
    theme: {
      dialogTorrentDetailsContent: { titleFontColor },
    },
  }) => css`
    ${$mb && `margin-bottom: ${$mb}px`};
    font-size: 34px;
    font-weight: 300;
    line-height: 1;
    word-break: break-word;
    color: ${$color || titleFontColor};

    ${mediaMax('tablet')} {
      font-size: 24px;
      line-height: 1.1;
      ${$mb && `margin-bottom: ${$mb / 2}px`};
    }
  `}
`

export const SectionHeader = styled.div`
  margin-bottom: 20px;
`

export const WidgetWrapper = styled.div<{ $detailedView?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max-content, 220px));
  gap: 20px;

  ${mediaMax('tablet')} {
    gap: 15px;
  }
  ${mediaMax('phone')} {
    gap: 10px;
  }

  ${({ $detailedView }) =>
    $detailedView
      ? css`
          ${mediaMax('tablet')} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          ${mediaMax('phone')} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        `
      : css`
          ${mediaMax('tablet')} {
            grid-template-columns: repeat(auto-fit, minmax(max-content, 185px));
          }
          ${mediaMax('compact')} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          ${mediaMax('phone')} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        `}
`

export const WidgetFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: min-content 50px;
  grid-template-areas:
    'title title'
    'icon value';

  > * {
    display: grid;
    place-items: center;
  }

  ${mediaMax('tablet')} {
    grid-template-columns: 30px 1fr;
    grid-template-rows: min-content 40px;
  }
`

export const WidgetFieldTitle = styled.div`
  ${({
    theme: {
      dialogTorrentDetailsContent: { titleFontColor },
    },
  }) => css`
    grid-area: title;
    justify-self: start;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 2px;
    font-weight: 600;
    color: ${titleFontColor};
  `}
`

export const WidgetFieldIcon = styled.div<{ $bgColor?: string; $fontColor?: string }>`
  ${({ $bgColor, $fontColor }) => css`
    grid-area: icon;
    color: ${$fontColor || rgba('#fff', 0.8)};
    background: ${$bgColor};
    border-radius: 5px 0 0 5px;

    ${mediaMax('tablet')} {
      > svg {
        width: 50%;
      }
    }
  `}
`

export const WidgetFieldValue = styled.div<{ $bgColor?: string; $fontColor?: string }>`
  ${({
    $bgColor,
    $fontColor,
    theme: {
      dialogTorrentDetailsContent: { widgetFontColor },
    },
  }) => css`
    grid-area: value;
    font-size: 24px;
    padding: 0 20px 0 0;
    color: ${$fontColor || widgetFontColor};
    background: ${$bgColor};
    border-radius: 0 5px 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;

    ${mediaMax('tablet')} {
      font-size: 18px;
      padding: 0 16px 0 0;
    }
  `}
`

export const Divider = styled.div`
  ${({
    theme: {
      addDialog: { separatorColor },
    },
  }) => css`
    height: 1px;
    background-color: ${separatorColor};
    margin: 30px 0;
  `}
`

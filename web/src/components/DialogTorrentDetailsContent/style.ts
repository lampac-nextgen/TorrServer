import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export const DialogContentGrid = styled.div`
  ${({
    theme: {
      dialogTorrentDetailsContent: { torrentFilesSectionBGColor },
    },
  }) => css`
    display: grid;
    grid-template-columns: minmax(0, 70%) minmax(0, 1fr);
    grid-template-rows: repeat(2, min-content);
    grid-template-areas:
      'main cache'
      'file-list file-list';
    min-width: 0;
    min-height: 100%;
    background: ${torrentFilesSectionBGColor};

    @media (max-width: 1200px) {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: repeat(3, min-content);
      grid-template-areas:
        'main'
        'cache'
        'file-list';
    }
  `}
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

    @media (max-width: 1280px) {
      align-self: start;
    }

    @media (max-width: 840px) {
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
    padding: 24px;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 20px;
    background: linear-gradient(145deg, ${gradientStartColor}, ${gradientEndColor});

    @media (max-width: 840px) {
      grid-template-columns: 1fr;
    }

    @media (max-width: 800px) {
      padding: 16px;
      gap: 16px;
    }

    @media (max-width: 420px) {
      padding: 12px;
      gap: 12px;
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
    align-self: start;
    padding: 24px;
    display: grid;
    align-content: start;
    grid-template-rows: min-content min-content min-content;
    background: ${cacheSectionBGColor};
    min-width: 0;

    @media (max-width: 800px) {
      padding: 16px;
    }

    @media (max-width: 420px) {
      padding: 12px;
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
    min-height: 100%;

    @media (max-width: 800px) {
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
    line-height: 1.35;
    font-size: 14px;
    color: ${subNameFontColor};

    @media (max-width: 800px) {
      ${$mb && `margin-top: ${$mb / 4}px`};
      ${$mb && `margin-bottom: ${$mb / 2}px`};
      font-size: 13px;
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
    font-size: 28px;
    font-weight: 300;
    line-height: 1.15;
    word-break: break-word;
    color: ${$color || titleFontColor};

    @media (max-width: 800px) {
      font-size: 22px;
      line-height: 1.15;
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

  @media (max-width: 800px) {
    gap: 15px;
  }
  @media (max-width: 410px) {
    gap: 10px;
  }

  ${({ $detailedView }) =>
    $detailedView
      ? css`
          @media (max-width: 800px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 410px) {
            grid-template-columns: 1fr;
          }
        `
      : css`
          @media (max-width: 800px) {
            grid-template-columns: repeat(auto-fit, minmax(max-content, 185px));
          }
          @media (max-width: 480px) {
            grid-template-columns: 1fr 1fr;
          }
          @media (max-width: 390px) {
            grid-template-columns: 1fr;
          }
        `}
`

export const WidgetFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-template-rows: min-content 40px;
  grid-template-areas:
    'title title'
    'icon value';

  > * {
    display: grid;
    place-items: center;
  }

  @media (max-width: 800px) {
    grid-template-columns: 30px 1fr;
    grid-template-rows: min-content 36px;
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
    font-size: 11px;
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
    border-radius: 8px 0 0 8px;

    @media (max-width: 800px) {
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
    font-size: 20px;
    padding: 0 16px 0 0;
    color: ${$fontColor || widgetFontColor};
    background: ${$bgColor};
    border-radius: 0 8px 8px 0;
    white-space: nowrap;

    @media (max-width: 800px) {
      font-size: 16px;
      padding: 0 12px 0 0;
    }
  `}
`

export const LoadingProgress = styled.div.attrs<{
  $value?: number
  $fullAmount?: number
}>(
  ({
    $value = 0,
    $fullAmount = 1,
    theme: {
      dialogTorrentDetailsContent: {
        gradientStartColor,
        gradientEndColor,
        bufferTrailStartColor,
        bufferTrailEndColor,
        bufferEmptyTrackColor,
        bufferTrackBorderColor,
      },
    },
  }) => {
    const amount = ($fullAmount as number) || 1
    const value = ($value as number) || 0
    const percentage = Math.min(100, Math.max(0, (value * 100) / amount))
    const isEmpty = value <= 0

    return {
      style: {
        background: isEmpty
          ? bufferEmptyTrackColor
          : `linear-gradient(to right, ${gradientStartColor} 0%, ${gradientEndColor} ${percentage}%, ${bufferTrailStartColor} ${percentage}%, ${bufferTrailEndColor} 100%)`,
        borderColor: bufferTrackBorderColor,
      },
    }
  },
)`
  ${({
    theme: {
      dialogTorrentDetailsContent: { titleFontColor },
    },
  }) => css`
    border: 2px solid;
    padding: 10px 16px;
    border-radius: 8px;
    color: ${titleFontColor};
    display: grid;
    place-items: center;
    min-height: 44px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  `}
`

export const Divider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.12);
  margin: 20px 0;
`

export const DetailsScrollBody = styled.div`
  ${({
    theme: {
      dialogTorrentDetailsContent: { torrentFilesSectionBGColor },
    },
  }) => css`
    overflow: auto;
    min-height: 100%;
    background: ${torrentFilesSectionBGColor};
  `}
`

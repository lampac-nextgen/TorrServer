import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { resolveThemeColors } from 'shared/theme/color'
import { mediaMax } from 'style/breakpoints'

export const Content = styled.div<{ $isEditMode?: boolean }>`
  ${({$isEditMode,
    theme,
  }) => {
    const {addDialog: { gradientStartColor, gradientEndColor, fontColor, separatorColor },} = resolveThemeColors(theme)
    return css`
    height: 550px;
    max-height: min(550px, calc(100dvh - var(--app-chrome-top) - var(--app-chrome-bottom)));
    background: linear-gradient(145deg, ${gradientStartColor}, ${gradientEndColor});
    flex: 1;
    display: grid;
    grid-template-columns: repeat(${$isEditMode ? '1' : '2'}, minmax(0, 1fr));
    border-bottom: 1px solid ${separatorColor};
    overflow: auto;
    color: ${fontColor};
    min-width: 0;
    min-height: 0;

    ${mediaMax('compact')} {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    ${mediaMax('dialog')} {
      grid-template-columns: minmax(0, 1fr);
      height: auto;
      max-height: none;
    }

    ${mediaMax('compact')} {
      align-content: start;
    }
  `
  }}
`

export const RightSide = styled.div`
  padding: 0 20px 20px 20px;
`

export const RightSideContainer = styled.div<{
  $isHidden?: boolean
  $notificationMessage?: string
  $isError?: boolean
}>`
  ${({$isHidden,
    $notificationMessage,
    $isError,
    theme,
  }) => {
    const {addDialog: { notificationErrorBGColor, notificationSuccessBGColor },} = resolveThemeColors(theme)
    return css`
    height: 530px;
    max-height: min(530px, calc(100dvh - var(--app-chrome-top) - var(--app-chrome-bottom) - 20px));
    min-width: 0;

    ${mediaMax('dialog')} {
      height: auto;
      max-height: none;
    }

    ${
      $notificationMessage &&
      css`
        position: relative;
        white-space: nowrap;

        :before {
          font-size: 14px;
          font-weight: 400;
          content: '${$notificationMessage}';
          display: grid;
          place-items: center;
          background: ${$isError ? notificationErrorBGColor : notificationSuccessBGColor};
          padding: 10px 15px;
          position: absolute;
          top: 52%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 5px;
          max-width: calc(100% - 24px);
          white-space: normal;
          text-align: center;
        }
      `
    }};

    ${
      $isHidden &&
      css`
        display: none;
      `
    }};

    ${mediaMax('mobile')} {
      height: auto;
      max-height: none;
    }

    ${mediaMax('compact')} {
      min-height: 170px;
    }
  `
  }}
`
export const LeftSide = styled.div`
  ${({ theme }) => {
    const {addDialog: { separatorColor },} = resolveThemeColors(theme)
    return css`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${separatorColor};

    ${mediaMax('mobile')} {
      border-right: none;
      border-bottom: 1px solid ${separatorColor};
    }
  `
  }}
`

export const LeftSideBottomSectionBasicStyles = css`
  transition: transform 0.3s;
  padding: 20px;
  height: 100%;
  display: grid;
`

export const LeftSideBottomSectionNoFile = styled.div<{ $isDragActive?: boolean }>`
  ${LeftSideBottomSectionBasicStyles}
  ${({ theme }) => {
    const {addDialog: { dropzoneBorderColor, dropzoneHoverBGColor },} = resolveThemeColors(theme)
    return css`
    border: 4px dashed ${dropzoneBorderColor};
    text-align: center;
    outline: none;

    justify-items: center;
    grid-template-rows: 130px 1fr;
    cursor: pointer;

    :hover {
      background-color: ${dropzoneHoverBGColor};
      svg {
        transform: translateY(-4%);
      }
    }
  `
  }}

  ${({ $isDragActive }) => $isDragActive && `border: 4px dashed green`};

  ${mediaMax('mobile')} {
    border: 4px dashed transparent;
    height: 400px;
    place-items: center;
    grid-template-rows: 40% 1fr;
  }

  ${mediaMax('compact')} {
    height: 170px;
    grid-template-rows: 1fr;

    > div:first-of-type {
      display: none;
    }
  }
`

export const IconWrapper = styled.div`
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 10px;
  align-self: start;

  svg {
    transition: all 0.3s;
  }
`

export const LeftSideTopSection = styled.div<{ $active?: boolean }>`
  ${({$active,
    theme,
  }) => {
    const {addDialog: { gradientStartColor },} = resolveThemeColors(theme)
    return css`
    background: ${gradientStartColor};
    padding: 0 20px 20px 20px;
    transition: all 0.3s;

    ${$active && 'box-shadow: 0 8px 10px -9px rgba(0, 0, 0, 0.5)'};
  `
  }}
`

export const PosterWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 300px max-content;
  column-gap: 5px;
  position: relative;
  margin-bottom: 20px;

  grid-template-areas:
    'poster suggestions'
    'clear empty';

  ${mediaMax('compact')} {
    grid-template-columns: 1fr;
    gap: 5px 0;
    justify-items: center;
    grid-template-areas:
      'poster'
      'clear'
      'suggestions';
  }
`

export const PosterSuggestions = styled.div`
  display: grid;
  grid-area: suggestions;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, max-content);
  grid-template-rows: repeat(4, max-content);
  gap: 5px;

  ${mediaMax('compact')} {
    grid-auto-flow: row;
    grid-template-columns: repeat(5, max-content);
  }
  ${mediaMax('phone')} {
    grid-template-columns: repeat(4, max-content);
  }
`

export const PosterSuggestionsItem = styled.div`
  cursor: pointer;
  width: 71px;
  height: 71px;

  ${mediaMax('phone')} {
    width: 60px;
    height: 60px;
  }

  ${mediaMax('phone')} {
    width: 52px;
    height: 52px;
  }

  img {
    transition: all 0.3s;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: cover;

    :hover {
      filter: brightness(130%);
    }
  }
`

export const Poster = styled.div<{ $poster?: boolean }>`
  ${({$poster,
    theme,
  }) => {
    const {addDialog: { posterBGColor },} = resolveThemeColors(theme)
    return css`
    border-radius: 5px;
    overflow: hidden;
    width: 200px;
    max-width: 100%;
    grid-area: poster;

    ${
      $poster
        ? css`
            img {
              width: 200px;
              max-width: 100%;
              object-fit: cover;
              border-radius: 5px;
              height: 100%;
            }
          `
        : css`
            display: grid;
            place-items: center;
            background: ${posterBGColor};

            svg {
              transform: scale(1.5) translateY(-3px);
            }
          `
    }}
  `
  }}
`

export const ClearPosterButton = styled(Button)<{ $showbutton?: boolean }>`
  grid-area: clear;
  justify-self: flex-start;
  transform: translateY(-50%);
  position: absolute;
  min-height: 44px;
  ${({ $showbutton }) => !$showbutton && 'display: none'};

  ${mediaMax('compact')} {
    position: static;
    transform: none;
    justify-self: center;
    width: 100%;
    min-height: 44px;
  }
`

export const UpdatePosterButton = styled(Button)`
  grid-area: clear;
  justify-self: flex-end;
  transform: translateY(-50%);
  position: absolute;
  min-height: 44px;

  ${mediaMax('compact')} {
    position: static;
    transform: none;
    justify-self: center;
    width: 100%;
    min-height: 44px;
  }
`

export const PosterLanguageSwitch = styled.div<{ $showbutton?: boolean }>`
  ${({ $showbutton }) => css`
    grid-area: poster;
    z-index: 5;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    ${!$showbutton && 'display: none'};
  `
  }}
`

export const MultiFileRow = styled.div`
  padding: 12px 16px;
  margin: 8px 12px;
  border-radius: 5px;
  box-shadow:
    0px 1px 3px rgba(0, 0, 0, 0.12),
    0px 1px 2px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 12px;
  align-items: start;
  transition: box-shadow 0.2s;

  :hover {
    box-shadow:
      0px 2px 6px rgba(0, 0, 0, 0.16),
      0px 1px 4px rgba(0, 0, 0, 0.12);
  }
`

export const MultiFilePoster = styled.div`
  ${({ theme }) => {
    const {addDialog: { posterBGColor },} = resolveThemeColors(theme)
    return css`
    width: 80px;
    height: 110px;
    border-radius: 4px;
    overflow: hidden;
    background: ${posterBGColor};
    display: grid;
    place-items: center;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .file-index {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      display: grid;
      place-items: center;
    }
  `
  }}
`

export const MultiFileInfo = styled.div`
  .file-name {
    font-size: 13px;
    opacity: 0.6;
    margin-bottom: 4px;
  }
`

export const MultiFileList = styled.div`
  max-height: 500px;
  overflow: auto;
  padding: 4px 0;
`

export const StyledPWAAddButton = styled.div`
  border: 2px solid #fff;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  pointer-events: none;

  &::before,
  &::after {
    content: '' !important;
    display: block;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    width: 2px;
    height: 16px;
  }

  &::after {
    width: 16px;
    height: 2px;
  }
`

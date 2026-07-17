import styled, { css } from 'styled-components'
import ButtonBase from '@mui/material/ButtonBase'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { StyledHeader } from 'style/CustomMaterialUiStyles'

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    @media (max-width: 600px) {
      gap: 0;
    }
  }

  .MuiTabs-scrollButtons {
    @media (max-width: 600px) {
      width: 24px;
    }
  }
`

export const StyledTab = styled(Tab)`
  min-width: auto;
  padding: 6px 14px;
  font-size: 13px;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 600px) {
    padding: 6px 12px;
    font-size: 12px;
    min-height: 44px;
  }

  @media (max-width: 400px) {
    padding: 6px 8px;
    font-size: 11px;
  }

  .MuiTab-iconWrapper,
  .MuiTab-labelIcon,
  & > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .disabled-hint {
    font-size: 9px;
    opacity: 0.7;
    display: block;
    line-height: 1.1;

    @media (max-width: 600px) {
      font-size: 8px;
    }
  }
`
export const SettingsHeader = styled(StyledHeader)`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;

  @media (max-width: 420px) {
    padding-inline: 12px;
  }

  @media (max-width: 340px) {
    grid-auto-flow: row;
  }
`

import { DialogFooter } from 'style/DialogStyles'

export const FooterSection = DialogFooter

export const Divider = styled.div`
  ${({
    theme: {
      settingsDialog: { separatorColor },
    },
  }) => css`
    height: 1px;
    background-color: ${separatorColor};
    margin: 30px 0;
  `}
`

export const Content = styled.div<{ $isLoading?: boolean }>`
  ${({
    $isLoading,
    theme: {
      settingsDialog: { contentBG },
    },
  }) => css`
    background: ${contentBG};
    overflow: auto;
    flex: 1;
    -webkit-overflow-scrolling: touch;

    ${
      $isLoading &&
      css`
        min-height: 500px;
        display: grid;
        place-items: center;
      `
    }

    @media (max-width: 600px) {
      /* Keep first paint readable: section label + cache bar stay in view */
      scroll-padding-top: 8px;
    }
  `}
`

export const CacheLegendGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 0 16px;
  font-size: 12px;

  @media (max-width: 600px) {
    gap: 12px;
    font-size: 12px;
  }
`

export const CacheLegendItem = styled.div`
  display: grid;
  grid-template-columns: auto max-content minmax(0, 1fr);
  column-gap: 12px;
  align-items: start;

  .cache-legend-value {
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    line-height: 1.35;
  }

  .cache-legend-desc {
    min-width: 0;
    line-height: 1.45;
  }

  @media (max-width: 600px) {
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 10px;
    row-gap: 2px;

    .cache-legend-value {
      grid-column: 2;
      white-space: normal;
    }

    .cache-legend-desc {
      grid-column: 2;
    }
  }
`

export const CacheLegendDot = styled.span<{ $color?: string }>`
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-top: 2px;

  @media (max-width: 600px) {
    width: 12px;
    height: 12px;
    margin-top: 3px;
  }
`

export const MainSettingsContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 32px;
  padding: 20px;
  align-items: start;

  @media (max-width: 930px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  @media (max-width: 600px) {
    padding: 16px 12px;
    gap: 24px;
  }

  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 600px) {
      flex-wrap: wrap;
      gap: 4px;
    }
  }

  .MuiFormControlLabel-label {
    @media (max-width: 600px) {
      font-size: 14px;
      flex: 1;
      min-width: 0;
      word-break: break-word;
    }
  }

  .MuiFormHelperText-root {
    @media (max-width: 600px) {
      font-size: 11px;
      margin-top: 2px;
    }
  }
`
export const SecondarySettingsContent = styled.div`
  padding: 20px;

  @media (max-width: 600px) {
    padding: 16px 12px;
  }

  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 600px) {
      flex-wrap: wrap;
      gap: 4px;
    }
  }

  .MuiFormControlLabel-label {
    @media (max-width: 600px) {
      font-size: 14px;
      flex: 1;
      min-width: 0;
      word-break: break-word;
    }
  }

  .MuiFormHelperText-root {
    @media (max-width: 600px) {
      font-size: 11px;
      margin-top: 2px;
    }
  }

  .MuiInputLabel-root {
    @media (max-width: 600px) {
      font-size: 14px;
    }
  }

  .MuiOutlinedInput-root {
    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
`

export const GstSettingsContent = styled(SecondarySettingsContent)`
  .MuiTextField-root {
    margin-top: 16px;
    margin-bottom: 4px;
  }

  .MuiFormGroup-root {
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .MuiFormControlLabel-root {
    margin-top: 8px;
  }
`
export const StorageButton = styled(ButtonBase)<{ $small?: boolean; $selected?: boolean }>`
  ${({ $small, $selected }) => css`
    && {
      transition: 0.2s;
      cursor: default;
      text-align: center;
      display: grid;
      color: inherit;
      font: inherit;
      border-radius: 8px;
      padding: 4px;

      ${
        !$selected &&
        css`
          cursor: pointer;

          :hover {
            filter: brightness(0.8);
          }
        `
      }

      ${
        $small
          ? css`
              grid-template-columns: max-content 1fr;
              gap: 20px;
              align-items: center;
              justify-items: start;
              margin-bottom: 20px;
            `
          : css`
              place-items: center;
              gap: 10px;
            `
      }
    }
  `}
`

export const StorageIconWrapper = styled.div<{ $small?: boolean; $selected?: boolean }>`
  ${({
    $selected,
    $small,
    theme: {
      settingsDialog: { storageSelectedBG, storageUnselectedBG },
    },
  }) => css`
    width: ${$small ? '48px' : '72px'};
    height: ${$small ? '48px' : '72px'};
    border-radius: 50%;
    background: ${$selected ? storageSelectedBG : storageUnselectedBG};
    display: grid;
    place-items: center;
    box-shadow: ${$selected ? `0 0 0 2px ${storageSelectedBG}, 0 0 0 4px rgba(50, 54, 55, 0.25)` : 'none'};

    svg {
      transform: rotate(-45deg) scale(0.72);
    }

    @media (max-width: 930px) {
      width: ${$small ? '44px' : '64px'};
      height: ${$small ? '44px' : '64px'};
    }
  `}
`

export const CacheStorageSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content auto;
  grid-template-areas:
    'label label'
    'ram disk';
  align-content: start;
  justify-items: center;
  column-gap: 24px;
  row-gap: 8px;

  @media (max-width: 930px) {
    justify-content: start;
    column-gap: 16px;
  }

  @media (max-width: 600px) {
    column-gap: 10px;
    row-gap: 6px;

    .MuiToggleButton-root {
      padding-top: 10px !important;
      padding-bottom: 10px !important;
      font-size: 12px;
    }
  }
`

export const SettingSectionLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  padding-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 14px;
    padding-bottom: 8px;
  }

  @media (max-width: 400px) {
    font-size: 13px;
    padding-bottom: 8px;
  }

  small {
    display: block;
    font-size: 11px;
    font-weight: 400;

    @media (max-width: 600px) {
      font-size: 10px;
    }
  }
`

export const GstRuntimeStatusList = styled.div`
  display: grid;
  gap: 12px;
  margin: 4px 0 24px;
`

export const GstRuntimeStatusItem = styled.div<{ $ok?: boolean; $warn?: boolean }>`
  ${({
    $ok,
    $warn,
    theme: {
      settingsDialog: { cacheAfterReaderColor, cacheBeforeReaderColor, preloadCacheBorderColor },
      addDialog: { separatorColor },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 16px;
    border-radius: 5px;
    border: 1px solid ${$ok ? cacheAfterReaderColor : $warn ? '#cda184' : separatorColor};
    background: ${
      $ok
        ? `color-mix(in srgb, ${cacheAfterReaderColor} 22%, transparent)`
        : $warn
          ? 'rgba(205, 161, 132, 0.2)'
          : `color-mix(in srgb, ${cacheBeforeReaderColor} 18%, transparent)`
    };
    font-size: 13px;
    line-height: 1.4;

    .gst-status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .gst-status-label {
      font-weight: 500;
    }

    .gst-status-value {
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .gst-status-error {
      font-size: 12px;
      color: ${preloadCacheBorderColor};
      opacity: 0.75;
      word-break: break-word;
    }
  `}
`

export const GstSubsectionLabel = styled(SettingSectionLabel)`
  font-size: 14px;
  padding-bottom: 8px;
  margin-top: 14px;
`

export const PreloadCachePercentage = styled.div.attrs<{
  $value?: number
  $beforeColor?: string
  $afterColor?: string
}>(({ $value = 0, $beforeColor, $afterColor }) => ({
  // Fast-changing gradient values go in style (styled-components recommendation)
  style: {
    background: `linear-gradient(to right, ${$beforeColor} 0%, ${$beforeColor} ${$value}%, ${$afterColor} ${$value}%, ${$afterColor} 100%)`,
  },
}))`
  ${({
    theme: {
      settingsDialog: { preloadCacheBorderColor, preloadCacheFontColor },
    },
  }) => css`
    border: 1px solid ${preloadCacheBorderColor};
    padding: 10px 16px;
    border-radius: 5px;
    color: ${preloadCacheFontColor};
    margin-bottom: 10px;
    position: relative;
    display: grid;
    place-items: center;
    font-size: 13px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    overflow: hidden;
    user-select: none;
    isolation: isolate;
  `}
`

/** Dim overlay for preload share — sits on the whole cache bar (master behavior). */
export const PreloadCacheOverlay = styled.div.attrs<{ $widthPct?: number }>(({ $widthPct = 0 }) => ({
  style: { width: `${$widthPct}%` },
  'aria-hidden': true,
}))`
  ${({
    theme: {
      settingsDialog: { preloadCacheBorderColor },
    },
  }) => css`
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    background: ${preloadCacheBorderColor};
    opacity: 0.18;
    border-radius: 4px;
    pointer-events: none;
    z-index: 0;
  `}
`

export const PreloadCacheLabel = styled.span`
  position: relative;
  z-index: 1;
`

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { resolveThemeColors } from 'shared/theme/color'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { StyledHeader } from 'style/CustomMaterialUiStyles'
import { mediaMax } from 'style/breakpoints'

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    ${mediaMax('compact')} {
      gap: 0;
    }
  }

  .MuiTabs-scrollButtons {
    ${mediaMax('compact')} {
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

  ${mediaMax('compact')} {
    padding: 6px 12px;
    font-size: 12px;
    min-height: 44px;
  }

  ${mediaMax('phone')} {
    padding: 6px 8px;
    font-size: 12px;
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
    font-size: 12px;
    opacity: 0.7;
    display: block;
    line-height: 1.1;

    ${mediaMax('compact')} {
      display: none;
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

  ${mediaMax('compact')} {
    grid-auto-flow: row;
    padding-inline: 12px;

    .MuiFormControlLabel-label {
      font-size: 13px;
    }
  }
`

import { DialogFooter } from 'style/DialogStyles'

export const FooterSection = DialogFooter

export const Divider = styled.div`
  ${({ theme }) => {
    const {settingsDialog: { separatorColor },} = resolveThemeColors(theme)
    return css`
    height: 1px;
    background-color: ${separatorColor};
    margin: 30px 0;
  `
  }}
`

export const Content = styled.div<{ $isLoading?: boolean }>`
  ${({$isLoading,
    theme,
  }) => {
    const {settingsDialog: { contentBG },} = resolveThemeColors(theme)
    return css`
    background: ${contentBG};
    overflow: auto;
    flex: 1;
    min-height: 0;
    -webkit-overflow-scrolling: touch;

    ${
      $isLoading &&
      css`
        min-height: min(500px, 50dvh);
        display: grid;
        place-items: center;
      `
    }}

    ${mediaMax('compact')} {
      /* Keep first paint readable: section label + cache bar stay in view */
      scroll-padding-top: 8px;
    }
  `
  }}
`

export const CacheLegendGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 0 16px;
  font-size: 12px;

  ${mediaMax('compact')} {
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

  ${mediaMax('compact')} {
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

  ${mediaMax('compact')} {
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

  ${mediaMax('mobile')} {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  ${mediaMax('compact')} {
    padding: 16px 12px;
    gap: 24px;
  }

  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;
    justify-content: space-between;
    width: 100%;

    ${mediaMax('compact')} {
      flex-wrap: wrap;
      gap: 4px;
    }
  }

  .MuiFormControlLabel-label {
    ${mediaMax('compact')} {
      font-size: 14px;
      flex: 1;
      min-width: 0;
      word-break: break-word;
    }
  }

  .MuiFormHelperText-root {
    ${mediaMax('compact')} {
      font-size: 12px;
      margin-top: 2px;
    }
  }
`
export const SecondarySettingsContent = styled.div`
  padding: 20px;

  ${mediaMax('compact')} {
    padding: 16px 12px;
  }

  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;
    justify-content: space-between;
    width: 100%;

    ${mediaMax('compact')} {
      flex-wrap: wrap;
      gap: 4px;
    }
  }

  .MuiFormControlLabel-label {
    ${mediaMax('compact')} {
      font-size: 14px;
      flex: 1;
      min-width: 0;
      word-break: break-word;
    }
  }

  .MuiFormHelperText-root {
    ${mediaMax('compact')} {
      font-size: 12px;
      margin-top: 2px;
    }
  }

  .MuiInputLabel-root {
    ${mediaMax('compact')} {
      font-size: 14px;
    }
  }

  .MuiOutlinedInput-root {
    ${mediaMax('compact')} {
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

export const StorageIconWrapper = styled.div<{ $small?: boolean; $selected?: boolean }>`
  ${({$selected,
    $small,
    theme,
  }) => {
    const {settingsDialog: { storageSelectedBG, storageUnselectedBG },} = resolveThemeColors(theme)
    return css`
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

    ${mediaMax('mobile')} {
      width: ${$small ? '44px' : '64px'};
      height: ${$small ? '44px' : '64px'};
    }
  `
  }}
`

export const CacheStorageSelector = styled.div`
  ${({ theme }) => {
    const {table: { outlinedButtonBorderColor },
      settingsDialog: { cacheAfterReaderColor, preloadCacheBorderColor },} = resolveThemeColors(theme)
    return css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content auto;
    grid-template-areas:
      'label label'
      'ram disk';
    align-content: start;
    justify-items: stretch;
    column-gap: 24px;
    row-gap: 8px;

    /* Cards sit in a CSS grid via display:contents — undo MUI group border collapse
       so each option is a full square (not top/bottom lines only). */
    .MuiToggleButtonGroup-grouped,
    .MuiToggleButton-root {
      margin: 0 !important;
      border: 1px solid ${outlinedButtonBorderColor} !important;
      border-radius: 8px !important;
    }

    .MuiToggleButton-root.Mui-selected {
      border-color: ${preloadCacheBorderColor} !important;
      background-color: color-mix(in srgb, ${cacheAfterReaderColor} 14%, transparent);
    }

    ${mediaMax('mobile')} {
      justify-content: stretch;
      column-gap: 16px;
    }

    ${mediaMax('compact')} {
      column-gap: 10px;
      row-gap: 6px;

      .MuiToggleButton-root {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
        font-size: 12px;
      }
    }
  `
  }}
`

export const SettingSectionLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  padding-bottom: 10px;

  ${mediaMax('compact')} {
    font-size: 14px;
    padding-bottom: 8px;
  }

  ${mediaMax('phone')} {
    font-size: 13px;
    padding-bottom: 8px;
  }

  small {
    display: block;
    font-size: 12px;
    font-weight: 400;

    ${mediaMax('compact')} {
      font-size: 12px;
    }
  }
`

export const GstRuntimeStatusList = styled.div`
  display: grid;
  gap: 12px;
  margin: 4px 0 24px;
`

export const GstRuntimeStatusItem = styled.div<{ $ok?: boolean; $warn?: boolean }>`
  ${({$ok,
    $warn,
    theme,
  }) => {
    const {settingsDialog: { cacheAfterReaderColor, cacheBeforeReaderColor, preloadCacheBorderColor },
      addDialog: { separatorColor },} = resolveThemeColors(theme)
    return css`
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
    }};
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
  `
  }}
`

export const GstSubsectionLabel = styled(SettingSectionLabel)`
  font-size: 14px;
  padding-bottom: 8px;
  margin-top: 14px;
`

export const PreloadCachePercentage = styled.div<{
  $value?: number
  $beforeColor?: string
  $afterColor?: string
}>`
  background: ${({ $value = 0, $beforeColor = 'transparent', $afterColor = 'transparent' }) =>
    `linear-gradient(to right, ${$beforeColor} 0%, ${$beforeColor} ${$value}%, ${$afterColor} ${$value}%, ${$afterColor} 100%)`};
  ${({ theme }) => {
    const {
      settingsDialog: { preloadCacheBorderColor, preloadCacheFontColor },
    } = resolveThemeColors(theme)
    return css`
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
  `
  }}
`

/** Dim overlay for preload share — sits on the whole cache bar (master behavior). */
export const PreloadCacheOverlay = styled.div<{ $widthPct?: number }>`
  width: ${({ $widthPct = 0 }) => `${$widthPct}%`};
  ${({ theme }) => {
    const {
      settingsDialog: { preloadCacheBorderColor },
    } = resolveThemeColors(theme)
    return css`
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    background: ${preloadCacheBorderColor};
    opacity: 0.18;
    border-radius: 4px;
    pointer-events: none;
    z-index: 0;
  `
  }}
`

export const PreloadCacheLabel = styled.span`
  position: relative;
  z-index: 1;
`

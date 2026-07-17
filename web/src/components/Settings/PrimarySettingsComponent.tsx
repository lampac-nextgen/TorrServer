import { useTranslation } from 'react-i18next'
import { USBIcon, RAMIcon } from 'icons'
import { FormControlLabel, Switch, ToggleButton, ToggleButtonGroup } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useTheme } from 'styled-components'

import {
  CacheLegendGrid,
  CacheLegendItem,
  CacheLegendDot,
  MainSettingsContent,
  StorageIconWrapper,
  CacheStorageSelector,
  SettingSectionLabel,
  PreloadCachePercentage,
  PreloadCacheOverlay,
  PreloadCacheLabel,
} from './style'
import SliderInput from './SliderInput'
import type { BTSets, SettingsInputHandler, SettingsUpdater } from 'types/api'
import type { CSSProperties, Dispatch, SetStateAction } from 'react'

const CacheStorageLocationLabel = ({ style }: { style?: CSSProperties }) => {
  const { t } = useTranslation()

  return (
    <SettingSectionLabel style={style}>
      {t('SettingsDialog.CacheStorageLocation')}
      <small>{t('SettingsDialog.UseDiskDesc')}</small>
    </SettingSectionLabel>
  )
}

interface PrimarySettingsProps {
  settings?: BTSets
  inputForm: SettingsInputHandler
  cachePercentage: number
  preloadCachePercentage: number
  cacheSize: number
  isProMode: boolean
  setCacheSize: Dispatch<SetStateAction<number>>
  setCachePercentage: Dispatch<SetStateAction<number>>
  setPreloadCachePercentage: Dispatch<SetStateAction<number>>
  updateSettings: SettingsUpdater
}

export default function PrimarySettingsComponent({
  settings,
  inputForm,
  cachePercentage,
  preloadCachePercentage,
  cacheSize,
  isProMode,
  setCacheSize,
  setCachePercentage,
  setPreloadCachePercentage,
  updateSettings,
}: PrimarySettingsProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const cacheBeforeReaderColor = theme.settingsDialog.cacheBeforeReaderColor
  const cacheAfterReaderColor = theme.settingsDialog.cacheAfterReaderColor
  const { UseDisk, TorrentsSavePath, RemoveCacheOnDrop } = settings || {}
  const preloadCacheSize = Math.round((cacheSize / 100) * preloadCachePercentage)
  const storageSelectedIcon = theme.settingsDialog.storageSelectedIcon
  const storageUnselectedIcon = theme.settingsDialog.storageUnselectedIcon

  return (
    <MainSettingsContent>
      <div>
        <SettingSectionLabel>{t('SettingsDialog.CacheSettings')}</SettingSectionLabel>

        <PreloadCachePercentage
          $value={100 - cachePercentage}
          $beforeColor={cacheBeforeReaderColor}
          $afterColor={cacheAfterReaderColor}
        >
          <PreloadCacheOverlay $widthPct={preloadCachePercentage} />
          <PreloadCacheLabel>
            {t('Cache')} {cacheSize} {t('MB')}
          </PreloadCacheLabel>
        </PreloadCachePercentage>

        <CacheLegendGrid>
          <CacheLegendItem>
            <CacheLegendDot $color={cacheBeforeReaderColor} aria-hidden />
            <div className='cache-legend-value'>
              {100 - cachePercentage}% ({Math.round((cacheSize / 100) * (100 - cachePercentage))} {t('MB')})
            </div>
            <div className='cache-legend-desc'>{t('SettingsDialog.CacheBeforeReaderDesc')}</div>
          </CacheLegendItem>

          <CacheLegendItem>
            <CacheLegendDot $color={cacheAfterReaderColor} aria-hidden />
            <div className='cache-legend-value'>
              {cachePercentage}% ({Math.round((cacheSize / 100) * cachePercentage)} {t('MB')})
            </div>
            <div className='cache-legend-desc'>{t('SettingsDialog.CacheAfterReaderDesc')}</div>
          </CacheLegendItem>
        </CacheLegendGrid>

        <SliderInput
          isProMode={isProMode}
          title={t('SettingsDialog.CacheSize')}
          value={cacheSize}
          setValue={v => setCacheSize(v === '' ? cacheSize : v)}
          sliderMin={32}
          sliderMax={1024}
          inputMin={32}
          inputMax={999999}
          step={4}
          unit={t('MB')}
          onBlurCallback={value => setCacheSize(Math.round(Number(value) / 4) * 4)}
        />

        <SliderInput
          isProMode={isProMode}
          title={t('SettingsDialog.ReaderReadAHead')}
          value={cachePercentage}
          setValue={v => setCachePercentage(v === '' ? cachePercentage : v)}
          sliderMin={40}
          sliderMax={95}
          inputMin={0}
          inputMax={100}
          unit='%'
        />

        <SliderInput
          isProMode={isProMode}
          title={`${t('SettingsDialog.PreloadCache')} - ${preloadCachePercentage}% (${preloadCacheSize} ${t('MB')})`}
          value={preloadCachePercentage}
          setValue={v => setPreloadCachePercentage(v === '' ? preloadCachePercentage : v)}
          sliderMin={0}
          sliderMax={100}
          inputMin={0}
          inputMax={100}
          unit='%'
        />
      </div>

      {UseDisk ? (
        <div>
          <CacheStorageSelector>
            <CacheStorageLocationLabel style={{ placeSelf: 'start', gridArea: 'label' }} />

            <ToggleButtonGroup
              exclusive
              value='disk'
              onChange={(_, value) => {
                if (value === 'ram') updateSettings({ UseDisk: false })
              }}
              color='secondary'
              sx={{ display: 'contents' }}
            >
              <ToggleButton
                value='ram'
                sx={{
                  gridArea: 'ram',
                  flexDirection: 'column',
                  gap: 0.5,
                  py: 1.5,
                  textTransform: 'none',
                  width: '100%',
                }}
              >
                <StorageIconWrapper $small>
                  <RAMIcon color={storageUnselectedIcon} />
                </StorageIconWrapper>
                {t('SettingsDialog.RAM')}
              </ToggleButton>
              <ToggleButton
                value='disk'
                sx={{
                  gridArea: 'disk',
                  flexDirection: 'column',
                  gap: 0.5,
                  py: 1.5,
                  textTransform: 'none',
                  width: '100%',
                }}
              >
                <StorageIconWrapper $small $selected>
                  <USBIcon color={storageSelectedIcon} />
                </StorageIconWrapper>
                {t('SettingsDialog.Disk')}
              </ToggleButton>
            </ToggleButtonGroup>
          </CacheStorageSelector>

          <FormControlLabel
            control={
              <Switch checked={RemoveCacheOnDrop} onChange={inputForm} id='RemoveCacheOnDrop' color='secondary' />
            }
            label={t('SettingsDialog.RemoveCacheOnDrop')}
            labelPlacement='start'
          />
          <div>
            <small>{t('SettingsDialog.RemoveCacheOnDropDesc')}</small>
          </div>
          <br />
          <TextField
            onChange={inputForm}
            margin='normal'
            id='TorrentsSavePath'
            label={t('SettingsDialog.TorrentsSavePath')}
            value={TorrentsSavePath}
            type='url'
            variant='outlined'
            fullWidth
          />
        </div>
      ) : (
        <CacheStorageSelector>
          <CacheStorageLocationLabel style={{ placeSelf: 'start', gridArea: 'label' }} />

          <ToggleButtonGroup
            exclusive
            value='ram'
            onChange={(_, value) => {
              if (value === 'disk') updateSettings({ UseDisk: true })
            }}
            color='secondary'
            sx={{ display: 'contents' }}
          >
            <ToggleButton
              value='ram'
              sx={{ gridArea: 'ram', flexDirection: 'column', gap: 1, py: 2, textTransform: 'none', width: '100%' }}
            >
              <StorageIconWrapper $selected>
                <RAMIcon color={storageSelectedIcon} />
              </StorageIconWrapper>
              {t('SettingsDialog.RAM')}
            </ToggleButton>
            <ToggleButton
              value='disk'
              sx={{ gridArea: 'disk', flexDirection: 'column', gap: 1, py: 2, textTransform: 'none', width: '100%' }}
            >
              <StorageIconWrapper>
                <USBIcon color={storageUnselectedIcon} />
              </StorageIconWrapper>
              {t('SettingsDialog.Disk')}
            </ToggleButton>
          </ToggleButtonGroup>
        </CacheStorageSelector>
      )}
    </MainSettingsContent>
  )
}

import { useTranslation } from 'react-i18next'
import { USBIcon, RAMIcon } from 'icons'
import { FormControlLabel, Switch } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useTheme } from 'styled-components'

import {
  CacheLegendGrid,
  CacheLegendDot,
  MainSettingsContent,
  StorageButton,
  StorageIconWrapper,
  CacheStorageSelector,
  SettingSectionLabel,
  PreloadCachePercentage,
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

  return (
    <MainSettingsContent>
      <div>
        <SettingSectionLabel>{t('SettingsDialog.CacheSettings')}</SettingSectionLabel>

        <PreloadCachePercentage
          $value={100 - cachePercentage}
          $preloadCachePercentage={preloadCachePercentage}
          $beforeColor={cacheBeforeReaderColor}
          $afterColor={cacheAfterReaderColor}
        >
          <span>
            {t('Cache')} {cacheSize} {t('MB')}
          </span>
        </PreloadCachePercentage>

        <CacheLegendGrid>
          <CacheLegendDot $color={cacheBeforeReaderColor} aria-hidden />
          <div className='cache-legend-value'>
            {100 - cachePercentage}% ({Math.round((cacheSize / 100) * (100 - cachePercentage))} {t('MB')})
          </div>
          <div className='cache-legend-desc'>{t('SettingsDialog.CacheBeforeReaderDesc')}</div>

          <CacheLegendDot $color={cacheAfterReaderColor} aria-hidden />
          <div className='cache-legend-value'>
            {cachePercentage}% ({Math.round((cacheSize / 100) * cachePercentage)} {t('MB')})
          </div>
          <div className='cache-legend-desc'>{t('SettingsDialog.CacheAfterReaderDesc')}</div>
        </CacheLegendGrid>

        <br />

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
          title={t('SettingsDialog.PreloadCache')}
          value={preloadCachePercentage}
          setValue={v => setPreloadCachePercentage(v === '' ? preloadCachePercentage : v)}
          sliderMin={0}
          sliderMax={100}
          inputMin={0}
          inputMax={100}
          unit='%'
          valueHint={`${preloadCacheSize} ${t('MB')}`}
        />
      </div>

      {UseDisk ? (
        <div>
          <CacheStorageLocationLabel />

          <div style={{ display: 'grid', gridAutoFlow: 'column' }}>
            <StorageButton $small onClick={() => updateSettings({ UseDisk: false })}>
              <StorageIconWrapper $small>
                <RAMIcon color='#323637' />
              </StorageIconWrapper>

              <div>{t('SettingsDialog.RAM')}</div>
            </StorageButton>

            <StorageButton $small $selected>
              <StorageIconWrapper $small $selected>
                <USBIcon color='#dee3e5' />
              </StorageIconWrapper>

              <div>{t('SettingsDialog.Disk')}</div>
            </StorageButton>
          </div>

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

          <StorageButton $selected>
            <StorageIconWrapper $selected>
              <RAMIcon color='#dee3e5' />
            </StorageIconWrapper>

            <div>{t('SettingsDialog.RAM')}</div>
          </StorageButton>

          <StorageButton onClick={() => updateSettings({ UseDisk: true })}>
            <StorageIconWrapper>
              <USBIcon color='#323637' />
            </StorageIconWrapper>

            <div>{t('SettingsDialog.Disk')}</div>
          </StorageButton>
        </CacheStorageSelector>
      )}
    </MainSettingsContent>
  )
}

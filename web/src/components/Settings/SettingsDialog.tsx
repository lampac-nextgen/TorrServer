import axios from 'axios'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import { FormControlLabel, useMediaQuery, useTheme } from '@mui/material'
import { settingsHost, gstSettingsHost } from 'utils/Hosts'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { clearTMDBCache } from 'components/Add/helpers'
import AppBar from '@mui/material/AppBar'
import CircularProgress from '@mui/material/CircularProgress'
import { StyledDialog } from 'style/CustomMaterialUiStyles'
import useOnStandaloneAppOutsideClick from 'utils/useOnStandaloneAppOutsideClick'

import { SettingsHeader, FooterSection, Content, StyledTabs, StyledTab } from './style'
import defaultSettings from './defaultSettings'
import { a11yProps, TabPanel } from './tabComponents'
import PrimarySettingsComponent from './PrimarySettingsComponent'
import SecondarySettingsComponent from './SecondarySettingsComponent'
import MobileAppSettings from './MobileAppSettings'
import TorznabSettings from './TorznabSettings'
import TMDBSettings from './TMDBSettings'
import GStreamerSettings from './GStreamerSettings'
import type { BTSets } from 'types/api'

interface SettingsDialogProps {
  handleClose: () => void
}

export default function SettingsDialog({ handleClose }: SettingsDialogProps) {
  const { t } = useTranslation()
  const fullScreen = useMediaQuery('(max-width:930px)')
  const { direction } = useTheme()

  const [settings, setSettings] = useState<BTSets | undefined>()
  const [selectedTab, setSelectedTab] = useState(0)
  const [cacheSize, setCacheSize] = useState(32)
  const [cachePercentage, setCachePercentage] = useState(40)
  const [preloadCachePercentage, setPreloadCachePercentage] = useState(0)
  const [isProMode, setIsProMode] = useState(JSON.parse(localStorage.getItem('isProMode') || 'false') as boolean)
  const [isVlcUsed, setIsVlcUsed] = useState(JSON.parse(localStorage.getItem('isVlcUsed') || 'false') as boolean)
  const [isInfuseUsed, setIsInfuseUsed] = useState(
    JSON.parse(localStorage.getItem('isInfuseUsed') || 'false') as boolean,
  )
  const [isSenPlayerUsed, setIsSenPlayerUsed] = useState(
    JSON.parse(localStorage.getItem('isSenPlayerUsed') || 'false') as boolean,
  )
  const [isIinaUsed, setIsIinaUsed] = useState(JSON.parse(localStorage.getItem('isIinaUsed') || 'false') as boolean)
  const [gstAvailable, setGstAvailable] = useState(false)

  const tabMain = 0
  const tabAdditional = 1
  const tabSearch = 2
  const tabApp = 3
  const tabGStreamer = 4
  const maxTab = gstAvailable ? tabGStreamer : tabApp

  useEffect(() => {
    fetch(gstSettingsHost())
      .then(response => (response.ok ? response.json() : { built_in: false }))
      .then(data => setGstAvailable(Boolean(data.built_in)))
      .catch(() => setGstAvailable(false))
  }, [])

  useEffect(() => {
    axios.post(settingsHost(), { action: 'get' }).then(({ data }) => {
      setSettings({ ...data, CacheSize: data.CacheSize / (1024 * 1024) })
    })
  }, [])

  const ref = useOnStandaloneAppOutsideClick(handleClose)

  const handleSave = () => {
    handleClose()
    const sets = JSON.parse(JSON.stringify(settings))
    sets.CacheSize = cacheSize * 1024 * 1024
    sets.ReaderReadAHead = cachePercentage
    sets.PreloadCache = preloadCachePercentage
    axios.post(settingsHost(), { action: 'set', sets })
    // Clear TMDB cache so fresh settings are fetched on next poster search
    clearTMDBCache()
    localStorage.setItem('isVlcUsed', String(isVlcUsed))
    localStorage.setItem('isInfuseUsed', String(isInfuseUsed))
    localStorage.setItem('isSenPlayerUsed', String(isSenPlayerUsed))
    localStorage.setItem('isIinaUsed', String(isIinaUsed))
  }

  const inputForm: import('types/api').SettingsInputHandler = ({ target: { type, value, checked, id } }) => {
    if (!id || !settings) return
    const sets = JSON.parse(JSON.stringify(settings)) as BTSets

    if (type === 'number' || type === 'select-one') {
      sets[id] = Number(value)
    } else if (type === 'checkbox') {
      if (
        id === 'DisableTCP' ||
        id === 'DisableUTP' ||
        id === 'DisableUPNP' ||
        id === 'DisableDHT' ||
        id === 'DisablePEX' ||
        id === 'DisableUpload'
      )
        sets[id] = Boolean(!checked)
      else sets[id] = Boolean(checked)
    } else if (type === 'url' || type === 'text') {
      sets[id] = value
    } else if (!type && value !== undefined) {
      // Fallback for custom handlers that don't provide type
      sets[id] = value
    }
    setSettings(sets)
  }

  useEffect(() => {
    if (selectedTab > maxTab) {
      setSelectedTab(0)
    }
  }, [gstAvailable, selectedTab, maxTab])

  const { CacheSize, ReaderReadAHead, PreloadCache } = settings || {}

  useEffect(() => {
    if (CacheSize == null || ReaderReadAHead == null || PreloadCache == null) return
    if (Number.isNaN(CacheSize) || Number.isNaN(ReaderReadAHead) || Number.isNaN(PreloadCache)) return

    setCacheSize(CacheSize)
    setCachePercentage(ReaderReadAHead)
    setPreloadCachePercentage(PreloadCache)
  }, [CacheSize, ReaderReadAHead, PreloadCache])

  const updateSettings = (newProps: Partial<BTSets>) => setSettings(prev => ({ ...(prev || {}), ...newProps }))
  const handleChange = (_: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue)

  return (
    <StyledDialog open onClose={handleClose} fullScreen={fullScreen} fullWidth maxWidth='md' ref={ref}>
      <SettingsHeader>
        <div>{t('SettingsDialog.Settings')}</div>
        <FormControlLabel
          control={
            <Switch
              checked={isProMode}
              onChange={({ target: { checked } }) => {
                setIsProMode(checked)
                localStorage.setItem('isProMode', String(checked))
                if (!checked) setSelectedTab(0)
              }}
              style={{ color: 'white' }}
            />
          }
          label={t('SettingsDialog.ProMode')}
          labelPlacement='start'
        />
      </SettingsHeader>

      <AppBar position='static' color='default'>
        <StyledTabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor='secondary'
          textColor='secondary'
          variant='scrollable'
          scrollButtons='auto'
        >
          <StyledTab label={t('SettingsDialog.Tabs.Main')} {...a11yProps(0)} />

          <StyledTab
            disabled={!isProMode}
            label={
              <>
                <span>{t('SettingsDialog.Tabs.Additional')}</span>
                {!isProMode && <span className='disabled-hint'>{t('SettingsDialog.Tabs.AdditionalDisabled')}</span>}
              </>
            }
            {...a11yProps(1)}
          />

          <StyledTab label={t('Search')} {...a11yProps(tabSearch)} />

          <StyledTab label={t('SettingsDialog.Tabs.App')} {...a11yProps(tabApp)} />

          {gstAvailable && (
            <StyledTab
              disabled={!isProMode}
              label={
                <>
                  <span>{t('GStreamer.Tab')}</span>
                  {!isProMode && <span className='disabled-hint'>{t('SettingsDialog.Tabs.AdditionalDisabled')}</span>}
                </>
              }
              {...a11yProps(tabGStreamer)}
            />
          )}
        </StyledTabs>
      </AppBar>

      <Content $isLoading={!settings}>
        {settings ? (
          <>
            <TabPanel value={selectedTab} index={tabMain} dir={direction}>
              <PrimarySettingsComponent
                settings={settings}
                inputForm={inputForm}
                cachePercentage={cachePercentage}
                preloadCachePercentage={preloadCachePercentage}
                cacheSize={cacheSize}
                isProMode={isProMode}
                setCacheSize={setCacheSize}
                setCachePercentage={setCachePercentage}
                setPreloadCachePercentage={setPreloadCachePercentage}
                updateSettings={updateSettings}
              />
            </TabPanel>

            <TabPanel value={selectedTab} index={tabAdditional} dir={direction}>
              <SecondarySettingsComponent settings={settings} inputForm={inputForm} updateSettings={updateSettings} />
            </TabPanel>

            <TabPanel value={selectedTab} index={tabSearch} dir={direction}>
              <TorznabSettings settings={settings} inputForm={inputForm} updateSettings={updateSettings} />
            </TabPanel>

            <TabPanel value={selectedTab} index={tabApp} dir={direction}>
              <TMDBSettings settings={settings} updateSettings={updateSettings} />
              <MobileAppSettings
                isVlcUsed={isVlcUsed}
                setIsVlcUsed={setIsVlcUsed}
                isInfuseUsed={isInfuseUsed}
                setIsInfuseUsed={setIsInfuseUsed}
                isSenPlayerUsed={isSenPlayerUsed}
                setIsSenPlayerUsed={setIsSenPlayerUsed}
                isIinaUsed={isIinaUsed}
                setIsIinaUsed={setIsIinaUsed}
              />
            </TabPanel>

            {gstAvailable && (
              <TabPanel value={selectedTab} index={tabGStreamer} dir={direction}>
                <GStreamerSettings />
              </TabPanel>
            )}
          </>
        ) : (
          <CircularProgress color='secondary' />
        )}
      </Content>

      <FooterSection>
        <Button onClick={handleClose} color='secondary' variant='outlined'>
          {t('Cancel')}
        </Button>

        <Button
          onClick={() => {
            setCacheSize(defaultSettings.CacheSize ?? 64)
            setCachePercentage(defaultSettings.ReaderReadAHead ?? 95)
            setPreloadCachePercentage(defaultSettings.PreloadCache ?? 50)
            updateSettings(defaultSettings)
            // Clear TMDB cache when resetting to defaults
            clearTMDBCache()
          }}
          color='secondary'
          variant='outlined'
        >
          {t('SettingsDialog.ResetToDefault')}
        </Button>

        <Button variant='contained' onClick={handleSave} color='secondary'>
          {t('Save')}
        </Button>
      </FooterSection>
    </StyledDialog>
  )
}

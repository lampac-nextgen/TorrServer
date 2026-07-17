import axios from 'axios'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import { FormControlLabel, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material'
import { settingsHost, gstSettingsHost } from 'utils/Hosts'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { clearTMDBCache } from 'components/Add/helpers'
import AppBar from '@mui/material/AppBar'
import CircularProgress from '@mui/material/CircularProgress'
import { StyledDialog } from 'style/CustomMaterialUiStyles'
import useOnStandaloneAppOutsideClick from 'utils/useOnStandaloneAppOutsideClick'
import { readLocalBool, writeLocalJson } from 'utils/localPrefs'
import { buttonLoadingIcon } from 'utils/buttonLoading'

import { SettingsHeader, FooterSection, Content, StyledTabs, StyledTab, SecondarySettingsContent } from './style'
import defaultSettings from './defaultSettings'
import { a11yProps, TabPanel } from './tabComponents'
import PrimarySettingsComponent from './PrimarySettingsComponent'
import SecondarySettingsComponent from './SecondarySettingsComponent'
import MobileAppSettings from './MobileAppSettings'
import TorznabSettings from './TorznabSettings'
import TMDBSettings from './TMDBSettings'
import GStreamerSettings, { type GStreamerSettingsHandle } from './GStreamerSettings'
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
  const [isProMode, setIsProMode] = useState(readLocalBool('isProMode'))
  const [isVlcUsed, setIsVlcUsed] = useState(readLocalBool('isVlcUsed'))
  const [isInfuseUsed, setIsInfuseUsed] = useState(readLocalBool('isInfuseUsed'))
  const [isSenPlayerUsed, setIsSenPlayerUsed] = useState(readLocalBool('isSenPlayerUsed'))
  const [isIinaUsed, setIsIinaUsed] = useState(readLocalBool('isIinaUsed'))
  const [gstAvailable, setGstAvailable] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const gstRef = useRef<GStreamerSettingsHandle>(null)

  const tabMain = 0
  const tabAdditional = 1
  const tabSearch = 2
  const tabApp = 3
  const tabGStreamer = 4
  const maxTab = gstAvailable ? tabGStreamer : tabApp
  const isGstTab = gstAvailable && selectedTab === tabGStreamer

  useEffect(() => {
    const ac = new AbortController()
    fetch(gstSettingsHost(), { signal: ac.signal })
      .then(response => (response.ok ? response.json() : { built_in: false }))
      .then(data => {
        if (!ac.signal.aborted) setGstAvailable(Boolean(data.built_in))
      })
      .catch(() => {
        if (!ac.signal.aborted) setGstAvailable(false)
      })
    return () => ac.abort()
  }, [])

  useEffect(() => {
    const ac = new AbortController()
    axios
      .post(settingsHost(), { action: 'get' }, { signal: ac.signal })
      .then(({ data }) => {
        if (!ac.signal.aborted) setSettings({ ...data, CacheSize: data.CacheSize / (1024 * 1024) })
      })
      .catch(() => {})
    return () => ac.abort()
  }, [])

  const ref = useOnStandaloneAppOutsideClick(handleClose)

  const handleSave = async () => {
    if (saving) return
    if (isGstTab) {
      setSaving(true)
      try {
        await gstRef.current?.save()
      } finally {
        setSaving(false)
      }
      return
    }
    if (!settings) return
    setSaving(true)
    try {
      const sets = JSON.parse(JSON.stringify(settings))
      sets.CacheSize = cacheSize * 1024 * 1024
      sets.ReaderReadAHead = cachePercentage
      sets.PreloadCache = preloadCachePercentage
      await axios.post(settingsHost(), { action: 'set', sets })
      clearTMDBCache()
      writeLocalJson('isVlcUsed', isVlcUsed)
      writeLocalJson('isInfuseUsed', isInfuseUsed)
      writeLocalJson('isSenPlayerUsed', isSenPlayerUsed)
      writeLocalJson('isIinaUsed', isIinaUsed)
      handleClose()
    } catch (e) {
      setSaveMsg(
        (e as Error)?.message || t('SettingsDialog.SettingsSaveFailed', { defaultValue: 'Failed to save settings' }),
      )
    } finally {
      setSaving(false)
    }
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
                writeLocalJson('isProMode', checked)
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
              <SecondarySettingsContent>
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
              </SecondarySettingsContent>
            </TabPanel>

            {gstAvailable && (
              <TabPanel value={selectedTab} index={tabGStreamer} dir={direction}>
                <GStreamerSettings ref={gstRef} />
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

        <Button
          variant='contained'
          onClick={handleSave}
          color='secondary'
          disabled={saving || (!isGstTab && !settings)}
          startIcon={buttonLoadingIcon(saving)}
        >
          {t('Save')}
        </Button>
      </FooterSection>
      <Snackbar open={!!saveMsg} autoHideDuration={3000} onClose={() => setSaveMsg('')}>
        <Alert onClose={() => setSaveMsg('')} severity='error' variant='filled' sx={{ width: '100%' }}>
          {saveMsg}
        </Alert>
      </Snackbar>
    </StyledDialog>
  )
}

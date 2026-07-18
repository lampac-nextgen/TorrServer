import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormHelperText from '@mui/material/FormHelperText'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { BTSets } from 'shared/api/types'
import { getSettings, setSettings } from 'shared/api/settings'
import { getGstSettings, setGstSettings } from 'shared/api/gst'
import {
  defaultStorageSettings,
  getStorageSettings,
  setStorageSettings,
  type StorageSettings,
} from 'shared/api/storage'
import defaultSettings from 'shared/settings/defaults'
import { GST_RUNTIME_QUERY_KEY, useGStreamerRuntime } from 'shared/lib/gstreamer'
import { notifySettingsChanged } from 'shared/lib/settingsEvents'
import { clearTMDBCache } from 'shared/lib/torrentHelpers'
import { queryMax } from 'shared/theme/breakpoints'
import { getThemeColors } from 'shared/theme/colors'
import AppDialog from 'shared/ui/AppDialog'
import { useOptionalAppToast } from 'shared/ui/Toast'

import FeaturesSettingsPanel from './FeaturesSettingsPanel'
import GStreamerSettingsPanel, { emptyGstConfig, type GStreamerConfig } from './GStreamerSettingsPanel'
import MobilePlayersSection from './MobilePlayersSection'
import NetworkSettingsPanel from './NetworkSettingsPanel'
import PrimarySettingsPanel from './PrimarySettingsPanel'
import { DISABLE_SWITCH_IDS } from './SettingSwitch'
import StorageSettingsPanel from './StorageSettingsPanel'
import TMDBSettingsSection from './TMDBSettingsSection'
import TorznabSettingsPanel from './TorznabSettingsPanel'

export interface SettingsDialogProps {
  open: boolean
  onClose: () => void
}

type SettingsTab = 'primary' | 'network' | 'features' | 'storage' | 'app' | 'gstreamer' | 'torznab'

function TabPanel({ children, active, tab }: { children: ReactNode; active: SettingsTab; tab: SettingsTab }) {
  if (active !== tab) return null
  return <Box sx={{ pt: 2 }}>{children}</Box>
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()
  const isMobile = useMediaQuery(queryMax('mobile'))
  const gstRuntime = useGStreamerRuntime()

  const [tab, setTab] = useState<SettingsTab>('primary')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setLocalSettings] = useState<BTSets>({ ...defaultSettings })
  const [cacheSizeMb, setCacheSizeMb] = useState(defaultSettings.CacheSize ?? 64)
  const [gstConfig, setGstConfig] = useState<GStreamerConfig>(emptyGstConfig())
  const [gstDefaults, setGstDefaults] = useState<GStreamerConfig>(emptyGstConfig())
  const [storageBackends, setStorageBackends] = useState<StorageSettings>(defaultStorageSettings())

  const gstAvailable = Boolean(gstRuntime.built_in)
  const isGstTab = tab === 'gstreamer'

  const visibleTabs = useMemo(() => {
    const tabs: { id: SettingsTab; label: string }[] = [
      { id: 'primary', label: t('SettingsDialog.Tabs.Main') },
      { id: 'network', label: t('Network') },
      { id: 'features', label: t('SettingsDialog.AdditionalSettings') },
      { id: 'storage', label: t('SettingsDialog.StorageSettings') },
      { id: 'app', label: t('SettingsDialog.Tabs.App') },
    ]
    if (gstAvailable) tabs.push({ id: 'gstreamer', label: t('GStreamer.Tab') })
    tabs.push({ id: 'torznab', label: t('Torznab.Tab') })
    return tabs
  }, [gstAvailable, t])

  useEffect(() => {
    if (!visibleTabs.some(item => item.id === tab)) setTab('primary')
  }, [tab, visibleTabs])

  const loadSettings = useCallback(async (signal?: AbortSignal) => {
    const data = await getSettings(signal)
    const loaded = { ...defaultSettings, ...data }
    const mb = Math.round((loaded.CacheSize ?? (defaultSettings.CacheSize ?? 64) * 1024 * 1024) / (1024 * 1024))
    setLocalSettings({ ...loaded, CacheSize: mb })
    setCacheSizeMb(mb)
  }, [])

  const loadGstConfig = useCallback(async (signal?: AbortSignal) => {
    try {
      const data = await getGstSettings(signal)
      if (!data.built_in) return
      setGstConfig({ ...emptyGstConfig(), ...(data.config || {}) })
      setGstDefaults({ ...emptyGstConfig(), ...(data.defaults || {}) })
    } catch {
      // optional when GST not built in
    }
  }, [])

  const loadStorageBackends = useCallback(async (signal?: AbortSignal) => {
    try {
      const prefs = await getStorageSettings(signal)
      setStorageBackends(prefs)
    } catch {
      setStorageBackends(defaultStorageSettings())
    }
  }, [])

  const updateSettingsPartial: import('shared/api/types').SettingsUpdater = partial => {
    setLocalSettings(prev => ({ ...prev, ...partial }))
  }

  useEffect(() => {
    if (!open) return
    const ac = new AbortController()
    setLoading(true)
    Promise.all([loadSettings(ac.signal), loadGstConfig(ac.signal), loadStorageBackends(ac.signal)])
      .catch(() => {
        toast?.showToast({ message: t('Error'), severity: 'error' })
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false)
      })
    return () => ac.abort()
  }, [open, loadSettings, loadGstConfig, loadStorageBackends, t, toast])

  const updateSetting = useCallback(<K extends keyof BTSets>(key: K, value: BTSets[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleBoolSwitch = useCallback(
    (id: string, checked: boolean) => {
      const key = id as keyof BTSets
      const value = DISABLE_SWITCH_IDS.has(id) ? !checked : checked
      updateSetting(key, value as BTSets[typeof key])
    },
    [updateSetting],
  )

  const boolChecked = useCallback(
    (key: keyof BTSets) => {
      const value = settings[key]
      if (DISABLE_SWITCH_IDS.has(String(key))) return !value
      return Boolean(value)
    },
    [settings],
  )

  const handleSave = async () => {
    if (saving) return
    setSaving(true)
    try {
      if (isGstTab) {
        await setGstSettings(gstConfig)
        await queryClient.invalidateQueries({ queryKey: [GST_RUNTIME_QUERY_KEY] })
      } else {
        const sets = {
          ...settings,
          CacheSize: cacheSizeMb * 1024 * 1024,
          ReaderReadAHead: settings.ReaderReadAHead ?? defaultSettings.ReaderReadAHead,
          PreloadCache: settings.PreloadCache ?? defaultSettings.PreloadCache,
        }
        await setSettings(sets)
        await setStorageSettings(storageBackends)
        clearTMDBCache()
        notifySettingsChanged()
        await queryClient.invalidateQueries({ queryKey: ['settings'] })
      }
      toast?.showToast({ message: t('Saved'), severity: 'success' })
      onClose()
    } catch (e) {
      toast?.showToast({
        message: (e as Error).message || t('Error'),
        severity: 'error',
      })
    } finally {
      setSaving(false)
    }
  }

  const footerButtonSx = isMobile ? { minHeight: 44, px: 2.5 } : undefined
  const theme = useTheme()
  const settingsColors = getThemeColors(theme.palette.mode === 'dark' ? 'dark' : 'light').settingsDialog

  return (
    <AppDialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>{t('Settings')}</DialogTitle>
      <DialogContent sx={{ bgcolor: settingsColors.contentBG }}>
        {loading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v as SettingsTab)}
              variant='scrollable'
              scrollButtons='auto'
              sx={{ borderBottom: 1, borderColor: settingsColors.separatorColor, mx: { xs: -1, sm: -1.5 } }}
            >
              {visibleTabs.map(item => (
                <Tab key={item.id} value={item.id} label={item.label} sx={isMobile ? { minHeight: 44 } : undefined} />
              ))}
            </Tabs>

            <TabPanel active={tab} tab='primary'>
              <PrimarySettingsPanel
                settings={settings}
                cacheSizeMb={cacheSizeMb}
                onCacheSizeMb={setCacheSizeMb}
                onUpdate={updateSetting}
                onBoolSwitch={handleBoolSwitch}
              />
            </TabPanel>

            <TabPanel active={tab} tab='network'>
              <NetworkSettingsPanel
                settings={settings}
                boolChecked={boolChecked}
                onUpdate={updateSetting}
                onBoolSwitch={handleBoolSwitch}
              />
            </TabPanel>

            <TabPanel active={tab} tab='features'>
              <FeaturesSettingsPanel
                settings={settings}
                boolChecked={boolChecked}
                onUpdate={updateSetting}
                onBoolSwitch={handleBoolSwitch}
              />
            </TabPanel>

            <TabPanel active={tab} tab='storage'>
              <StorageSettingsPanel
                settings={settings}
                onBoolSwitch={handleBoolSwitch}
                backends={storageBackends}
                onBackendsChange={setStorageBackends}
              />
            </TabPanel>

            <TabPanel active={tab} tab='app'>
              <FormHelperText sx={{ mb: 2, mt: 0 }}>{t('SettingsDialog.AppTabHint')}</FormHelperText>
              <TMDBSettingsSection settings={settings} updateSettings={updateSettingsPartial} />
              <MobilePlayersSection />
            </TabPanel>

            {gstAvailable ? (
              <TabPanel active={tab} tab='gstreamer'>
                <GStreamerSettingsPanel config={gstConfig} onChange={setGstConfig} />
                <Button
                  sx={{ mt: 2 }}
                  variant='outlined'
                  onClick={() => setGstConfig({ ...emptyGstConfig(), ...gstDefaults })}
                >
                  {t('Reset', { defaultValue: 'Reset to defaults' })}
                </Button>
              </TabPanel>
            ) : null}

            <TabPanel active={tab} tab='torznab'>
              <TorznabSettingsPanel settings={settings} onUpdate={updateSetting} footerButtonSx={footerButtonSx} />
            </TabPanel>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, bgcolor: settingsColors.footerBG }}>
        <Button onClick={onClose} disabled={saving} sx={footerButtonSx} autoFocus>
          {t('Cancel')}
        </Button>
        <Button variant='contained' onClick={() => void handleSave()} disabled={loading || saving} sx={footerButtonSx}>
          {saving ? <CircularProgress size={20} color='inherit' /> : t('Save')}
        </Button>
      </DialogActions>
    </AppDialog>
  )
}

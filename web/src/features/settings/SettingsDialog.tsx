import { Button, Description, Modal, Spinner, Tabs, useMediaQuery } from '@heroui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import type { BTSets } from 'shared/api/types'
import { getSettings, setSettings, SETTINGS_QUERY_KEY } from 'shared/api/settings'
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

/** Tabbed server settings dialog — full-screen on mobile, persists via BTSets + GST + storage-backend APIs. */
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
      // GST is optional — not built in on this platform/build.
    }
  }, [])

  const loadStorageBackends = useCallback(async (signal?: AbortSignal) => {
    try {
      setStorageBackends(await getStorageSettings(signal))
    } catch {
      setStorageBackends(defaultStorageSettings())
    }
  }, [])

  useEffect(() => {
    if (!open) return undefined
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

  const updateSettingsPartial = useCallback((partial: Partial<BTSets>) => {
    setLocalSettings(prev => ({ ...prev, ...partial }))
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
        const sets: BTSets = {
          ...settings,
          CacheSize: cacheSizeMb * 1024 * 1024,
          ReaderReadAHead: settings.ReaderReadAHead ?? defaultSettings.ReaderReadAHead,
          PreloadCache: settings.PreloadCache ?? defaultSettings.PreloadCache,
        }
        await setSettings(sets)
        await setStorageSettings(storageBackends)
        clearTMDBCache()
        notifySettingsChanged()
        await queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY })
      }
      toast?.showToast({ message: t('Saved', { defaultValue: 'Saved' }), severity: 'success' })
      onClose()
    } catch (err) {
      toast?.showToast({ message: (err as Error).message || t('Error'), severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const footerButtonClassName = isMobile ? 'min-h-11 px-4' : undefined

  return (
    <AppDialog open={open} onClose={onClose} size='md' fullScreen={isMobile}>
      <Modal.Header>
        <Modal.Heading>{t('SettingsDialog.Settings')}</Modal.Heading>
        <Modal.CloseTrigger />
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className='grid place-items-center py-16'>
            <Spinner size='lg' />
          </div>
        ) : (
          <Tabs.Root selectedKey={tab} onSelectionChange={key => setTab(String(key) as SettingsTab)}>
            <Tabs.List aria-label={t('SettingsDialog.Settings')} className='overflow-x-auto'>
              {visibleTabs.map(item => (
                <Tabs.Tab
                  key={item.id}
                  id={item.id}
                  className={isMobile ? 'min-h-11 whitespace-nowrap' : 'whitespace-nowrap'}
                >
                  {item.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel id='primary' className='pt-4'>
              <PrimarySettingsPanel
                settings={settings}
                cacheSizeMb={cacheSizeMb}
                onCacheSizeMb={setCacheSizeMb}
                onUpdate={updateSetting}
                onBoolSwitch={handleBoolSwitch}
              />
            </Tabs.Panel>

            <Tabs.Panel id='network' className='pt-4'>
              <NetworkSettingsPanel
                settings={settings}
                boolChecked={boolChecked}
                onUpdate={updateSetting}
                onBoolSwitch={handleBoolSwitch}
              />
            </Tabs.Panel>

            <Tabs.Panel id='features' className='pt-4'>
              <FeaturesSettingsPanel
                settings={settings}
                boolChecked={boolChecked}
                onUpdate={updateSetting}
                onBoolSwitch={handleBoolSwitch}
              />
            </Tabs.Panel>

            <Tabs.Panel id='storage' className='pt-4'>
              <StorageSettingsPanel
                settings={settings}
                onBoolSwitch={handleBoolSwitch}
                backends={storageBackends}
                onBackendsChange={setStorageBackends}
              />
            </Tabs.Panel>

            <Tabs.Panel id='app' className='pt-4'>
              <Description className='mb-4'>{t('SettingsDialog.AppTabHint')}</Description>
              <TMDBSettingsSection settings={settings} updateSettings={updateSettingsPartial} />
              <MobilePlayersSection />
            </Tabs.Panel>

            {gstAvailable ? (
              <Tabs.Panel id='gstreamer' className='pt-4'>
                <GStreamerSettingsPanel config={gstConfig} onChange={setGstConfig} />
                <Button
                  className='mt-4'
                  variant='secondary'
                  onPress={() => setGstConfig({ ...emptyGstConfig(), ...gstDefaults })}
                >
                  {t('SettingsDialog.ResetToDefault')}
                </Button>
              </Tabs.Panel>
            ) : null}

            <Tabs.Panel id='torznab' className='pt-4'>
              <TorznabSettingsPanel
                settings={settings}
                onUpdate={updateSetting}
                footerButtonClassName={footerButtonClassName}
              />
            </Tabs.Panel>
          </Tabs.Root>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={onClose} isDisabled={saving} variant='secondary' className={footerButtonClassName} autoFocus>
          {t('Cancel')}
        </Button>
        <Button
          variant='primary'
          onPress={() => void handleSave()}
          isDisabled={loading || saving}
          className={footerButtonClassName}
        >
          {saving ? <Spinner size='sm' color='current' /> : t('Save')}
        </Button>
      </Modal.Footer>
    </AppDialog>
  )
}

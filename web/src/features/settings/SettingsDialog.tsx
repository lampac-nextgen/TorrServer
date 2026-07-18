import { Button, Description, Modal, Spinner, Tabs, useMediaQuery } from '@heroui/react'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Cog, Film, HardDrive, Rss, SlidersHorizontal, Smartphone, Wifi } from 'lucide-react'

import type { BTSets } from 'shared/api/types'
import { getSettings, setSettings, resetSettings, SETTINGS_QUERY_KEY } from 'shared/api/settings'
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
import { DIALOG_SETTINGS } from 'shared/ui/dialogSizes'
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
  /** Deep-link into a specific tab when opened externally (e.g. an "enable external players" hint). */
  initialTab?: SettingsTab
}

type SettingsTab = 'primary' | 'network' | 'features' | 'storage' | 'app' | 'gstreamer' | 'torznab'

/** Fades + slides in freshly-mounted tab content — `Tabs.Panel` only mounts the selected tab, so this
 *  re-runs on every switch without any extra wiring. */
function PanelFade({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (!ref.current) return
    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(ref.current, { opacity: 1, y: 0 })
      return
    }
    gsap.fromTo(ref.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' })
  }, [])
  return <div ref={ref}>{children}</div>
}

/** Tabbed server settings dialog — full-screen on mobile, persists via BTSets + GST + storage-backend APIs. */
export default function SettingsDialog({ open, onClose, initialTab }: SettingsDialogProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()
  const isMobile = useMediaQuery(queryMax('mobile'))
  const isFullScreenBreakpoint = useMediaQuery(queryMax('dialog'))
  const gstRuntime = useGStreamerRuntime()

  const [tab, setTab] = useState<SettingsTab>('primary')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setLocalSettings] = useState<BTSets>({ ...defaultSettings })
  const [cacheSizeMb, setCacheSizeMb] = useState(defaultSettings.CacheSize ?? 64)
  const [gstConfig, setGstConfig] = useState<GStreamerConfig>(emptyGstConfig())
  const [gstDefaults, setGstDefaults] = useState<GStreamerConfig>(emptyGstConfig())
  const [storageBackends, setStorageBackends] = useState<StorageSettings>(defaultStorageSettings())
  /** False when `/storage/settings` failed — Save still works for BTSets/GST; storage write is skipped. */
  const [storageLoadedOk, setStorageLoadedOk] = useState(false)

  const gstAvailable = Boolean(gstRuntime.built_in)

  const visibleTabs = useMemo(() => {
    const tabs: { id: SettingsTab; label: string; shortLabel: string; icon: ReactNode }[] = [
      {
        id: 'primary',
        label: t('SettingsDialog.Tabs.Main'),
        shortLabel: t('SettingsDialog.Tabs.Main'),
        icon: <SlidersHorizontal size={17} />,
      },
      {
        id: 'network',
        label: t('SettingsDialog.Tabs.Network'),
        shortLabel: t('SettingsDialog.Tabs.Network'),
        icon: <Wifi size={17} />,
      },
      {
        id: 'features',
        label: t('SettingsDialog.AdditionalSettings'),
        shortLabel: t('SettingsDialog.Tabs.AdvancedShort'),
        icon: <Cog size={17} />,
      },
      {
        id: 'storage',
        label: t('SettingsDialog.StorageSettings'),
        shortLabel: t('SettingsDialog.Tabs.StorageShort'),
        icon: <HardDrive size={17} />,
      },
      {
        id: 'app',
        label: t('SettingsDialog.Tabs.App'),
        shortLabel: t('SettingsDialog.Tabs.App'),
        icon: <Smartphone size={17} />,
      },
    ]
    if (gstAvailable) {
      tabs.push({
        id: 'gstreamer',
        label: t('GStreamer.Tab'),
        shortLabel: t('GStreamer.Tab'),
        icon: <Film size={17} />,
      })
    }
    tabs.push({
      id: 'torznab',
      label: t('Torznab.Tab'),
      shortLabel: t('Torznab.Tab'),
      icon: <Rss size={17} />,
    })
    return tabs
  }, [gstAvailable, t])

  useEffect(() => {
    if (!visibleTabs.some(item => item.id === tab)) setTab('primary')
  }, [tab, visibleTabs])

  useEffect(() => {
    if (open && initialTab) setTab(initialTab)
  }, [open, initialTab])

  const loadSettings = useCallback(async (signal?: AbortSignal) => {
    const data = await getSettings(signal)
    const loaded = { ...defaultSettings, ...data }
    const mb = Math.round((loaded.CacheSize ?? (defaultSettings.CacheSize ?? 64) * 1024 * 1024) / (1024 * 1024))
    const next = { ...loaded, CacheSize: mb }
    setLocalSettings(next)
    setCacheSizeMb(mb)
    // Keep play/resume TrackTimecode readers in sync even before Save.
    queryClient.setQueryData(SETTINGS_QUERY_KEY, { ...loaded, CacheSize: loaded.CacheSize })
  }, [queryClient])

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

  const loadStorageBackends = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setStorageBackends(await getStorageSettings(signal))
        setStorageLoadedOk(true)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setStorageLoadedOk(false)
        toast?.showToast({ message: t('Error'), severity: 'error' })
      }
    },
    [t, toast],
  )

  useEffect(() => {
    if (!open) return undefined
    const ac = new AbortController()
    setLoading(true)
    setStorageLoadedOk(false)
    Promise.all([loadSettings(ac.signal), loadGstConfig(ac.signal), loadStorageBackends(ac.signal)])
      .catch(err => {
        if ((err as Error).name === 'AbortError') return
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
      const sets: BTSets = {
        ...settings,
        CacheSize: cacheSizeMb * 1024 * 1024,
        ReaderReadAHead: settings.ReaderReadAHead ?? defaultSettings.ReaderReadAHead,
        PreloadCache: settings.PreloadCache ?? defaultSettings.PreloadCache,
      }
      await setSettings(sets)
      queryClient.setQueryData(SETTINGS_QUERY_KEY, sets)
      if (storageLoadedOk) {
        await setStorageSettings(storageBackends)
      }
      if (gstAvailable) {
        await setGstSettings(gstConfig)
        await queryClient.invalidateQueries({ queryKey: [GST_RUNTIME_QUERY_KEY] })
      }
      clearTMDBCache()
      notifySettingsChanged()
      await queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY })
      toast?.showToast({
        message: storageLoadedOk
          ? t('Saved')
          : t('SavedWithoutStorage'),
        severity: 'success',
      })
      onClose()
    } catch (err) {
      toast?.showToast({ message: (err as Error).message || t('Error'), severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleResetDefaults = async () => {
    if (saving) return
    setSaving(true)
    try {
      await resetSettings()
      const ac = new AbortController()
      await loadSettings(ac.signal)
      await loadGstConfig(ac.signal)
      clearTMDBCache()
      notifySettingsChanged()
      await queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY })
      toast?.showToast({ message: t('SettingsDialog.ResetToDefault'), severity: 'success' })
    } catch (err) {
      toast?.showToast({ message: (err as Error).message || t('Error'), severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const footerButtonClassName = isMobile ? 'min-h-11 px-4' : undefined
  const panelClassName = isMobile
    ? 'min-h-0 flex-1 overflow-y-auto pt-4'
    : 'ml-0 min-h-0 min-w-0 flex-1 overflow-y-auto'
  const tabsRootClassName = isMobile
    ? 'flex min-h-0 flex-1 flex-col overflow-hidden'
    : 'flex min-h-0 flex-1 gap-6 overflow-hidden'
  const tabsListClassName = isMobile
    ? 'sticky top-0 z-10 shrink-0 overflow-x-auto bg-surface pb-2'
    : 'sticky top-0 z-10 w-60 shrink-0 self-start bg-surface'

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      size='lg'
      fullScreen={isFullScreenBreakpoint}
      dialogStyle={isMobile ? undefined : DIALOG_SETTINGS}
    >
      <Modal.Header>
        <Modal.Heading>{t('SettingsDialog.Settings')}</Modal.Heading>
        <Modal.CloseTrigger aria-label={t('Close')} />
      </Modal.Header>
      <Modal.Body
        className={
          loading
            ? undefined
            : isMobile
              ? 'flex min-h-0 flex-col overflow-hidden'
              : 'flex min-h-[min(60dvh,32rem)] flex-col overflow-hidden'
        }
      >
        {loading ? (
          <div className='grid place-items-center py-16'>
            <Spinner size='lg' />
          </div>
        ) : (
          <Tabs.Root
            orientation={isMobile ? 'horizontal' : 'vertical'}
            selectedKey={tab}
            onSelectionChange={key => setTab(String(key) as SettingsTab)}
            className={tabsRootClassName}
          >
            <Tabs.List aria-label={t('SettingsDialog.Settings')} className={tabsListClassName}>
              {visibleTabs.map(item => (
                <Tabs.Tab
                  key={item.id}
                  id={item.id}
                  className={
                    isMobile
                      ? 'min-h-11 shrink-0 gap-1.5 whitespace-nowrap px-2.5'
                      : 'min-h-10 items-start justify-start gap-2.5 px-3 py-2 text-left'
                  }
                >
                  <span className={isMobile ? 'shrink-0' : 'mt-0.5'}>{item.icon}</span>
                  <span className={isMobile ? 'text-sm' : 'text-wrap leading-snug'}>
                    {isMobile ? item.shortLabel : item.label}
                  </span>
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel id='primary' className={panelClassName}>
              <PanelFade>
                <PrimarySettingsPanel
                  settings={settings}
                  cacheSizeMb={cacheSizeMb}
                  onCacheSizeMb={setCacheSizeMb}
                  onUpdate={updateSetting}
                  onBoolSwitch={handleBoolSwitch}
                />
              </PanelFade>
            </Tabs.Panel>

            <Tabs.Panel id='network' className={panelClassName}>
              <PanelFade>
                <NetworkSettingsPanel
                  settings={settings}
                  boolChecked={boolChecked}
                  onUpdate={updateSetting}
                  onBoolSwitch={handleBoolSwitch}
                />
              </PanelFade>
            </Tabs.Panel>

            <Tabs.Panel id='features' className={panelClassName}>
              <PanelFade>
                <FeaturesSettingsPanel
                  settings={settings}
                  boolChecked={boolChecked}
                  onUpdate={updateSetting}
                  onBoolSwitch={handleBoolSwitch}
                />
              </PanelFade>
            </Tabs.Panel>

            <Tabs.Panel id='storage' className={panelClassName}>
              <PanelFade>
                {!storageLoadedOk && !loading ? (
                  <Description className='mb-3 text-warning'>
                    {t('StorageLoadFailed')}
                  </Description>
                ) : null}
                <StorageSettingsPanel backends={storageBackends} onBackendsChange={setStorageBackends} />
              </PanelFade>
            </Tabs.Panel>

            <Tabs.Panel id='app' className={panelClassName}>
              <PanelFade>
                <Description className='mb-4'>{t('SettingsDialog.AppTabHint')}</Description>
                <div className='space-y-6'>
                  <TMDBSettingsSection settings={settings} updateSettings={updateSettingsPartial} />
                  <MobilePlayersSection />
                </div>
              </PanelFade>
            </Tabs.Panel>

            {gstAvailable ? (
              <Tabs.Panel id='gstreamer' className={panelClassName}>
                <PanelFade>
                  <GStreamerSettingsPanel config={gstConfig} onChange={setGstConfig} />
                  <Button
                    className='mt-4'
                    variant='secondary'
                    onPress={() => setGstConfig({ ...emptyGstConfig(), ...gstDefaults })}
                  >
                    {t('SettingsDialog.ResetToDefault')}
                  </Button>
                </PanelFade>
              </Tabs.Panel>
            ) : null}

            <Tabs.Panel id='torznab' className={panelClassName}>
              <PanelFade>
                <TorznabSettingsPanel
                  settings={settings}
                  onUpdate={updateSetting}
                  footerButtonClassName={footerButtonClassName}
                />
              </PanelFade>
            </Tabs.Panel>
          </Tabs.Root>
        )}
      </Modal.Body>
      <Modal.Footer
        className={
          isMobile
            ? 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'
            : undefined
        }
      >
        <div className={isMobile ? 'grid grid-cols-2 gap-2' : 'contents'}>
          <Button
            onPress={() => void handleResetDefaults()}
            isDisabled={loading || saving}
            variant='outline'
            className={footerButtonClassName}
          >
            {t('SettingsDialog.ResetToDefault')}
          </Button>
          <Button onPress={onClose} isDisabled={saving} variant='secondary' className={footerButtonClassName} autoFocus>
            {t('Cancel')}
          </Button>
        </div>
        <Button
          variant='primary'
          onPress={() => void handleSave()}
          isDisabled={loading || saving}
          className={isMobile ? `${footerButtonClassName || ''} w-full`.trim() : footerButtonClassName}
        >
          {saving ? <Spinner size='sm' color='current' /> : t('Save')}
        </Button>
      </Modal.Footer>
    </AppDialog>
  )
}

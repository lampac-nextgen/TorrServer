import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { BTSets, TorznabUrl } from 'shared/api/types'
import { gstSettingsHost, settingsHost, torznabTestHost } from 'shared/api/hosts'
import defaultSettings from 'shared/settings/defaults'
import { GST_RUNTIME_QUERY_KEY, useGStreamerRuntime } from 'shared/lib/gstreamer'
import { notifySettingsChanged } from 'shared/lib/settingsEvents'
import { queryMax } from 'shared/theme/breakpoints'
import AppDialog from 'shared/ui/AppDialog'
import { useOptionalAppToast } from 'shared/ui/Toast'

export interface SettingsDialogProps {
  open: boolean
  onClose: () => void
}

type SettingsTab = 'primary' | 'network' | 'features' | 'storage' | 'gstreamer' | 'torznab'

const touchTargetSx = {
  minHeight: 44,
  minWidth: 44,
}

const disableSwitchIds = new Set([
  'DisableTCP',
  'DisableUTP',
  'DisableUPNP',
  'DisableDHT',
  'DisablePEX',
  'DisableUpload',
])

function TabPanel({ children, active, tab }: { children: ReactNode; active: SettingsTab; tab: SettingsTab }) {
  if (active !== tab) return null
  return <Box sx={{ pt: 2 }}>{children}</Box>
}

function SettingSwitch({
  id,
  label,
  helper,
  checked,
  onChange,
}: {
  id: string
  label: string
  helper?: string
  checked: boolean
  onChange: (id: string, checked: boolean) => void
}) {
  return (
    <Box sx={{ mb: 1 }}>
      <FormControlLabel
        control={<Switch id={id} checked={checked} onChange={e => onChange(id, e.target.checked)} sx={touchTargetSx} />}
        label={label}
        sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0 }}
        labelPlacement='start'
      />
      {helper ? <FormHelperText sx={{ mt: -0.5, ml: 0 }}>{helper}</FormHelperText> : null}
    </Box>
  )
}

interface GstConfig {
  TranscodeAVI?: boolean
  TranscodeH264?: boolean
  TranscodeH265?: boolean
  HardwareAcceleration?: boolean
  [key: string]: unknown
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
  const [settings, setSettings] = useState<BTSets>({ ...defaultSettings })
  const [cacheSizeMb, setCacheSizeMb] = useState(defaultSettings.CacheSize ?? 64)
  const [gstConfig, setGstConfig] = useState<GstConfig>({})
  const [gstDefaults, setGstDefaults] = useState<GstConfig>({})

  const [newTorznabHost, setNewTorznabHost] = useState('')
  const [newTorznabKey, setNewTorznabKey] = useState('')
  const [newTorznabName, setNewTorznabName] = useState('')
  const [torznabTesting, setTorznabTesting] = useState(false)
  const [torznabTestMsg, setTorznabTestMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const gstAvailable = Boolean(gstRuntime.built_in)
  const isGstTab = tab === 'gstreamer'

  const visibleTabs = useMemo(() => {
    const tabs: { id: SettingsTab; label: string }[] = [
      { id: 'primary', label: t('SettingsDialog.Tabs.Main', { defaultValue: 'Primary' }) },
      { id: 'network', label: t('Network', { defaultValue: 'Network' }) },
      { id: 'features', label: t('SettingsDialog.AdditionalSettings', { defaultValue: 'Features' }) },
      { id: 'storage', label: t('SettingsDialog.StorageSettings', { defaultValue: 'Storage' }) },
    ]
    if (gstAvailable) {
      tabs.push({ id: 'gstreamer', label: t('GStreamer.Tab', { defaultValue: 'GStreamer' }) })
    }
    tabs.push({ id: 'torznab', label: t('Torznab.Tab', { defaultValue: 'Torznab' }) })
    return tabs
  }, [gstAvailable, t])

  useEffect(() => {
    if (!visibleTabs.some(item => item.id === tab)) {
      setTab('primary')
    }
  }, [tab, visibleTabs])

  const loadSettings = useCallback(async (signal?: AbortSignal) => {
    const { data } = await axios.post(settingsHost(), { action: 'get' }, { signal })
    const loaded = { ...defaultSettings, ...(data as BTSets) }
    const mb = Math.round((loaded.CacheSize ?? (defaultSettings.CacheSize ?? 64) * 1024 * 1024) / (1024 * 1024))
    setSettings({ ...loaded, CacheSize: mb })
    setCacheSizeMb(mb)
  }, [])

  const loadGstConfig = useCallback(async (signal?: AbortSignal) => {
    const response = await fetch(gstSettingsHost(), { signal })
    if (!response.ok) return
    const data = await response.json()
    if (!data.built_in) return
    setGstConfig(data.config || {})
    setGstDefaults(data.defaults || {})
  }, [])

  useEffect(() => {
    if (!open) return
    const ac = new AbortController()
    setLoading(true)
    Promise.all([loadSettings(ac.signal), loadGstConfig(ac.signal)])
      .catch(() => {
        toast?.showToast({ message: t('Error', { defaultValue: 'Error' }), severity: 'error' })
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false)
      })
    return () => ac.abort()
  }, [open, loadSettings, loadGstConfig, t, toast])

  const updateSetting = useCallback(<K extends keyof BTSets>(key: K, value: BTSets[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleBoolSwitch = useCallback(
    (id: string, checked: boolean) => {
      const key = id as keyof BTSets
      const value = disableSwitchIds.has(id) ? !checked : checked
      updateSetting(key, value as BTSets[typeof key])
    },
    [updateSetting],
  )

  const boolChecked = useCallback(
    (key: keyof BTSets) => {
      const value = settings[key]
      if (disableSwitchIds.has(String(key))) return !value
      return Boolean(value)
    },
    [settings],
  )

  const handleAddTorznab = () => {
    if (!newTorznabHost.trim() || !newTorznabKey.trim()) return
    const next: TorznabUrl = {
      Host: newTorznabHost.trim(),
      Key: newTorznabKey.trim(),
      Name: newTorznabName.trim() || undefined,
    }
    updateSetting('TorznabUrls', [...(settings.TorznabUrls || []), next])
    setNewTorznabHost('')
    setNewTorznabKey('')
    setNewTorznabName('')
    setTorznabTestMsg(null)
  }

  const handleRemoveTorznab = (index: number) => {
    const urls = [...(settings.TorznabUrls || [])]
    urls.splice(index, 1)
    updateSetting('TorznabUrls', urls)
  }

  const handleTestTorznab = async () => {
    setTorznabTesting(true)
    setTorznabTestMsg(null)
    try {
      const { data } = await axios.post(torznabTestHost(), { host: newTorznabHost, key: newTorznabKey })
      if (data.success) {
        setTorznabTestMsg({
          ok: true,
          text: t('Torznab.ConnectionSuccessful', { defaultValue: 'Connection successful' }),
        })
      } else {
        setTorznabTestMsg({ ok: false, text: String(data.error || t('Error', { defaultValue: 'Error' })) })
      }
    } catch (e) {
      setTorznabTestMsg({ ok: false, text: (e as Error).message })
    } finally {
      setTorznabTesting(false)
    }
  }

  const saveGstConfig = async () => {
    const response = await fetch(gstSettingsHost(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'set', config: gstConfig }),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Failed to save GStreamer settings')
    await queryClient.invalidateQueries({ queryKey: [GST_RUNTIME_QUERY_KEY] })
  }

  const handleSave = async () => {
    if (saving) return
    setSaving(true)
    try {
      if (isGstTab) {
        await saveGstConfig()
      } else {
        const sets = {
          ...settings,
          CacheSize: cacheSizeMb * 1024 * 1024,
          ReaderReadAHead: settings.ReaderReadAHead ?? defaultSettings.ReaderReadAHead,
          PreloadCache: settings.PreloadCache ?? defaultSettings.PreloadCache,
        }
        await axios.post(settingsHost(), { action: 'set', sets })
        notifySettingsChanged()
        await queryClient.invalidateQueries({ queryKey: ['settings'] })
      }
      toast?.showToast({ message: t('Saved', { defaultValue: 'Saved' }), severity: 'success' })
      onClose()
    } catch (e) {
      toast?.showToast({
        message: (e as Error).message || t('Error', { defaultValue: 'Error' }),
        severity: 'error',
      })
    } finally {
      setSaving(false)
    }
  }

  const footerButtonSx = isMobile ? { minHeight: 44, px: 2.5 } : undefined

  return (
    <AppDialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>{t('Settings')}</DialogTitle>
      <DialogContent>
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
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              {visibleTabs.map(item => (
                <Tab key={item.id} value={item.id} label={item.label} sx={isMobile ? { minHeight: 44 } : undefined} />
              ))}
            </Tabs>

            <TabPanel active={tab} tab='primary'>
              <Typography gutterBottom>
                {t('SettingsDialog.CacheSize', { defaultValue: 'Cache size' })}: {cacheSizeMb}{' '}
                {t('MB', { defaultValue: 'MB' })}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: { sm: 'center' } }}>
                <Slider
                  sx={{ flex: 1 }}
                  value={cacheSizeMb}
                  min={16}
                  max={2048}
                  step={16}
                  valueLabelDisplay='auto'
                  onChange={(_, v) => setCacheSizeMb(v as number)}
                />
                <TextField
                  type='number'
                  label={t('MB', { defaultValue: 'MB' })}
                  value={cacheSizeMb}
                  onChange={e => setCacheSizeMb(Math.max(16, Number(e.target.value) || 16))}
                  slotProps={{ htmlInput: { min: 16, step: 16 } }}
                  sx={{ width: { xs: '100%', sm: 120 } }}
                />
              </Stack>

              <Typography gutterBottom>
                {t('SettingsDialog.ReaderReadAHead', { defaultValue: 'Reader read-ahead' })}:{' '}
                {settings.ReaderReadAHead ?? 95}%
              </Typography>
              <Slider
                value={settings.ReaderReadAHead ?? 95}
                min={1}
                max={100}
                valueLabelDisplay='auto'
                onChange={(_, v) => updateSetting('ReaderReadAHead', v as number)}
                sx={{ mb: 2 }}
              />

              <Typography gutterBottom>
                {t('SettingsDialog.PreloadCache', { defaultValue: 'Preload cache' })}: {settings.PreloadCache ?? 50}%
              </Typography>
              <Slider
                value={settings.PreloadCache ?? 50}
                min={0}
                max={100}
                valueLabelDisplay='auto'
                onChange={(_, v) => updateSetting('PreloadCache', v as number)}
                sx={{ mb: 2 }}
              />

              <SettingSwitch
                id='UseDisk'
                label={t('SettingsDialog.UseDisk', { defaultValue: 'Use disk cache' })}
                helper={t('SettingsDialog.UseDiskDesc', { defaultValue: 'Store cache on disk instead of RAM' })}
                checked={Boolean(settings.UseDisk)}
                onChange={handleBoolSwitch}
              />

              <TextField
                fullWidth
                margin='normal'
                label={t('SettingsDialog.TorrentsSavePath', { defaultValue: 'Torrents save path' })}
                value={settings.TorrentsSavePath || ''}
                onChange={e => updateSetting('TorrentsSavePath', e.target.value)}
              />

              <SettingSwitch
                id='RemoveCacheOnDrop'
                label={t('SettingsDialog.RemoveCacheOnDrop', { defaultValue: 'Remove cache on drop' })}
                checked={Boolean(settings.RemoveCacheOnDrop)}
                onChange={handleBoolSwitch}
              />
            </TabPanel>

            <TabPanel active={tab} tab='network'>
              <SettingSwitch
                id='DisableTCP'
                label='TCP'
                checked={boolChecked('DisableTCP')}
                onChange={handleBoolSwitch}
              />
              <SettingSwitch
                id='DisableUTP'
                label='uTP'
                checked={boolChecked('DisableUTP')}
                onChange={handleBoolSwitch}
              />
              <SettingSwitch
                id='DisableUPNP'
                label='UPnP'
                checked={boolChecked('DisableUPNP')}
                onChange={handleBoolSwitch}
              />
              <SettingSwitch
                id='DisableDHT'
                label='DHT'
                checked={boolChecked('DisableDHT')}
                onChange={handleBoolSwitch}
              />
              <SettingSwitch
                id='DisablePEX'
                label='PEX'
                checked={boolChecked('DisablePEX')}
                onChange={handleBoolSwitch}
              />
              <SettingSwitch
                id='EnableIPv6'
                label='IPv6'
                checked={boolChecked('EnableIPv6')}
                onChange={handleBoolSwitch}
              />

              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  type='number'
                  label={t('SettingsDialog.PeersListenPort', { defaultValue: 'Peers listen port' })}
                  value={settings.PeersListenPort ?? 0}
                  onChange={e => updateSetting('PeersListenPort', Number(e.target.value))}
                  helperText={t('SettingsDialog.PeersListenPortHint', { defaultValue: '0 = automatic' })}
                  fullWidth
                />
                <TextField
                  type='number'
                  label={t('SettingsDialog.ConnectionsLimit', { defaultValue: 'Connections limit' })}
                  value={settings.ConnectionsLimit ?? 25}
                  onChange={e => updateSetting('ConnectionsLimit', Number(e.target.value))}
                  fullWidth
                />
                <TextField
                  type='number'
                  label={t('SettingsDialog.DownloadRateLimit', { defaultValue: 'Download rate limit (KB/s)' })}
                  value={settings.DownloadRateLimit ?? 0}
                  onChange={e => updateSetting('DownloadRateLimit', Number(e.target.value))}
                  helperText={t('SettingsDialog.RateLimitHint', { defaultValue: '0 = unlimited' })}
                  fullWidth
                />
                <TextField
                  type='number'
                  label={t('SettingsDialog.UploadRateLimit', { defaultValue: 'Upload rate limit (KB/s)' })}
                  value={settings.UploadRateLimit ?? 0}
                  onChange={e => updateSetting('UploadRateLimit', Number(e.target.value))}
                  helperText={t('SettingsDialog.RateLimitHint', { defaultValue: '0 = unlimited' })}
                  fullWidth
                />
              </Stack>
            </TabPanel>

            <TabPanel active={tab} tab='features'>
              <SettingSwitch
                id='EnableDLNA'
                label={t('EnableDLNA', { defaultValue: 'Enable DLNA' })}
                checked={boolChecked('EnableDLNA')}
                onChange={handleBoolSwitch}
              />
              <SettingSwitch
                id='EnableBonjour'
                label={t('EnableBonjour', { defaultValue: 'Enable Bonjour' })}
                checked={boolChecked('EnableBonjour')}
                onChange={handleBoolSwitch}
              />
              <TextField
                fullWidth
                margin='normal'
                label={t('SettingsDialog.FriendlyName', { defaultValue: 'Friendly name' })}
                value={settings.FriendlyName || ''}
                onChange={e => updateSetting('FriendlyName', e.target.value)}
              />
              <SettingSwitch
                id='EnableRutorSearch'
                label={t('SettingsDialog.EnableRutorSearch', { defaultValue: 'Enable Rutor search' })}
                checked={boolChecked('EnableRutorSearch')}
                onChange={handleBoolSwitch}
              />
              <SettingSwitch
                id='EnableTorznabSearch'
                label={t('Torznab.EnableTorznabSearch', { defaultValue: 'Enable Torznab search' })}
                checked={boolChecked('EnableTorznabSearch')}
                onChange={handleBoolSwitch}
              />
              <SettingSwitch
                id='EnableDebug'
                label={t('EnableDebug', { defaultValue: 'Enable debug' })}
                checked={boolChecked('EnableDebug')}
                onChange={handleBoolSwitch}
              />
              <SettingSwitch
                id='ResponsiveMode'
                label={t('SettingsDialog.ResponsiveMode', { defaultValue: 'Responsive mode' })}
                checked={boolChecked('ResponsiveMode')}
                onChange={handleBoolSwitch}
              />
            </TabPanel>

            <TabPanel active={tab} tab='storage'>
              <SettingSwitch
                id='StoreSettingsInJson'
                label={t('SettingsDialog.StoreSettingsInJson', { defaultValue: 'Store settings in JSON' })}
                helper={t('SettingsDialog.StoreSettingsInJsonHint', {
                  defaultValue: 'Persist server settings as JSON on disk',
                })}
                checked={Boolean(settings.StoreSettingsInJson ?? defaultSettings.StoreSettingsInJson)}
                onChange={handleBoolSwitch}
              />
            </TabPanel>

            {gstAvailable ? (
              <TabPanel active={tab} tab='gstreamer'>
                <Alert severity='success' sx={{ mb: 2 }}>
                  {t('GStreamer.RuntimeAvailable', { defaultValue: 'GStreamer runtime is available' })}
                </Alert>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(gstConfig.TranscodeAVI)}
                      onChange={e => setGstConfig(prev => ({ ...prev, TranscodeAVI: e.target.checked }))}
                      sx={touchTargetSx}
                    />
                  }
                  label={t('GStreamer.TranscodeAVI', { defaultValue: 'Transcode AVI' })}
                  labelPlacement='start'
                  sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0, mb: 1 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(gstConfig.TranscodeH264)}
                      onChange={e => setGstConfig(prev => ({ ...prev, TranscodeH264: e.target.checked }))}
                      sx={touchTargetSx}
                    />
                  }
                  label={t('GStreamer.TranscodeH264', { defaultValue: 'Transcode H.264' })}
                  labelPlacement='start'
                  sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0, mb: 1 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(gstConfig.TranscodeH265)}
                      onChange={e => setGstConfig(prev => ({ ...prev, TranscodeH265: e.target.checked }))}
                      sx={touchTargetSx}
                    />
                  }
                  label={t('GStreamer.TranscodeH265', { defaultValue: 'Transcode H.265' })}
                  labelPlacement='start'
                  sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0, mb: 1 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(gstConfig.HardwareAcceleration ?? gstDefaults.HardwareAcceleration)}
                      onChange={e => setGstConfig(prev => ({ ...prev, HardwareAcceleration: e.target.checked }))}
                      sx={touchTargetSx}
                    />
                  }
                  label={t('GStreamer.HardwareAcceleration', { defaultValue: 'Hardware acceleration' })}
                  labelPlacement='start'
                  sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0, mb: 1 }}
                />
              </TabPanel>
            ) : null}

            <TabPanel active={tab} tab='torznab'>
              <List dense sx={{ mb: 2 }}>
                {(settings.TorznabUrls || []).map((url, index) => (
                  <ListItem
                    key={`${url.Host}-${url.Key}-${index}`}
                    secondaryAction={
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleRemoveTorznab(index)}
                        sx={touchTargetSx}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{ px: 0 }}
                  >
                    <ListItemText
                      primary={url.Name || url.Host}
                      secondary={`${url.Host} · Key: ${url.Key.slice(0, 5)}…`}
                    />
                  </ListItem>
                ))}
              </List>

              <Stack spacing={2}>
                <TextField
                  label={t('Torznab.NameOptional', { defaultValue: 'Name (optional)' })}
                  value={newTorznabName}
                  onChange={e => setNewTorznabName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label={t('Torznab.TorznabHostURL', { defaultValue: 'Torznab host URL' })}
                  value={newTorznabHost}
                  onChange={e => setNewTorznabHost(e.target.value)}
                  fullWidth
                />
                <TextField
                  label={t('Torznab.APIKey', { defaultValue: 'API key' })}
                  value={newTorznabKey}
                  onChange={e => setNewTorznabKey(e.target.value)}
                  fullWidth
                />
                {torznabTestMsg ? (
                  <Typography variant='body2' color={torznabTestMsg.ok ? 'success.main' : 'error.main'}>
                    {torznabTestMsg.text}
                  </Typography>
                ) : null}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <Button
                    variant='outlined'
                    onClick={() => void handleTestTorznab()}
                    disabled={!newTorznabHost || !newTorznabKey || torznabTesting}
                    sx={footerButtonSx}
                  >
                    {torznabTesting ? <CircularProgress size={20} /> : t('Torznab.Test', { defaultValue: 'Test' })}
                  </Button>
                  <Button
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={handleAddTorznab}
                    disabled={!newTorznabHost || !newTorznabKey}
                    sx={footerButtonSx}
                  >
                    {t('Torznab.AddServer', { defaultValue: 'Add server' })}
                  </Button>
                </Stack>
              </Stack>
            </TabPanel>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={saving} sx={footerButtonSx} autoFocus>
          {t('Cancel')}
        </Button>
        <Button variant='contained' onClick={() => void handleSave()} disabled={loading || saving} sx={footerButtonSx}>
          {saving ? <CircularProgress size={20} color='inherit' /> : t('Save', { defaultValue: 'Save' })}
        </Button>
      </DialogActions>
    </AppDialog>
  )
}

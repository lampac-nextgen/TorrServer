import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useMemo, useState } from 'react'
import { getAppBasePath } from 'utils/publicUrl'
import { buttonLoadingIcon } from 'utils/buttonLoading'

import { SecondarySettingsContent, SettingSectionLabel } from './style'
import type { BTSets, SettingsInputHandler } from 'types/api'

interface SecondarySettingsProps {
  settings?: BTSets
  inputForm: SettingsInputHandler
  updateSettings?: import('types/api').SettingsUpdater
}

export default function SecondarySettingsComponent({ settings, inputForm }: SecondarySettingsProps) {
  const { t } = useTranslation()
  const [storageSettings, setStorageSettings] = useState({
    settings: 'json',
    viewed: 'bbolt',
  })
  const [storageStatus, setStorageStatus] = useState({ message: '', type: '' })
  const [loading, setLoading] = useState(false)
  const {
    RetrackersMode,
    TorrentDisconnectTimeout,
    EnableDebug,
    EnableDLNA,
    EnableBonjour,
    EnableIPv6,
    FriendlyName,
    ForceEncrypt,
    DisableTCP,
    DisableUTP,
    DisableUPNP,
    DisableDHT,
    DisablePEX,
    DisableUpload,
    EnableLPD,
    LPDIPv6,
    DownloadRateLimit,
    UploadRateLimit,
    ConnectionsLimit,
    PeersListenPort,
    ResponsiveMode,
    SslPort,
    SslCert,
    SslKey,
    ShowFSActiveTorr,
  } = settings || {}

  // Prefer Vite BASE_URL over fragile pathname splitting
  const basePath = useMemo(() => getAppBasePath().replace(/^\//, ''), [])

  // Helper function to build API URL
  const getApiUrl = useMemo(
    () => (endpoint: string) => {
      const prefix = basePath ? `/${basePath}` : ''
      return `${prefix}${endpoint}`
    },
    [basePath],
  )

  useEffect(() => {
    const loadStorageSettings = async () => {
      try {
        const response = await fetch(getApiUrl('/storage/settings')) // /api/storage/settings
        if (response.ok) {
          const prefs = await response.json()
          setStorageSettings(prefs)
        }
      } catch {
        // ignore storage settings load failures
      }
    }
    loadStorageSettings()
  }, [getApiUrl])

  // Handle storage settings change
  const handleStorageChange = (event: { target: { name?: string; value?: unknown } }) => {
    const { name, value } = event.target
    if (!name) return
    setStorageSettings(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  // Save storage settings - add better error handling
  const saveStorageSettings = async () => {
    setLoading(true)
    setStorageStatus({ message: t('SettingsDialog.Saving'), type: 'info' })

    try {
      const response = await fetch(getApiUrl('/storage/settings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storageSettings),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save settings')
      }

      if (result.status === 'ok') {
        setStorageStatus({
          message: t('SettingsDialog.StorageSettingsSaved'),
          type: 'success',
        })
      } else {
        setStorageStatus({
          message: t('SettingsDialog.SaveError') + (result.error || 'Unknown error'),
          type: 'error',
        })
      }
    } catch (error) {
      setStorageStatus({
        message: t('SettingsDialog.SaveError') + (error as Error).message,
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SecondarySettingsContent>
      <SettingSectionLabel>{t('SettingsDialog.AdditionalSettings')}</SettingSectionLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={EnableIPv6} onChange={inputForm} id='EnableIPv6' color='secondary' />}
          label='IPv6'
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.EnableIPv6Hint')}</FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={!DisableTCP} onChange={inputForm} id='DisableTCP' color='secondary' />}
          label='TCP (Transmission Control Protocol)'
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.DisableTCPHint')}</FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={!DisableUTP} onChange={inputForm} id='DisableUTP' color='secondary' />}
          label='μTP (Micro Transport Protocol)'
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.DisableUTPHint')}</FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={!DisablePEX} onChange={inputForm} id='DisablePEX' color='secondary' />}
          label='PEX (Peer Exchange)'
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.DisablePEXHint')}</FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={ForceEncrypt} onChange={inputForm} id='ForceEncrypt' color='secondary' />}
          label={t('SettingsDialog.ForceEncrypt')}
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.ForceEncryptHint')}</FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={EnableLPD} onChange={inputForm} id='EnableLPD' color='secondary' />}
          label='LPD (Local Peer Discovery)'
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.EnableLPDHint')}</FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={LPDIPv6} onChange={inputForm} id='LPDIPv6' color='secondary' disabled={!EnableLPD} />
          }
          label='LPD IPv6'
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.EnableLPDIPv6Hint')}</FormHelperText>
      </FormGroup>
      <TextField
        onChange={inputForm}
        margin='normal'
        id='TorrentDisconnectTimeout'
        label={t('SettingsDialog.TorrentDisconnectTimeout')}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position='end'>{t('Seconds')}</InputAdornment>,
          },
        }}
        value={TorrentDisconnectTimeout}
        type='number'
        variant='outlined'
        fullWidth
      />
      <br />
      <TextField
        onChange={inputForm}
        margin='normal'
        id='ConnectionsLimit'
        label={t('SettingsDialog.ConnectionsLimit')}
        helperText={t('SettingsDialog.ConnectionsLimitHint')}
        value={ConnectionsLimit}
        type='number'
        variant='outlined'
        fullWidth
      />
      <br />
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={!DisableDHT} onChange={inputForm} id='DisableDHT' color='secondary' />}
          label={t('SettingsDialog.DHT')}
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.DisableDHTHint')}</FormHelperText>
      </FormGroup>
      <TextField
        onChange={inputForm}
        margin='normal'
        id='DownloadRateLimit'
        label={t('SettingsDialog.DownloadRateLimit')}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position='end'>{t('Kilobytes')}</InputAdornment>,
          },
        }}
        value={DownloadRateLimit}
        type='number'
        variant='outlined'
        fullWidth
      />
      <br />
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={!DisableUpload} onChange={inputForm} id='DisableUpload' color='secondary' />}
          label={t('SettingsDialog.Upload')}
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.UploadHint')}</FormHelperText>
      </FormGroup>
      <TextField
        onChange={inputForm}
        margin='normal'
        id='UploadRateLimit'
        label={t('SettingsDialog.UploadRateLimit')}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position='end'>{t('Kilobytes')}</InputAdornment>,
          },
        }}
        value={UploadRateLimit}
        type='number'
        variant='outlined'
        fullWidth
      />
      <br />
      <TextField
        onChange={inputForm}
        margin='normal'
        id='PeersListenPort'
        label={t('SettingsDialog.PeersListenPort')}
        helperText={t('SettingsDialog.PeersListenPortHint')}
        value={PeersListenPort}
        type='number'
        variant='outlined'
        fullWidth
      />
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={!DisableUPNP} onChange={inputForm} id='DisableUPNP' color='secondary' />}
          label='UPnP (Universal Plug and Play)'
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.DisableUPNPHint')}</FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={EnableDebug} onChange={inputForm} id='EnableDebug' color='secondary' />}
          label={t('SettingsDialog.EnableDebug')}
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.EnableDebugHint')}</FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={ResponsiveMode} onChange={inputForm} id='ResponsiveMode' color='secondary' />}
          label={t('SettingsDialog.ResponsiveMode')}
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.ResponsiveModeHint')}</FormHelperText>
      </FormGroup>
      <br />
      <FormGroup style={{ marginBottom: '20px' }}>
        <InputLabel htmlFor='RetrackersMode'>{t('SettingsDialog.RetrackersMode')}</InputLabel>
        <Select
          native
          type='number'
          id='RetrackersMode'
          name='RetrackersMode'
          value={RetrackersMode == null ? '' : String(RetrackersMode)}
          onChange={inputForm}
          variant='outlined'
          margin='dense'
        >
          <option value={0}>{t('SettingsDialog.DontAddRetrackers')}</option>
          <option value={1}>{t('SettingsDialog.AddRetrackers')}</option>
          <option value={2}>{t('SettingsDialog.RemoveRetrackers')}</option>
          <option value={3}>{t('SettingsDialog.ReplaceRetrackers')}</option>
        </Select>
        <FormHelperText style={{ marginTop: '8px' }}>{t('SettingsDialog.RetrackersModeHint')}</FormHelperText>
      </FormGroup>
      <SettingSectionLabel style={{ marginTop: '20px' }}>{t('DLNA')}</SettingSectionLabel>
      <FormControlLabel
        control={<Switch checked={EnableDLNA} onChange={inputForm} id='EnableDLNA' color='secondary' />}
        label={t('SettingsDialog.DLNA')}
        labelPlacement='start'
      />
      <FormControlLabel
        control={<Switch checked={EnableBonjour} onChange={inputForm} id='EnableBonjour' color='secondary' />}
        label={t('SettingsDialog.Bonjour')}
        labelPlacement='start'
      />
      <FormHelperText style={{ marginLeft: 0, marginTop: '-4px', marginBottom: '8px' }}>
        {t('SettingsDialog.BonjourHint')}
      </FormHelperText>
      <TextField
        onChange={inputForm}
        margin='normal'
        id='FriendlyName'
        label={t('SettingsDialog.FriendlyName')}
        helperText={t('SettingsDialog.FriendlyNameHint')}
        value={FriendlyName}
        type='text'
        variant='outlined'
        fullWidth
      />
      {/* HTTPS Section */}
      <SettingSectionLabel style={{ marginTop: '20px' }}>{t('HTTPS')}</SettingSectionLabel>
      <TextField
        onChange={inputForm}
        margin='normal'
        id='SslPort'
        label={t('SettingsDialog.SslPort')}
        helperText={t('SettingsDialog.SslPortHint')}
        value={SslPort}
        type='number'
        variant='outlined'
        fullWidth
      />
      <br />
      <TextField
        onChange={inputForm}
        margin='normal'
        id='SslCert'
        label={t('SettingsDialog.SslCert')}
        helperText={t('SettingsDialog.SslCertHint')}
        value={SslCert}
        type='url'
        variant='outlined'
        fullWidth
      />
      <br />
      <TextField
        onChange={inputForm}
        margin='normal'
        id='SslKey'
        label={t('SettingsDialog.SslKey')}
        helperText={t('SettingsDialog.SslKeyHint')}
        value={SslKey}
        type='url'
        variant='outlined'
        fullWidth
      />
      <br />
      {/* TorrFS */}
      <SettingSectionLabel style={{ marginTop: '20px' }}>{t('TorrFS')}</SettingSectionLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={ShowFSActiveTorr} onChange={inputForm} id='ShowFSActiveTorr' color='secondary' />}
          label={t('SettingsDialog.ShowFSActiveTorr')}
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.ShowFSActiveTorrHint')}</FormHelperText>
      </FormGroup>
      {/* Storage Settings Section */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <SettingSectionLabel>{t('SettingsDialog.StorageConfiguration')}</SettingSectionLabel>

        <FormGroup>
          <InputLabel htmlFor='settings'>{t('SettingsDialog.SettingsStorage')}</InputLabel>
          <Select
            id='settings'
            name='settings'
            value={storageSettings.settings || 'json'}
            onChange={handleStorageChange}
            variant='outlined'
            margin='dense'
          >
            <MenuItem value='json'>{t('SettingsDialog.JsonFile')} (settings.json)</MenuItem>
            <MenuItem value='bbolt'>{t('SettingsDialog.BBoltDatabase')} (config.db)</MenuItem>
          </Select>
          <FormHelperText style={{ marginTop: '8px' }}>{t('SettingsDialog.SettingsStorageHint')}</FormHelperText>
        </FormGroup>

        <FormGroup style={{ marginTop: '16px' }}>
          <InputLabel htmlFor='viewed'>{t('SettingsDialog.ViewedHistoryStorage')}</InputLabel>
          <Select
            id='viewed'
            name='viewed'
            value={storageSettings.viewed || 'bbolt'}
            onChange={handleStorageChange}
            variant='outlined'
            margin='dense'
          >
            <MenuItem value='bbolt'>{t('SettingsDialog.BBoltDatabase')} (config.db)</MenuItem>
            <MenuItem value='json'>{t('SettingsDialog.JsonFile')} (viewed.json)</MenuItem>
          </Select>
          <FormHelperText style={{ marginTop: '8px' }}>{t('SettingsDialog.ViewedStorageHint')}</FormHelperText>
        </FormGroup>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={saveStorageSettings}
            disabled={loading}
            startIcon={buttonLoadingIcon(loading)}
          >
            {t('SettingsDialog.SaveStorageSettings')}
          </Button>
        </Box>

        {storageStatus.message && (
          <Alert
            severity={
              storageStatus.type === 'error'
                ? 'error'
                : storageStatus.type === 'success'
                  ? 'success'
                  : storageStatus.type === 'info'
                    ? 'info'
                    : 'warning'
            }
            sx={{ mt: 1 }}
            action={
              <IconButton
                aria-label={t('Close')}
                onClick={() => setStorageStatus({ message: '', type: '' })}
                size='small'
                color='inherit'
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            }
          >
            {storageStatus.message}
          </Alert>
        )}
      </Box>
    </SecondarySettingsContent>
  )
}

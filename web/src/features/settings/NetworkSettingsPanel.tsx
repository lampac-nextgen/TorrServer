import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import type { BTSets } from 'shared/api/types'

import { SettingSwitch } from './SettingSwitch'

export interface NetworkSettingsPanelProps {
  settings: BTSets
  boolChecked: (key: keyof BTSets) => boolean
  onUpdate: <K extends keyof BTSets>(key: K, value: BTSets[K]) => void
  onBoolSwitch: (id: string, checked: boolean) => void
}

export default function NetworkSettingsPanel({
  settings,
  boolChecked,
  onUpdate,
  onBoolSwitch,
}: NetworkSettingsPanelProps) {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant='overline' color='text.secondary' sx={{ display: 'block', mb: 1 }}>
        {t('SettingsDialog.ProMode')}
      </Typography>

      <SettingSwitch
        id='DisableTCP'
        label='TCP'
        helper={t('SettingsDialog.DisableTCPHint')}
        checked={boolChecked('DisableTCP')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='DisableUTP'
        label='μTP'
        helper={t('SettingsDialog.DisableUTPHint')}
        checked={boolChecked('DisableUTP')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='DisableUPNP'
        label='UPnP'
        helper={t('SettingsDialog.DisableUPNPHint')}
        checked={boolChecked('DisableUPNP')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='DisableDHT'
        label={t('SettingsDialog.DHT')}
        helper={t('SettingsDialog.DisableDHTHint')}
        checked={boolChecked('DisableDHT')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='DisablePEX'
        label='PEX'
        helper={t('SettingsDialog.DisablePEXHint')}
        checked={boolChecked('DisablePEX')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='EnableIPv6'
        label='IPv6'
        helper={t('SettingsDialog.EnableIPv6Hint')}
        checked={boolChecked('EnableIPv6')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='EnableLPD'
        label='LPD'
        helper={t('SettingsDialog.EnableLPDHint')}
        checked={boolChecked('EnableLPD')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='LPDIPv6'
        label='LPD IPv6'
        helper={t('SettingsDialog.EnableLPDIPv6Hint')}
        checked={boolChecked('LPDIPv6')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='DisableUpload'
        label={t('SettingsDialog.Upload')}
        helper={t('SettingsDialog.UploadHint')}
        checked={boolChecked('DisableUpload')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='ForceEncrypt'
        label={t('SettingsDialog.ForceEncrypt')}
        helper={t('SettingsDialog.ForceEncryptHint')}
        checked={boolChecked('ForceEncrypt')}
        onChange={onBoolSwitch}
      />

      <FormControl fullWidth margin='normal'>
        <InputLabel id='retrackers-mode'>{t('SettingsDialog.RetrackersMode')}</InputLabel>
        <Select
          labelId='retrackers-mode'
          label={t('SettingsDialog.RetrackersMode')}
          value={settings.RetrackersMode == null ? '1' : String(settings.RetrackersMode)}
          onChange={e => onUpdate('RetrackersMode', Number(e.target.value))}
        >
          <MenuItem value='0'>{t('SettingsDialog.DontAddRetrackers')}</MenuItem>
          <MenuItem value='1'>{t('SettingsDialog.AddRetrackers')}</MenuItem>
          <MenuItem value='2'>{t('SettingsDialog.RemoveRetrackers')}</MenuItem>
          <MenuItem value='3'>{t('SettingsDialog.ReplaceRetrackers')}</MenuItem>
        </Select>
        <FormHelperText>{t('SettingsDialog.RetrackersModeHint')}</FormHelperText>
      </FormControl>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          type='number'
          label={t('SettingsDialog.PeersListenPort')}
          value={settings.PeersListenPort ?? 0}
          onChange={e => onUpdate('PeersListenPort', Number(e.target.value))}
          helperText={t('SettingsDialog.PeersListenPortHint')}
          fullWidth
        />
        <TextField
          type='number'
          label={t('SettingsDialog.ConnectionsLimit')}
          value={settings.ConnectionsLimit ?? 25}
          onChange={e => onUpdate('ConnectionsLimit', Number(e.target.value))}
          helperText={t('SettingsDialog.ConnectionsLimitHint')}
          fullWidth
        />
        <TextField
          type='number'
          label={t('SettingsDialog.DownloadRateLimit')}
          value={settings.DownloadRateLimit ?? 0}
          onChange={e => onUpdate('DownloadRateLimit', Number(e.target.value))}
          helperText={t('SettingsDialog.RateLimitHint')}
          fullWidth
        />
        <TextField
          type='number'
          label={t('SettingsDialog.UploadRateLimit')}
          value={settings.UploadRateLimit ?? 0}
          onChange={e => onUpdate('UploadRateLimit', Number(e.target.value))}
          helperText={t('SettingsDialog.RateLimitHint')}
          fullWidth
        />
        <TextField
          type='number'
          label={t('SettingsDialog.TorrentDisconnectTimeout')}
          value={settings.TorrentDisconnectTimeout ?? 30}
          onChange={e => onUpdate('TorrentDisconnectTimeout', Number(e.target.value))}
          helperText={t('Seconds')}
          fullWidth
        />
        <TextField
          type='number'
          label={t('SettingsDialog.SslPort')}
          value={settings.SslPort ?? 0}
          onChange={e => onUpdate('SslPort', Number(e.target.value))}
          helperText={t('SettingsDialog.SslPortHint')}
          fullWidth
        />
        <TextField
          label={t('SettingsDialog.SslCert')}
          value={settings.SslCert || ''}
          onChange={e => onUpdate('SslCert', e.target.value)}
          helperText={t('SettingsDialog.SslCertHint')}
          fullWidth
        />
        <TextField
          label={t('SettingsDialog.SslKey')}
          value={settings.SslKey || ''}
          onChange={e => onUpdate('SslKey', e.target.value)}
          helperText={t('SettingsDialog.SslKeyHint')}
          fullWidth
        />
      </Stack>
    </>
  )
}

import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import type { BTSets } from 'shared/api/types'
import type { StorageBackend, StorageSettings } from 'shared/api/storage'
import defaultSettings from 'shared/settings/defaults'

import { SettingSwitch } from './SettingSwitch'

export interface StorageSettingsPanelProps {
  settings: BTSets
  onBoolSwitch: (id: string, checked: boolean) => void
  backends: StorageSettings
  onBackendsChange: (next: StorageSettings) => void
}

export default function StorageSettingsPanel({
  settings,
  onBoolSwitch,
  backends,
  onBackendsChange,
}: StorageSettingsPanelProps) {
  const { t } = useTranslation()

  const updateBackend = (key: keyof StorageSettings, value: StorageBackend) => {
    onBackendsChange({ ...backends, [key]: value })
  }

  return (
    <Stack spacing={2}>
      <SettingSwitch
        id='StoreSettingsInJson'
        label={t('SettingsDialog.StoreSettingsInJson')}
        helper={t('SettingsDialog.SettingsStorageHint')}
        checked={Boolean(settings.StoreSettingsInJson ?? defaultSettings.StoreSettingsInJson)}
        onChange={onBoolSwitch}
      />

      <Divider />

      <Typography variant='overline' color='text.secondary'>
        {t('SettingsDialog.StorageSettings')}
      </Typography>
      <FormHelperText sx={{ mt: 0 }}>{t('SettingsDialog.SettingsStorageHint')}</FormHelperText>

      <FormControl fullWidth>
        <InputLabel id='storage-settings-backend'>{t('SettingsDialog.SettingsStorage')}</InputLabel>
        <Select
          labelId='storage-settings-backend'
          label={t('SettingsDialog.SettingsStorage')}
          value={backends.settings}
          onChange={e => updateBackend('settings', e.target.value as StorageBackend)}
        >
          <MenuItem value='json'>{t('SettingsDialog.JsonFile')} (settings.json)</MenuItem>
          <MenuItem value='bbolt'>{t('SettingsDialog.BBoltDatabase')} (config.db)</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='storage-viewed-backend'>{t('SettingsDialog.ViewedHistoryStorage')}</InputLabel>
        <Select
          labelId='storage-viewed-backend'
          label={t('SettingsDialog.ViewedHistoryStorage')}
          value={backends.viewed}
          onChange={e => updateBackend('viewed', e.target.value as StorageBackend)}
        >
          <MenuItem value='bbolt'>{t('SettingsDialog.BBoltDatabase')} (config.db)</MenuItem>
          <MenuItem value='json'>{t('SettingsDialog.JsonFile')} (viewed.json)</MenuItem>
        </Select>
      </FormControl>

      <Alert severity='info' variant='outlined'>
        {t('SettingsDialog.StorageSettingsApplyHint', {
          defaultValue: 'Backend changes apply after Save. Restart may be required for some migrations.',
        })}
      </Alert>
    </Stack>
  )
}

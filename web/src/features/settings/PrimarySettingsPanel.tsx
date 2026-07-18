import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import type { BTSets } from 'shared/api/types'

import { SettingSwitch } from './SettingSwitch'

export interface PrimarySettingsPanelProps {
  settings: BTSets
  cacheSizeMb: number
  onCacheSizeMb: (mb: number) => void
  onUpdate: <K extends keyof BTSets>(key: K, value: BTSets[K]) => void
  onBoolSwitch: (id: string, checked: boolean) => void
}

export default function PrimarySettingsPanel({
  settings,
  cacheSizeMb,
  onCacheSizeMb,
  onUpdate,
  onBoolSwitch,
}: PrimarySettingsPanelProps) {
  const { t } = useTranslation()

  return (
    <>
      <Typography gutterBottom>
        {t('SettingsDialog.CacheSize')}: {cacheSizeMb} {t('MB')}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: { sm: 'center' } }}>
        <Slider
          sx={{ flex: 1 }}
          value={cacheSizeMb}
          min={16}
          max={2048}
          step={16}
          valueLabelDisplay='auto'
          onChange={(_, v) => onCacheSizeMb(v as number)}
        />
        <TextField
          type='number'
          label={t('MB')}
          value={cacheSizeMb}
          onChange={e => onCacheSizeMb(Math.max(16, Number(e.target.value) || 16))}
          slotProps={{ htmlInput: { min: 16, step: 16 } }}
          sx={{ width: { xs: '100%', sm: 120 } }}
        />
      </Stack>

      <Typography gutterBottom>
        {t('SettingsDialog.ReaderReadAHead')}: {settings.ReaderReadAHead ?? 95}%
      </Typography>
      <Slider
        value={settings.ReaderReadAHead ?? 95}
        min={1}
        max={100}
        valueLabelDisplay='auto'
        onChange={(_, v) => onUpdate('ReaderReadAHead', v as number)}
        sx={{ mb: 2 }}
      />

      <Typography gutterBottom>
        {t('SettingsDialog.PreloadCache')}: {settings.PreloadCache ?? 50}%
      </Typography>
      <Slider
        value={settings.PreloadCache ?? 50}
        min={0}
        max={100}
        valueLabelDisplay='auto'
        onChange={(_, v) => onUpdate('PreloadCache', v as number)}
        sx={{ mb: 2 }}
      />

      <SettingSwitch
        id='UseDisk'
        label={t('SettingsDialog.UseDisk')}
        helper={t('SettingsDialog.UseDiskDesc')}
        checked={Boolean(settings.UseDisk)}
        onChange={onBoolSwitch}
      />

      <TextField
        fullWidth
        margin='normal'
        label={t('SettingsDialog.TorrentsSavePath')}
        value={settings.TorrentsSavePath || ''}
        onChange={e => onUpdate('TorrentsSavePath', e.target.value)}
      />

      <SettingSwitch
        id='RemoveCacheOnDrop'
        label={t('SettingsDialog.RemoveCacheOnDrop')}
        helper={t('SettingsDialog.RemoveCacheOnDropDesc')}
        checked={Boolean(settings.RemoveCacheOnDrop)}
        onChange={onBoolSwitch}
      />
    </>
  )
}

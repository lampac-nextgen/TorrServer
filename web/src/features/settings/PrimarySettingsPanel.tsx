import { Description, Input, Label, Slider, TextField } from '@heroui/react'
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
    <div className='space-y-4'>
      <p>
        {t('SettingsDialog.CacheSize')}: {cacheSizeMb} {t('MB')}
      </p>
      <Slider
        value={cacheSizeMb}
        minValue={16}
        maxValue={2048}
        step={16}
        onChange={value => onCacheSizeMb(Number(value))}
      >
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
      <TextField value={String(cacheSizeMb)} onChange={value => onCacheSizeMb(Math.max(16, Number(value) || 16))}>
        <Label>{t('MB')}</Label>
        <Input type='number' min={16} step={16} className='max-w-[120px]' />
      </TextField>

      <p>
        {t('SettingsDialog.ReaderReadAHead')}: {settings.ReaderReadAHead ?? 95}%
      </p>
      <Slider
        value={settings.ReaderReadAHead ?? 95}
        minValue={1}
        maxValue={100}
        onChange={value => onUpdate('ReaderReadAHead', Number(value))}
      >
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>

      <p>
        {t('SettingsDialog.PreloadCache')}: {settings.PreloadCache ?? 50}%
      </p>
      <Slider
        value={settings.PreloadCache ?? 50}
        minValue={0}
        maxValue={100}
        onChange={value => onUpdate('PreloadCache', Number(value))}
      >
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>

      <div className='divide-y divide-default-200'>
        <SettingSwitch
          id='UseDisk'
          label={t('SettingsDialog.UseDisk')}
          helper={t('SettingsDialog.UseDiskDesc')}
          checked={Boolean(settings.UseDisk)}
          onChange={onBoolSwitch}
        />
        <TextField
          value={settings.TorrentsSavePath || ''}
          onChange={value => onUpdate('TorrentsSavePath', value)}
          className='py-3'
        >
          <Label>{t('SettingsDialog.TorrentsSavePath')}</Label>
          <Input />
        </TextField>
        <SettingSwitch
          id='RemoveCacheOnDrop'
          label={t('SettingsDialog.RemoveCacheOnDrop')}
          helper={t('SettingsDialog.RemoveCacheOnDropDesc')}
          checked={Boolean(settings.RemoveCacheOnDrop)}
          onChange={onBoolSwitch}
        />
      </div>
    </div>
  )
}

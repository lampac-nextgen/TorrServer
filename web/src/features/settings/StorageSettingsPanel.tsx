import { Alert, Description, Label, ListBox, Select, Separator } from '@heroui/react'
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
    <div className='space-y-4'>
      <SettingSwitch
        id='StoreSettingsInJson'
        label={t('SettingsDialog.StoreSettingsInJson')}
        helper={t('SettingsDialog.SettingsStorageHint')}
        checked={Boolean(settings.StoreSettingsInJson ?? defaultSettings.StoreSettingsInJson)}
        onChange={onBoolSwitch}
      />

      <Separator />

      <p className='text-xs uppercase tracking-wide text-default-500'>{t('SettingsDialog.StorageSettings')}</p>
      <Description>{t('SettingsDialog.SettingsStorageHint')}</Description>

      <Select selectedKey={backends.settings} onSelectionChange={key => updateBackend('settings', String(key) as StorageBackend)}>
        <Label>{t('SettingsDialog.SettingsStorage')}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id='json'>{t('SettingsDialog.JsonFile')} (settings.json)</ListBox.Item>
            <ListBox.Item id='bbolt'>{t('SettingsDialog.BBoltDatabase')} (config.db)</ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <Select selectedKey={backends.viewed} onSelectionChange={key => updateBackend('viewed', String(key) as StorageBackend)}>
        <Label>{t('SettingsDialog.ViewedHistoryStorage')}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id='bbolt'>{t('SettingsDialog.BBoltDatabase')} (config.db)</ListBox.Item>
            <ListBox.Item id='json'>{t('SettingsDialog.JsonFile')} (viewed.json)</ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <Alert status='accent'>
        <Alert.Description>
          {t('SettingsDialog.StorageSettingsApplyHint', {
            defaultValue: 'Backend changes apply after Save. Restart may be required for some migrations.',
          })}
        </Alert.Description>
      </Alert>
    </div>
  )
}

import { useTranslation } from 'react-i18next'
import type { BTSets } from 'shared/api/types'
import defaultSettings from 'shared/settings/defaults'

import { SettingSwitch } from './SettingSwitch'

export interface StorageSettingsPanelProps {
  settings: BTSets
  onBoolSwitch: (id: string, checked: boolean) => void
}

export default function StorageSettingsPanel({ settings, onBoolSwitch }: StorageSettingsPanelProps) {
  const { t } = useTranslation()

  return (
    <SettingSwitch
      id='StoreSettingsInJson'
      label={t('SettingsDialog.StoreSettingsInJson')}
      helper={t('SettingsDialog.SettingsStorageHint')}
      checked={Boolean(settings.StoreSettingsInJson ?? defaultSettings.StoreSettingsInJson)}
      onChange={onBoolSwitch}
    />
  )
}

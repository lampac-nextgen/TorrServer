import { Description, Input, Label, TextField } from '@heroui/react'
import { useTranslation } from 'react-i18next'

import type { BTSets } from 'shared/api/types'

import { SettingSwitch } from './SettingSwitch'

export interface FeaturesSettingsPanelProps {
  settings: BTSets
  boolChecked: (key: keyof BTSets) => boolean
  onUpdate: <K extends keyof BTSets>(key: K, value: BTSets[K]) => void
  onBoolSwitch: (id: string, checked: boolean) => void
}

/** DLNA/Bonjour discovery, friendly server name, search sources, and misc feature toggles. */
export default function FeaturesSettingsPanel({
  settings,
  boolChecked,
  onUpdate,
  onBoolSwitch,
}: FeaturesSettingsPanelProps) {
  const { t } = useTranslation()

  return (
    <div className='divide-y divide-separator border-y border-separator'>
      <SettingSwitch
        id='EnableDLNA'
        label={t('SettingsDialog.DLNA')}
        checked={boolChecked('EnableDLNA')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='EnableBonjour'
        label={t('SettingsDialog.Bonjour')}
        helper={t('SettingsDialog.BonjourHint')}
        checked={boolChecked('EnableBonjour')}
        onChange={onBoolSwitch}
      />
      <TextField
        value={settings.FriendlyName || ''}
        onChange={value => onUpdate('FriendlyName', value)}
        className='py-3'
      >
        <Label>{t('SettingsDialog.FriendlyName')}</Label>
        <Input />
        <Description>{t('SettingsDialog.FriendlyNameHint')}</Description>
      </TextField>
      <SettingSwitch
        id='EnableRutorSearch'
        label={t('SettingsDialog.EnableRutorSearch')}
        helper={t('SettingsDialog.EnableRutorSearchHint')}
        checked={boolChecked('EnableRutorSearch')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='EnableTorznabSearch'
        label={t('Torznab.EnableTorznabSearch')}
        checked={boolChecked('EnableTorznabSearch')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='EnableDebug'
        label={t('SettingsDialog.EnableDebug')}
        helper={t('SettingsDialog.EnableDebugHint')}
        checked={boolChecked('EnableDebug')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='ResponsiveMode'
        label={t('SettingsDialog.ResponsiveMode')}
        helper={t('SettingsDialog.ResponsiveModeHint')}
        checked={boolChecked('ResponsiveMode')}
        onChange={onBoolSwitch}
      />
      <SettingSwitch
        id='ShowFSActiveTorr'
        label={t('SettingsDialog.ShowFSActiveTorr')}
        helper={t('SettingsDialog.ShowFSActiveTorrHint')}
        checked={boolChecked('ShowFSActiveTorr')}
        onChange={onBoolSwitch}
      />
    </div>
  )
}

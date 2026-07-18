import { Description, Input, Label, ListBox, Select, TextField } from '@heroui/react'
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
      <p className='mb-2 text-xs uppercase tracking-wide text-default-500'>{t('SettingsDialog.ProMode')}</p>

      <div className='divide-y divide-default-200'>
        <SettingSwitch id='DisableTCP' label='TCP' helper={t('SettingsDialog.DisableTCPHint')} checked={boolChecked('DisableTCP')} onChange={onBoolSwitch} />
        <SettingSwitch id='DisableUTP' label='μTP' helper={t('SettingsDialog.DisableUTPHint')} checked={boolChecked('DisableUTP')} onChange={onBoolSwitch} />
        <SettingSwitch id='DisableUPNP' label='UPnP' helper={t('SettingsDialog.DisableUPNPHint')} checked={boolChecked('DisableUPNP')} onChange={onBoolSwitch} />
        <SettingSwitch id='DisableDHT' label={t('SettingsDialog.DHT')} helper={t('SettingsDialog.DisableDHTHint')} checked={boolChecked('DisableDHT')} onChange={onBoolSwitch} />
        <SettingSwitch id='DisablePEX' label='PEX' helper={t('SettingsDialog.DisablePEXHint')} checked={boolChecked('DisablePEX')} onChange={onBoolSwitch} />
        <SettingSwitch id='EnableIPv6' label='IPv6' helper={t('SettingsDialog.EnableIPv6Hint')} checked={boolChecked('EnableIPv6')} onChange={onBoolSwitch} />
        <SettingSwitch id='EnableLPD' label='LPD' helper={t('SettingsDialog.EnableLPDHint')} checked={boolChecked('EnableLPD')} onChange={onBoolSwitch} />
        <SettingSwitch id='LPDIPv6' label='LPD IPv6' helper={t('SettingsDialog.EnableLPDIPv6Hint')} checked={boolChecked('LPDIPv6')} onChange={onBoolSwitch} />
        <SettingSwitch id='DisableUpload' label={t('SettingsDialog.Upload')} helper={t('SettingsDialog.UploadHint')} checked={boolChecked('DisableUpload')} onChange={onBoolSwitch} />
        <SettingSwitch id='ForceEncrypt' label={t('SettingsDialog.ForceEncrypt')} helper={t('SettingsDialog.ForceEncryptHint')} checked={boolChecked('ForceEncrypt')} onChange={onBoolSwitch} />
      </div>

      <Select
        selectedKey={settings.RetrackersMode == null ? '1' : String(settings.RetrackersMode)}
        onSelectionChange={key => onUpdate('RetrackersMode', Number(key))}
        className='mt-4'
      >
        <Label>{t('SettingsDialog.RetrackersMode')}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id='0'>{t('SettingsDialog.DontAddRetrackers')}</ListBox.Item>
            <ListBox.Item id='1'>{t('SettingsDialog.AddRetrackers')}</ListBox.Item>
            <ListBox.Item id='2'>{t('SettingsDialog.RemoveRetrackers')}</ListBox.Item>
            <ListBox.Item id='3'>{t('SettingsDialog.ReplaceRetrackers')}</ListBox.Item>
          </ListBox>
        </Select.Popover>
        <Description>{t('SettingsDialog.RetrackersModeHint')}</Description>
      </Select>

      <div className='mt-4 space-y-3'>
        {(
          [
            ['PeersListenPort', t('SettingsDialog.PeersListenPort'), t('SettingsDialog.PeersListenPortHint')],
            ['ConnectionsLimit', t('SettingsDialog.ConnectionsLimit'), t('SettingsDialog.ConnectionsLimitHint')],
            ['DownloadRateLimit', t('SettingsDialog.DownloadRateLimit'), t('SettingsDialog.RateLimitHint')],
            ['UploadRateLimit', t('SettingsDialog.UploadRateLimit'), t('SettingsDialog.RateLimitHint')],
            ['TorrentDisconnectTimeout', t('SettingsDialog.TorrentDisconnectTimeout'), t('Seconds')],
            ['SslPort', t('SettingsDialog.SslPort'), t('SettingsDialog.SslPortHint')],
          ] as const
        ).map(([key, label, helper]) => (
          <TextField
            key={key}
            value={String(settings[key] ?? (key === 'ConnectionsLimit' ? 25 : key === 'TorrentDisconnectTimeout' ? 30 : 0))}
            onChange={value => onUpdate(key, Number(value))}
          >
            <Label>{label}</Label>
            <Input type='number' />
            <Description>{helper}</Description>
          </TextField>
        ))}
        <TextField value={settings.SslCert || ''} onChange={value => onUpdate('SslCert', value)}>
          <Label>{t('SettingsDialog.SslCert')}</Label>
          <Input />
          <Description>{t('SettingsDialog.SslCertHint')}</Description>
        </TextField>
        <TextField value={settings.SslKey || ''} onChange={value => onUpdate('SslKey', value)}>
          <Label>{t('SettingsDialog.SslKey')}</Label>
          <Input />
          <Description>{t('SettingsDialog.SslKeyHint')}</Description>
        </TextField>
      </div>
    </>
  )
}

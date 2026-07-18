import { Description, Label, Link, Switch } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { useLocalBoolPref } from 'shared/hooks/useLocalPref'
import { isAppleDevice, isDesktop, isMacOS } from 'shared/lib/platform'

const PLAYER_KEYS = {
  vlc: 'isVlcUsed',
  infuse: 'isInfuseUsed',
  senPlayer: 'isSenPlayerUsed',
  iina: 'isIinaUsed',
} as const

function PlayerSwitch({
  label,
  helper,
  checked,
  onChange,
}: {
  label: string
  helper: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className='flex min-h-12 items-start justify-between gap-4 py-2'>
      <div className='min-w-0 flex-1 pr-4'>
        <Label>{label}</Label>
        <Description>{helper}</Description>
      </div>
      <Switch isSelected={checked} onChange={onChange}>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
    </div>
  )
}

export default function MobilePlayersSection() {
  const { t } = useTranslation()
  const isMac = isMacOS()
  const isApple = isAppleDevice()
  const isDesktopPlatform = isDesktop()

  const [isVlcUsed, setIsVlcUsed] = useLocalBoolPref(PLAYER_KEYS.vlc)
  const [isInfuseUsed, setIsInfuseUsed] = useLocalBoolPref(PLAYER_KEYS.infuse)
  const [isSenPlayerUsed, setIsSenPlayerUsed] = useLocalBoolPref(PLAYER_KEYS.senPlayer)
  const [isIinaUsed, setIsIinaUsed] = useLocalBoolPref(PLAYER_KEYS.iina)

  return (
    <div className='mt-6'>
      <p className='mb-1 text-xs uppercase tracking-wide text-default-500'>{t('SettingsDialog.MobileAppSettings')}</p>
      <Description className='mb-3'>{t('SettingsDialog.MobileAppInstantHint')}</Description>
      <div className='divide-y divide-default-200'>
        <PlayerSwitch
          label={t('SettingsDialog.UseVLC')}
          helper={t('SettingsDialog.UseVLCHint')}
          checked={isVlcUsed}
          onChange={setIsVlcUsed}
        />
        {isDesktopPlatform ? (
          <Description className='py-2 pr-8'>
            {t('SettingsDialog.UseVLCDesktopHintPrefix')}{' '}
            <Link href='https://github.com/northsea4/vlc-protocol' target='_blank' rel='noopener noreferrer'>
              vlc-protocol-handler
            </Link>
          </Description>
        ) : null}

        {isApple ? (
          <>
            <PlayerSwitch
              label={t('SettingsDialog.UseInfuse')}
              helper={t('SettingsDialog.UseInfuseHint')}
              checked={isInfuseUsed}
              onChange={setIsInfuseUsed}
            />
            <PlayerSwitch
              label={t('SettingsDialog.UseSenPlayer')}
              helper={t('SettingsDialog.UseSenPlayerHint')}
              checked={isSenPlayerUsed}
              onChange={setIsSenPlayerUsed}
            />
          </>
        ) : null}

        {isMac ? (
          <PlayerSwitch
            label={t('SettingsDialog.UseIINA')}
            helper={t('SettingsDialog.UseIINAHint')}
            checked={isIinaUsed}
            onChange={setIsIinaUsed}
          />
        ) : null}
      </div>
    </div>
  )
}

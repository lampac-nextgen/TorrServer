import { Clapperboard } from 'lucide-react'
import { Description, Link } from '@heroui/react'
import { useTranslation } from 'react-i18next'

import { useLocalBoolPref } from 'shared/hooks/useLocalPref'
import { isAppleDevice, isDesktop, isMacOS } from 'shared/lib/platform'

import { SettingSwitch } from './SettingSwitch'
import SettingsSection from './SettingsSection'

const PLAYER_KEYS = {
  vlc: 'isVlcUsed',
  infuse: 'isInfuseUsed',
  senPlayer: 'isSenPlayerUsed',
  iina: 'isIinaUsed',
} as const

/** External-player quick-open toggles — persisted as local prefs, gated by detected platform. */
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
    <SettingsSection
      icon={<Clapperboard />}
      title={t('SettingsDialog.MobileAppSettings')}
      description={t('SettingsDialog.MobileAppInstantHint')}
    >
      <div className='space-y-1'>
        <SettingSwitch
          id={PLAYER_KEYS.vlc}
          label={t('SettingsDialog.UseVLC')}
          helper={t('SettingsDialog.UseVLCHint')}
          checked={isVlcUsed}
          onChange={(_id, checked) => setIsVlcUsed(checked)}
        />
        {isDesktopPlatform ? (
          <Description className='mt-1'>
            {t('SettingsDialog.UseVLCDesktopHintPrefix')}{' '}
            <Link href='https://github.com/northsea4/vlc-protocol' target='_blank' rel='noopener noreferrer'>
              vlc-protocol-handler
            </Link>
          </Description>
        ) : null}
      </div>

      {isApple ? (
        <>
          <SettingSwitch
            id={PLAYER_KEYS.infuse}
            label={t('SettingsDialog.UseInfuse')}
            helper={t('SettingsDialog.UseInfuseHint')}
            checked={isInfuseUsed}
            onChange={(_id, checked) => setIsInfuseUsed(checked)}
          />
          <SettingSwitch
            id={PLAYER_KEYS.senPlayer}
            label={t('SettingsDialog.UseSenPlayer')}
            helper={t('SettingsDialog.UseSenPlayerHint')}
            checked={isSenPlayerUsed}
            onChange={(_id, checked) => setIsSenPlayerUsed(checked)}
          />
        </>
      ) : null}

      {isMac ? (
        <SettingSwitch
          id={PLAYER_KEYS.iina}
          label={t('SettingsDialog.UseIINA')}
          helper={t('SettingsDialog.UseIINAHint')}
          checked={isIinaUsed}
          onChange={(_id, checked) => setIsIinaUsed(checked)}
        />
      ) : null}
    </SettingsSection>
  )
}

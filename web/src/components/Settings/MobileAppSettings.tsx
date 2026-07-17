import { FormControlLabel, FormGroup, FormHelperText, Switch, Link } from '@mui/material'
import { isMacOS, isAppleDevice, isDesktop } from 'utils/Utils'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { readLocalBool, writeLocalJson } from 'utils/localPrefs'

import { SettingSectionLabel } from './style'

const PLAYER_KEYS = {
  vlc: 'isVlcUsed',
  infuse: 'isInfuseUsed',
  senPlayer: 'isSenPlayerUsed',
  iina: 'isIinaUsed',
} as const

export default function MobileAppSettings() {
  const { t } = useTranslation()
  const isMac = isMacOS()
  const isApple = isAppleDevice()
  const isDesktopPlatform = isDesktop()

  const [isVlcUsed, setIsVlcUsed] = useState(() => readLocalBool(PLAYER_KEYS.vlc))
  const [isInfuseUsed, setIsInfuseUsed] = useState(() => readLocalBool(PLAYER_KEYS.infuse))
  const [isSenPlayerUsed, setIsSenPlayerUsed] = useState(() => readLocalBool(PLAYER_KEYS.senPlayer))
  const [isIinaUsed, setIsIinaUsed] = useState(() => readLocalBool(PLAYER_KEYS.iina))

  const togglePref = (key: string, checked: boolean, setChecked: (v: boolean) => void) => {
    setChecked(checked)
    writeLocalJson(key, checked)
  }

  return (
    <div>
      <SettingSectionLabel>{t('SettingsDialog.MobileAppSettings')}</SettingSectionLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isVlcUsed}
              onChange={(_, checked) => togglePref(PLAYER_KEYS.vlc, checked, setIsVlcUsed)}
              color='secondary'
            />
          }
          label={t('SettingsDialog.UseVLC')}
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.UseVLCHint')}</FormHelperText>
        {isDesktopPlatform && (
          <FormHelperText>
            {t('SettingsDialog.UseVLCDesktopHintPrefix')}{' '}
            <Link
              href='https://github.com/northsea4/vlc-protocol'
              target='_blank'
              rel='noopener noreferrer'
              color='secondary'
            >
              vlc-protocol-handler
            </Link>
          </FormHelperText>
        )}
        {isApple && (
          <>
            <FormControlLabel
              control={
                <Switch
                  checked={isInfuseUsed}
                  onChange={(_, checked) => togglePref(PLAYER_KEYS.infuse, checked, setIsInfuseUsed)}
                  color='secondary'
                />
              }
              label={t('SettingsDialog.UseInfuse')}
              labelPlacement='start'
            />
            <FormHelperText>{t('SettingsDialog.UseInfuseHint')}</FormHelperText>
          </>
        )}
        {isApple && (
          <>
            <FormControlLabel
              control={
                <Switch
                  checked={isSenPlayerUsed}
                  onChange={(_, checked) => togglePref(PLAYER_KEYS.senPlayer, checked, setIsSenPlayerUsed)}
                  color='secondary'
                />
              }
              label={t('SettingsDialog.UseSenPlayer')}
              labelPlacement='start'
            />
            <FormHelperText>{t('SettingsDialog.UseSenPlayerHint')}</FormHelperText>
          </>
        )}
        {isMac && (
          <>
            <FormControlLabel
              control={
                <Switch
                  checked={isIinaUsed}
                  onChange={(_, checked) => togglePref(PLAYER_KEYS.iina, checked, setIsIinaUsed)}
                  color='secondary'
                />
              }
              label={t('SettingsDialog.UseIINA')}
              labelPlacement='start'
            />
            <FormHelperText>{t('SettingsDialog.UseIINAHint')}</FormHelperText>
          </>
        )}
      </FormGroup>
    </div>
  )
}

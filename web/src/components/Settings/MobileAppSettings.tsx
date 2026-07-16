import { FormControlLabel, FormGroup, FormHelperText, Switch, Link } from '@mui/material'
import { isMacOS, isAppleDevice, isDesktop } from 'utils/Utils'
import { useTranslation } from 'react-i18next'
import type { Dispatch, SetStateAction } from 'react'

import { SecondarySettingsContent, SettingSectionLabel } from './style'

interface MobileAppSettingsProps {
  isVlcUsed: boolean
  setIsVlcUsed: Dispatch<SetStateAction<boolean>>
  isInfuseUsed: boolean
  setIsInfuseUsed: Dispatch<SetStateAction<boolean>>
  isSenPlayerUsed: boolean
  setIsSenPlayerUsed: Dispatch<SetStateAction<boolean>>
  isIinaUsed: boolean
  setIsIinaUsed: Dispatch<SetStateAction<boolean>>
}

export default function MobileAppSettings({
  isVlcUsed,
  setIsVlcUsed,
  isInfuseUsed,
  setIsInfuseUsed,
  isSenPlayerUsed,
  setIsSenPlayerUsed,
  isIinaUsed,
  setIsIinaUsed,
}: MobileAppSettingsProps) {
  const { t } = useTranslation()
  const isMac = isMacOS()
  const isApple = isAppleDevice()
  const isDesktopPlatform = isDesktop()

  return (
    <SecondarySettingsContent>
      <SettingSectionLabel>{t('SettingsDialog.MobileAppSettings')}</SettingSectionLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={isVlcUsed} onChange={() => setIsVlcUsed(prev => !prev)} color='secondary' />}
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
                <Switch checked={isInfuseUsed} onChange={() => setIsInfuseUsed(prev => !prev)} color='secondary' />
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
                  onChange={() => setIsSenPlayerUsed(prev => !prev)}
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
              control={<Switch checked={isIinaUsed} onChange={() => setIsIinaUsed(prev => !prev)} color='secondary' />}
              label={t('SettingsDialog.UseIINA')}
              labelPlacement='start'
            />
            <FormHelperText>{t('SettingsDialog.UseIINAHint')}</FormHelperText>
          </>
        )}
      </FormGroup>
    </SecondarySettingsContent>
  )
}

import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import Link from '@mui/material/Link'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useLocalBoolPref } from 'shared/hooks/useLocalPref'
import { isAppleDevice, isDesktop, isMacOS } from 'shared/lib/platform'

const PLAYER_KEYS = {
  vlc: 'isVlcUsed',
  infuse: 'isInfuseUsed',
  senPlayer: 'isSenPlayerUsed',
  iina: 'isIinaUsed',
} as const

const touchTargetSx = { minHeight: 44, minWidth: 44 }

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
    <Box sx={{ mt: 3 }}>
      <Typography variant='overline' color='text.secondary' sx={{ display: 'block', mb: 0.5 }}>
        {t('SettingsDialog.MobileAppSettings')}
      </Typography>
      <FormHelperText sx={{ mb: 1, mt: 0 }}>{t('SettingsDialog.MobileAppInstantHint')}</FormHelperText>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isVlcUsed}
              onChange={(_, checked) => setIsVlcUsed(checked)}
              color='secondary'
              sx={touchTargetSx}
            />
          }
          label={t('SettingsDialog.UseVLC')}
          labelPlacement='start'
          sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0 }}
        />
        <FormHelperText sx={{ mt: 0 }}>{t('SettingsDialog.UseVLCHint')}</FormHelperText>
        {isDesktopPlatform ? (
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
        ) : null}

        {isApple ? (
          <>
            <FormControlLabel
              control={
                <Switch
                  checked={isInfuseUsed}
                  onChange={(_, checked) => setIsInfuseUsed(checked)}
                  color='secondary'
                  sx={touchTargetSx}
                />
              }
              label={t('SettingsDialog.UseInfuse')}
              labelPlacement='start'
              sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0 }}
            />
            <FormHelperText sx={{ mt: 0 }}>{t('SettingsDialog.UseInfuseHint')}</FormHelperText>

            <FormControlLabel
              control={
                <Switch
                  checked={isSenPlayerUsed}
                  onChange={(_, checked) => setIsSenPlayerUsed(checked)}
                  color='secondary'
                  sx={touchTargetSx}
                />
              }
              label={t('SettingsDialog.UseSenPlayer')}
              labelPlacement='start'
              sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0 }}
            />
            <FormHelperText sx={{ mt: 0 }}>{t('SettingsDialog.UseSenPlayerHint')}</FormHelperText>
          </>
        ) : null}

        {isMac ? (
          <>
            <FormControlLabel
              control={
                <Switch
                  checked={isIinaUsed}
                  onChange={(_, checked) => setIsIinaUsed(checked)}
                  color='secondary'
                  sx={touchTargetSx}
                />
              }
              label={t('SettingsDialog.UseIINA')}
              labelPlacement='start'
              sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0 }}
            />
            <FormHelperText sx={{ mt: 0 }}>{t('SettingsDialog.UseIINAHint')}</FormHelperText>
          </>
        ) : null}
      </FormGroup>
    </Box>
  )
}

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
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
    <ListItem
      disableGutters
      sx={{ minHeight: 48, py: 0.5, alignItems: 'flex-start' }}
      secondaryAction={
        <Switch
          edge='end'
          checked={checked}
          onChange={(_, next) => onChange(next)}
          slotProps={{ input: { 'aria-label': label } }}
          sx={{ mt: 0.5 }}
        />
      }
    >
      <ListItemText
        primary={label}
        secondary={helper}
        slotProps={{
          secondary: { sx: { mt: 0.25, pr: 7 } },
          primary: { sx: { pr: 7 } },
        }}
      />
    </ListItem>
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
    <Box sx={{ mt: 3 }}>
      <Typography variant='overline' color='text.secondary' sx={{ display: 'block', mb: 0.5 }}>
        {t('SettingsDialog.MobileAppSettings')}
      </Typography>
      <FormHelperText sx={{ mb: 1, mt: 0 }}>{t('SettingsDialog.MobileAppInstantHint')}</FormHelperText>
      <List disablePadding>
        <PlayerSwitch
          label={t('SettingsDialog.UseVLC')}
          helper={t('SettingsDialog.UseVLCHint')}
          checked={isVlcUsed}
          onChange={setIsVlcUsed}
        />
        {isDesktopPlatform ? (
          <FormHelperText sx={{ mt: 0, mb: 1.5, pr: 7 }}>
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
      </List>
    </Box>
  )
}

import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Switch from '@mui/material/Switch'

export const SETTINGS_TOUCH_SX = {
  minHeight: 44,
  minWidth: 44,
} as const

/** Keys stored inverted in UI (switch ON = feature enabled). */
export const DISABLE_SWITCH_IDS = new Set([
  'DisableTCP',
  'DisableUTP',
  'DisableUPNP',
  'DisableDHT',
  'DisablePEX',
  'DisableUpload',
])

export function SettingSwitch({
  id,
  label,
  helper,
  checked,
  onChange,
}: {
  id: string
  label: string
  helper?: string
  checked: boolean
  onChange: (id: string, checked: boolean) => void
}) {
  return (
    <Box sx={{ mb: 1 }}>
      <FormControlLabel
        control={
          <Switch id={id} checked={checked} onChange={e => onChange(id, e.target.checked)} sx={SETTINGS_TOUCH_SX} />
        }
        label={label}
        sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0 }}
        labelPlacement='start'
      />
      {helper ? <FormHelperText sx={{ mt: -0.5, ml: 0 }}>{helper}</FormHelperText> : null}
    </Box>
  )
}

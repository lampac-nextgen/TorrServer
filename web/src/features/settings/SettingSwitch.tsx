import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Switch from '@mui/material/Switch'

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
    <ListItem
      disableGutters
      sx={{ minHeight: 48, py: 0.5, alignItems: 'flex-start' }}
      secondaryAction={
        <Switch
          edge='end'
          id={id}
          checked={checked}
          onChange={e => onChange(id, e.target.checked)}
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

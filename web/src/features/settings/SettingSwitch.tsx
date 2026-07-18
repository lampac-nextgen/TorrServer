import { Description, Label, Switch } from '@heroui/react'

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
    <div className='flex min-h-12 items-start justify-between gap-4 py-2'>
      <div className='min-w-0 flex-1 pr-4'>
        <Label htmlFor={id}>{label}</Label>
        {helper ? <Description>{helper}</Description> : null}
      </div>
      <Switch id={id} isSelected={checked} onChange={value => onChange(id, value)}>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
    </div>
  )
}

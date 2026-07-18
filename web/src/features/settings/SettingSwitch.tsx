import { Description, Label, Switch } from '@heroui/react'

/** Keys whose on-disk value is the inverse of what the switch shows (switch ON = feature enabled). */
export const DISABLE_SWITCH_IDS = new Set([
  'DisableTCP',
  'DisableUTP',
  'DisableUPNP',
  'DisableDHT',
  'DisablePEX',
  'DisableUpload',
])

export interface SettingSwitchProps {
  id: string
  label: string
  helper?: string
  checked: boolean
  onChange: (id: string, checked: boolean) => void
}

/** Reusable labeled toggle row shared across settings panels. */
export function SettingSwitch({ id, label, helper, checked, onChange }: SettingSwitchProps) {
  return (
    <div className='flex min-h-12 items-start justify-between gap-3 py-1 sm:gap-4'>
      <div className='min-w-0 flex-1 pr-2 sm:pr-4'>
        <Label htmlFor={id} className='text-sm leading-snug text-wrap'>
          {label}
        </Label>
        {helper ? <Description className='mt-1 text-wrap leading-relaxed'>{helper}</Description> : null}
      </div>
      <Switch id={id} isSelected={checked} onChange={value => onChange(id, value)} className='shrink-0'>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Content>
      </Switch>
    </div>
  )
}

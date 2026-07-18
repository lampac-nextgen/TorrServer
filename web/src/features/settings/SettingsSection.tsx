import type { ReactNode } from 'react'

export interface SettingsSectionProps {
  icon?: ReactNode
  title: string
  description?: string
  children: ReactNode
  className?: string
}

/**
 * Groups related settings behind a heading + card, so a tab reads as a handful of labeled
 * sections instead of one long undifferentiated column of switches/fields.
 */
export default function SettingsSection({ icon, title, description, children, className }: SettingsSectionProps) {
  return (
    <section className={className}>
      <div className='mb-2.5 flex items-center gap-2'>
        {icon ? <span className='text-muted [&>svg]:size-4'>{icon}</span> : null}
        <h3 className='text-xs font-semibold tracking-wide text-muted uppercase'>{title}</h3>
      </div>
      {description ? <p className='mb-3 text-sm text-muted'>{description}</p> : null}
      <div className='space-y-4 rounded-lg border border-border bg-surface-secondary p-4'>{children}</div>
    </section>
  )
}

// @vitest-environment happy-dom
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const theme = vi.hoisted(() => ({ isDark: true }))
vi.mock('shared/theme/useThemePreference', () => ({ useThemePreference: () => ({ isDark: theme.isDark }) }))

import BrandLogo from './BrandLogo'

describe('BrandLogo', () => {
  it('uses the dark artwork on dark surfaces and the light one otherwise', () => {
    theme.isDark = true
    const dark = render(<BrandLogo />)
    expect(dark.getByRole('img', { name: 'TorrServer' }).getAttribute('src')).toMatch(/brand\/logo-dark\.svg$/)
    dark.unmount()
    theme.isDark = false
    const light = render(<BrandLogo />)
    expect(light.getByRole('img', { name: 'TorrServer' }).getAttribute('src')).toMatch(/brand\/logo-light\.svg$/)
  })

  it('lets callers force a variant and mark the image decorative', () => {
    theme.isDark = false
    const { container } = render(<BrandLogo variant='dark' alt='' />)
    expect(container.querySelector('img')?.getAttribute('src')).toMatch(/logo-dark\.svg$/)
    expect(container.querySelector('img')?.getAttribute('alt')).toBe('')
  })
})

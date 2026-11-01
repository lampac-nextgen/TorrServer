// @vitest-environment happy-dom
import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { renderWithProviders } from '../../test/renderWithProviders'

import AppearanceSettingsPanel from './AppearanceSettingsPanel'

const options = () => screen.getAllByRole('option') as HTMLButtonElement[]

describe('AppearanceSettingsPanel palette picker', () => {
  beforeEach(() => localStorage.clear())

  it('lists palettes in labelled groups with a single tab stop on the selected one', () => {
    renderWithProviders(<AppearanceSettingsPanel />)
    expect(screen.getAllByRole('group').length).toBeGreaterThan(3)
    const stops = options().filter(o => o.tabIndex === 0)
    expect(stops).toHaveLength(1)
    expect(stops[0].getAttribute('aria-selected')).toBe('true')
  })

  it('moves focus with arrow keys, Home and End, across group boundaries', () => {
    renderWithProviders(<AppearanceSettingsPanel />)
    const all = options()
    all[0].focus()
    const listbox = screen.getByRole('listbox')
    fireEvent.keyDown(listbox, { key: 'ArrowRight' })
    expect(document.activeElement).toBe(all[1])
    fireEvent.keyDown(listbox, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(all[2])
    fireEvent.keyDown(listbox, { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(all[1])
    fireEvent.keyDown(listbox, { key: 'End' })
    expect(document.activeElement).toBe(all[all.length - 1])
    fireEvent.keyDown(listbox, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(all[all.length - 1])
    fireEvent.keyDown(listbox, { key: 'Home' })
    expect(document.activeElement).toBe(all[0])
  })

  it('selecting an option applies the palette to the document', () => {
    renderWithProviders(<AppearanceSettingsPanel />)
    const lagoon = options().find(o => o.textContent === 'Lagoon')!
    fireEvent.click(lagoon)
    expect(document.documentElement.dataset.palette).toBe('lagoon')
    expect(lagoon.getAttribute('aria-selected')).toBe('true')
  })
})

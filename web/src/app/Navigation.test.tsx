// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { OPEN_SETTINGS_EVENT } from 'shared/lib/settingsEvents'
import { isDisabled } from '../test/dom'
import { renderWithApp } from '../test/renderWithApp'

import BottomNav from './BottomNav'
import CommandPalette from './CommandPalette'

const navProps = () => ({
  onAdd: vi.fn(),
  onSearch: vi.fn(),
  onCategories: vi.fn(),
  onSettings: vi.fn(),
  onAbout: vi.fn(),
  onDonate: vi.fn(),
  onServerStatus: vi.fn(),
  onCloseServer: vi.fn(),
  onRemoveAll: vi.fn(),
  onImportLibrary: vi.fn(),
  onExportLibrary: vi.fn(),
  onDownloadAllPlaylists: vi.fn(),
})

describe('BottomNav', () => {
  it('routes the tabs and marks Category active under a filter', async () => {
    const props = navProps()
    renderWithApp(<BottomNav {...props} isCategoryFilterActive />)
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    await userEvent.click(screen.getByRole('button', { name: 'Search' }))
    await userEvent.click(screen.getByRole('button', { name: 'Category' }))
    expect(props.onAdd).toHaveBeenCalled()
    expect(props.onSearch).toHaveBeenCalled()
    expect(props.onCategories).toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Category' }).getAttribute('aria-current')).toBe('true')
  })

  it('disables library actions while offline but keeps Category and More', () => {
    renderWithApp(<BottomNav {...navProps()} isOffline />)
    expect(isDisabled(screen.getByRole('button', { name: 'Add' }))).toBe(true)
    expect(isDisabled(screen.getByRole('button', { name: 'Search' }))).toBe(true)
    expect(isDisabled(screen.getByRole('button', { name: 'Category' }))).toBe(false)
    expect(isDisabled(screen.getByRole('button', { name: 'More' }))).toBe(false)
  })

  it('More opens a sheet; an action closes it and runs; Log out only with a session', async () => {
    const props = navProps()
    const onLogout = vi.fn()
    renderWithApp(<BottomNav {...props} onLogout={onLogout} />)
    await userEvent.click(screen.getByRole('button', { name: 'More' }))
    await userEvent.click(await screen.findByRole('button', { name: 'About' }))
    expect(props.onAbout).toHaveBeenCalledTimes(1)
    await vi.waitFor(() => expect(screen.queryByRole('button', { name: 'About' })).toBeNull())

    await userEvent.click(screen.getByRole('button', { name: 'More' }))
    await userEvent.click(await screen.findByRole('button', { name: /Log ?out/i }))
    expect(onLogout).toHaveBeenCalledTimes(1)
  })

  it('has no Log out entry without a Basic login session', async () => {
    renderWithApp(<BottomNav {...navProps()} />)
    await userEvent.click(screen.getByRole('button', { name: 'More' }))
    await screen.findByRole('button', { name: 'About' })
    expect(screen.queryByRole('button', { name: /Log ?out/i })).toBeNull()
  })
})

describe('CommandPalette', () => {
  const handlers = () => ({
    onClose: vi.fn(),
    onAdd: vi.fn(),
    onSearch: vi.fn(),
    onAbout: vi.fn(),
    onDonate: vi.fn(),
    onServerStatus: vi.fn(),
    onToggleTheme: vi.fn(),
  })

  it('filters by label or id and shows an empty state', async () => {
    renderWithApp(<CommandPalette open {...handlers()} />)
    const all = screen.getAllByRole('button').length
    await userEvent.type(screen.getByRole('textbox'), 'playl')
    expect(screen.getAllByRole('button', { name: /playlist/i })).toHaveLength(1)
    expect(screen.getAllByRole('button').length).toBeLessThan(all)
    await userEvent.clear(screen.getByRole('textbox'))
    await userEvent.type(screen.getByRole('textbox'), 'zzzzz')
    expect(screen.getByText('No matches')).toBeTruthy()
  })

  it('runs a command and closes', async () => {
    const h = handlers()
    renderWithApp(<CommandPalette open {...h} />)
    await userEvent.click(screen.getByRole('button', { name: 'Donate' }))
    expect(h.onDonate).toHaveBeenCalledTimes(1)
    expect(h.onClose).toHaveBeenCalledTimes(1)
  })

  it('Appearance deep-links Settings through the window event', async () => {
    const h = handlers()
    const seen = vi.fn()
    window.addEventListener(OPEN_SETTINGS_EVENT, e => seen((e as CustomEvent).detail), { once: true })
    renderWithApp(<CommandPalette open {...h} />)
    await userEvent.click(screen.getByRole('button', { name: 'Appearance' }))
    expect(seen).toHaveBeenCalledWith('appearance')
    expect(h.onClose).toHaveBeenCalled()
  })
})

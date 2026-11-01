// @vitest-environment happy-dom
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  DOWNLOAD_ALL_PLAYLISTS_EVENT,
  OPEN_EXPORT_LIBRARY_EVENT,
  OPEN_IMPORT_LIBRARY_EVENT,
} from 'shared/lib/libraryEvents'
import { OPEN_SETTINGS_EVENT } from 'shared/lib/settingsEvents'
import { renderWithApp } from '@/test/renderWithApp'

import CommandPalette from './CommandPalette'

function setup() {
  const h = {
    onClose: vi.fn(),
    onAdd: vi.fn(),
    onSearch: vi.fn(),
    onAbout: vi.fn(),
    onDonate: vi.fn(),
    onServerStatus: vi.fn(),
    onToggleTheme: vi.fn(),
  }
  renderWithApp(<CommandPalette open {...h} />)
  return { h, user: userEvent.setup() }
}

const events: string[] = []
const listen = (name: string) => window.addEventListener(name, () => events.push(name))

afterEach(() => {
  events.length = 0
})

describe('CommandPalette', () => {
  it.each([
    ['Add new torrent', 'onAdd'],
    ['Search', 'onSearch'],
    ['Server status', 'onServerStatus'],
    ['Theme', 'onToggleTheme'],
    ['About', 'onAbout'],
    ['Donate', 'onDonate'],
  ] as const)('runs "%s" and closes', async (label, handler) => {
    const { h, user } = setup()
    await user.click(await screen.findByRole('button', { name: new RegExp(`^${label}`, 'i') }))
    expect(h[handler]).toHaveBeenCalledOnce()
    expect(h.onClose).toHaveBeenCalledOnce()
  })

  it('broadcasts library and settings requests to the rest of the app', async () => {
    for (const e of [
      OPEN_IMPORT_LIBRARY_EVENT,
      OPEN_EXPORT_LIBRARY_EVENT,
      DOWNLOAD_ALL_PLAYLISTS_EVENT,
      OPEN_SETTINGS_EVENT,
    ])
      listen(e)
    const { h, user } = setup()
    await user.click(await screen.findByRole('button', { name: /Import/i }))
    await user.click(screen.getByRole('button', { name: /Export/i }))
    await user.click(screen.getByRole('button', { name: /Server Playlist/i }))
    await user.click(screen.getByRole('button', { name: /^Settings$/i }))
    await user.click(screen.getByRole('button', { name: /Appearance/i }))
    expect(events).toEqual([
      OPEN_IMPORT_LIBRARY_EVENT,
      OPEN_EXPORT_LIBRARY_EVENT,
      DOWNLOAD_ALL_PLAYLISTS_EVENT,
      OPEN_SETTINGS_EVENT,
      OPEN_SETTINGS_EVENT,
    ])
    expect(h.onClose).toHaveBeenCalledTimes(5)
  })

  it('filters by label or id and shows an empty state', async () => {
    const { user } = setup()
    const box = await screen.findByRole('textbox')
    await user.type(box, 'donate')
    expect(screen.getAllByRole('button', { name: /Donate/i })).toHaveLength(1)
    expect(screen.queryByRole('button', { name: /^About/i })).toBeNull()

    await user.clear(box)
    await user.type(box, 'zzzz-nothing')
    expect(await screen.findByText('No matches')).toBeTruthy()
  })
})

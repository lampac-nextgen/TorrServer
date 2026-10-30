// @vitest-environment happy-dom
import { useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { BTSets } from 'shared/api/types'
import { routeApi } from '../../test/mockApi'
import { renderWithApp } from '../../test/renderWithApp'

import AppearanceSettingsPanel from './AppearanceSettingsPanel'
import FeaturesSettingsPanel from './FeaturesSettingsPanel'
import IntegrationsStatusSection from './IntegrationsStatusSection'
import MobilePlayersSection from './MobilePlayersSection'
import TMDBSettingsSection from './TMDBSettingsSection'
import { DISABLE_SWITCH_IDS } from './SettingSwitch'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)
const toast = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
}))
vi.mock('sonner', () => ({
  toast: Object.assign(vi.fn(), toast),
  Toaster: () => null,
}))
const copy = vi.hoisted(() => vi.fn())
vi.mock('shared/lib/clipboard', () => ({ copyToClipboard: copy }))

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
})

describe('FeaturesSettingsPanel', () => {
  it('reports switch ids to the dialog and edits the friendly name', async () => {
    routeApi({ 'GET /runtime/status': { dlna_enabled: false } })
    const onBoolSwitch = vi.fn()
    const onUpdate = vi.fn()
    renderWithApp(
      <FeaturesSettingsPanel
        settings={{ FriendlyName: 'TS' }}
        boolChecked={() => false}
        onUpdate={onUpdate}
        onBoolSwitch={onBoolSwitch}
      />,
    )
    await userEvent.click(screen.getByRole('switch', { name: /Bonjour/i }))
    expect(onBoolSwitch).toHaveBeenCalledWith('EnableBonjour', true)
    await userEvent.type(screen.getByLabelText('Server Name (DLNA/Bonjour)'), 'X')
    expect(onUpdate).toHaveBeenLastCalledWith('FriendlyName', 'TSX')
  })

  it('knows which switches are stored inverted', () => {
    expect([...DISABLE_SWITCH_IDS].sort()).toEqual(
      ['DisableDHT', 'DisablePEX', 'DisableTCP', 'DisableUPNP', 'DisableUTP', 'DisableUpload'].sort(),
    )
  })
})

describe('IntegrationsStatusSection', () => {
  it('renders runtime status and copies the WebDAV and MCP URLs', async () => {
    routeApi({
      'GET /runtime/status': {
        dlna_enabled: true,
        bonjour_enabled: false,
        webdav_enabled: true,
        webdav_path: '/dav',
        fuse_enabled: false,
        friendly_name: 'Box',
      },
    })
    copy.mockResolvedValue(undefined)
    renderWithApp(<IntegrationsStatusSection />)
    expect(await screen.findByText(/Enabled · Box/)).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Copy WebDAV URL' }))
    expect(copy).toHaveBeenCalledWith(expect.stringMatching(/\/dav$/))
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Copied', expect.anything()))
    await userEvent.click(screen.getByRole('button', { name: 'Copy MCP URL' }))
    expect(copy).toHaveBeenLastCalledWith(expect.stringMatching(/\/mcp$/))
  })

  it('shows an error line when the status request fails and still offers the MCP URL', async () => {
    routeApi({})
    renderWithApp(<IntegrationsStatusSection />)
    expect(await screen.findByText('Error')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Copy WebDAV URL' })).toBeNull()
    copy.mockRejectedValue(new Error('denied'))
    await userEvent.click(screen.getByRole('button', { name: 'Copy MCP URL' }))
    await waitFor(() => expect(toast.error).toHaveBeenCalled())
  })
})

describe('TMDBSettingsSection', () => {
  function Harness() {
    const [s, set] = useState<BTSets>({ TMDBSettings: { APIKey: 'abc' } })
    return <TMDBSettingsSection settings={s} updateSettings={p => set(prev => ({ ...prev, ...p }))} />
  }

  it('edits one field and keeps the others', async () => {
    renderWithApp(<Harness />)
    const key = screen.getByLabelText('TMDB API Key') as HTMLInputElement
    expect(key.value).toBe('abc')
    await userEvent.type(key, 'd')
    expect((screen.getByLabelText('TMDB API Key') as HTMLInputElement).value).toBe('abcd')
  })
})

describe('AppearanceSettingsPanel', () => {
  it('filters palettes and falls back to the empty message', async () => {
    renderWithApp(<AppearanceSettingsPanel />)
    const total = screen.getAllByRole('option').length
    expect(total).toBeGreaterThan(3)
    await userEvent.type(screen.getByRole('searchbox'), 'zzzz-no-such-palette')
    expect(screen.queryAllByRole('option')).toHaveLength(0)
    expect(screen.getByText('No palettes match your search.')).toBeTruthy()
  })

  it('persists the dialogs fullscreen preference immediately', async () => {
    renderWithApp(<AppearanceSettingsPanel />)
    await userEvent.click(screen.getByRole('switch', { name: /full.?screen/i }))
    expect(Object.values(localStorage).some(v => v === 'true')).toBe(true)
  })
})

describe('MobilePlayersSection', () => {
  it('stores the VLC switch as a local preference', async () => {
    renderWithApp(<MobilePlayersSection />)
    await userEvent.click(screen.getByRole('switch', { name: /VLC/i }))
    expect(localStorage.getItem('isVlcUsed')).toBe('true')
    await userEvent.click(screen.getByRole('switch', { name: /VLC/i }))
    expect(localStorage.getItem('isVlcUsed')).toBe('false')
  })
})

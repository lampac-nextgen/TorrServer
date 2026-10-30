// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { axiosError, calls, routeApi } from '../test/mockApi'
import { renderWithApp } from '../test/renderWithApp'
import { OPEN_SETTINGS_EVENT } from 'shared/lib/settingsEvents'

import Shell from './Shell'

vi.mock('axios', async () => (await import('../test/mockApi')).axiosModule)
vi.mock('sonner', () => ({
  toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn(), warning: vi.fn() }),
  Toaster: () => null,
}))
// The library page has its own tests; Shell only hosts it.
vi.mock('features/torrents/TorrentsPage', () => ({
  default: (props: { sortABC: boolean; sortCategory: string }) => (
    <div data-testid='library' data-sort-abc={String(props.sortABC)} data-category={props.sortCategory} />
  ),
}))
vi.mock('features/pwa/AndroidInstallBanner', () => ({ default: () => null }))

const routes = (over: Record<string, unknown> = {}) =>
  routeApi({
    'GET /echo': 'MatriX.141-abcdef',
    'POST /torrents': [],
    'POST /settings': { CacheSize: 64 * 1024 * 1024 },
    'GET /storage/settings': { settings: 'json', viewed: 'bbolt' },
    'GET /gst/settings': { built_in: false },
    'GET /runtime/status': {},
    'GET /waf': { whitelist: '', blacklist: '', referers: '', warnings: [] },
    ...over,
  })

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  vi.clearAllMocks()
})

describe('Shell', () => {
  it('shows the short server version from /echo and hosts the library page', async () => {
    routes()
    renderWithApp(<Shell />)
    expect(await screen.findByText('MatriX.141')).toBeTruthy()
    expect(screen.getByTestId('library')).toBeTruthy()
  })

  it('shows no version when /echo fails', async () => {
    routes({
      'GET /echo': () => {
        throw axiosError(500)
      },
    })
    renderWithApp(<Shell />)
    await screen.findByTestId('library')
    expect(screen.queryByText(/MatriX/)).toBeNull()
  })

  it('persists the sort toggle and passes it to the library', async () => {
    routes()
    renderWithApp(<Shell />)
    expect(screen.getByTestId('library').getAttribute('data-sort-abc')).toBe('false')
    await userEvent.click(screen.getByRole('button', { name: 'Sort by name' }))
    expect(screen.getByTestId('library').getAttribute('data-sort-abc')).toBe('true')
    expect(localStorage.getItem('sortABC')).toBe('true')
    expect(screen.getByRole('button', { name: 'Sort by date' })).toBeTruthy()
  })

  it('collapses the sidebar and remembers it', async () => {
    routes()
    renderWithApp(<Shell />)
    await userEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(localStorage.getItem('sidebarOpen')).toBe('false')
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeTruthy()
  })

  it('cycles the theme light → dark → auto', async () => {
    routes()
    renderWithApp(<Shell />)
    const labels: string[] = []
    for (let i = 0; i < 3; i++) {
      const btn = screen.getByRole('button', { name: /^Theme: / })
      labels.push(btn.getAttribute('aria-label')!)
      await userEvent.click(btn)
    }
    expect(new Set(labels).size).toBe(3)
    expect(screen.getByRole('button', { name: labels[0] })).toBeTruthy()
  })

  it('opens Settings from the deep-link event on the requested tab', async () => {
    routes()
    renderWithApp(<Shell />)
    window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT, { detail: 'access' }))
    expect(await screen.findByRole('tab', { name: 'Access', selected: true })).toBeTruthy()
  })

  it('Ctrl+K opens the command palette, but not while typing in a field', async () => {
    routes()
    renderWithApp(
      <>
        <input aria-label='scratch' />
        <Shell />
      </>,
    )
    await screen.findByTestId('library')
    screen.getByLabelText('scratch').focus()
    fireEvent.keyDown(screen.getByLabelText('scratch'), { key: 'k', ctrlKey: true })
    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent.keyDown(document.body, { key: 'k', ctrlKey: true })
    expect(await screen.findByRole('dialog')).toBeTruthy()
  })

  it('polls the library once on mount', async () => {
    routes()
    renderWithApp(<Shell />)
    await waitFor(() => expect(calls.some(c => c.path === '/torrents')).toBe(true))
  })
})

// @vitest-environment happy-dom
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithApp } from '../test/renderWithApp'
import { routeApi } from '../test/mockApi'

import Shell from './Shell'

vi.mock('axios', async () => (await import('../test/mockApi')).axiosModule)
vi.mock('sonner', () => ({
  toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn(), warning: vi.fn() }),
  Toaster: () => null,
}))
vi.mock('features/torrents/TorrentsPage', () => ({ default: () => <div data-testid='library' /> }))
vi.mock('features/pwa/AndroidInstallBanner', () => ({ default: () => null }))
vi.mock('features/pwa/PWAInstallationGuide', () => ({ default: () => <div data-testid='ios-guide' /> }))
vi.mock('features/donate/DonateSnackbar', () => ({ default: () => <div data-testid='donate-snackbar' /> }))

const MAGNET = 'magnet:?xt=urn:btih:0123456789abcdef0123456789abcdef01234567'

const routes = () =>
  routeApi({
    'GET /echo': 'MatriX.141',
    'POST /torrents': [],
    'POST /settings': { CacheSize: 64 * 1024 * 1024 },
    'GET /settings': { CacheSize: 64 * 1024 * 1024 },
    'GET /storage/settings': { settings: 'json', viewed: 'bbolt' },
    'GET /gst/settings': { built_in: false },
    'GET /runtime/status': {},
    'GET /waf': { whitelist: '', blacklist: '', referers: '', warnings: [] },
  })

function matchMedia(matches: (q: string) => boolean) {
  window.matchMedia = ((q: string) => ({
    matches: matches(q),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  })) as unknown as typeof window.matchMedia
}

const MOBILE = (q: string) => q.includes('max-width')

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  window.history.replaceState(null, '', '/')
  matchMedia(() => false)
  vi.clearAllMocks()
  routes()
})

describe('Shell: category filter chip', () => {
  it('names the active category in the header and clears it on click', async () => {
    localStorage.setItem('categoryFilter', JSON.stringify('movie'))
    renderWithApp(<Shell />)
    const chip = await screen.findByRole('button', { name: 'Clear category filter' })
    expect(chip.textContent).toMatch(/Movies/i)
    await userEvent.click(chip)
    expect(screen.queryByRole('button', { name: 'Clear category filter' })).toBeNull()
    expect(JSON.parse(localStorage.getItem('categoryFilter')!)).toBe('all')
  })

  it('shows "Uncategorized" for the empty filter', async () => {
    localStorage.setItem('categoryFilter', JSON.stringify(''))
    renderWithApp(<Shell />)
    expect((await screen.findByRole('button', { name: 'Clear category filter' })).textContent).toContain(
      'Uncategorized',
    )
  })
})

describe('Shell: launch handoff', () => {
  it('opens Add with a source handed over by the OS (share target / protocol handler)', async () => {
    window.history.replaceState(null, '', `/?magnet=${encodeURIComponent(MAGNET)}`)
    renderWithApp(<Shell />)
    const field = await screen.findByRole('textbox', { name: 'Torrent source' })
    expect((field as HTMLTextAreaElement).value).toBe(MAGNET)
    expect(window.location.search).toBe('')
  })

  it('opens the multi-add dialog for .torrent files from the file handler', async () => {
    let consumer!: (p: { files: { getFile: () => Promise<File> }[] }) => Promise<void>
    window.launchQueue = { setConsumer: cb => (consumer = cb as typeof consumer) }
    renderWithApp(<Shell />)
    await screen.findByTestId('library')
    await waitFor(() => expect(consumer).toBeTruthy())
    await consumer({ files: [{ getFile: async () => new File(['x'], 'a.torrent') }] })
    expect(await screen.findByText(/a\.torrent/)).toBeTruthy()
    delete window.launchQueue
  })
})

describe('Shell: command palette actions', () => {
  const openPalette = async () => {
    renderWithApp(<Shell />)
    await screen.findByTestId('library')
    fireEvent.keyDown(document.body, { key: 'k', metaKey: true })
    return within(await screen.findByRole('dialog'))
  }

  it.each([
    ['Add new torrent', 'Torrent source'],
    ['Search', 'Search Torrents'],
    ['About', /About/],
    ['Server status', /status/i],
  ])('runs "%s"', async (command, expected) => {
    const palette = await openPalette()
    await userEvent.click(palette.getByRole('button', { name: new RegExp(`^${command}`, 'i') }))
    await waitFor(() => {
      const text =
        typeof expected === 'string'
          ? (screen.queryByText(expected) ?? screen.queryByRole('textbox', { name: expected }))
          : screen.queryAllByText(expected)[0]
      expect(text).toBeTruthy()
    })
  })

  it('cycles the theme from the palette', async () => {
    const palette = await openPalette()
    const before = screen.getByRole('button', { name: /^Theme: / }).getAttribute('aria-label')
    await userEvent.click(palette.getByRole('button', { name: /^Theme/ }))
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /^Theme: / }).getAttribute('aria-label')).not.toBe(before),
    )
  })
})

describe('Shell: phone layout', () => {
  beforeEach(() => matchMedia(MOBILE))

  it('uses the bottom nav and opens Add, Search and Category from it', async () => {
    renderWithApp(<Shell />)
    await screen.findByTestId('library')
    expect(screen.queryByRole('button', { name: 'Collapse sidebar' })).toBeNull()
    const nav = document.querySelector('.ts-bottom-nav') as HTMLElement

    await userEvent.click(within(nav).getByRole('button', { name: 'Add' }))
    expect(await screen.findByRole('textbox', { name: 'Torrent source' })).toBeTruthy()
    await userEvent.keyboard('{Escape}')

    await userEvent.click(within(nav).getByRole('button', { name: 'Category' }))
    expect(await screen.findByRole('button', { name: 'Uncategorized' })).toBeTruthy()
  })

  it('offers Log out when Basic credentials are stored', async () => {
    sessionStorage.setItem('torrserver.basicAuth', JSON.stringify({ username: 'u', password: 'p' }))
    renderWithApp(<Shell />)
    await screen.findByTestId('library')
    const nav = document.querySelector('.ts-bottom-nav') as HTMLElement
    await userEvent.click(within(nav).getByRole('button', { name: 'More' }))
    expect(await screen.findByRole('button', { name: 'Log out' })).toBeTruthy()
  })
})

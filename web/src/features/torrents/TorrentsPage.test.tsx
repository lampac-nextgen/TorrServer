// @vitest-environment happy-dom
import axios from 'axios'
import { toast } from 'sonner'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor, within } from '@testing-library/react'

import { LibraryHeaderPortal, LibraryHeaderSlotHost, LibraryHeaderSlotProvider } from 'app/LibraryHeaderSlot'
import type { TorrentStat } from 'shared/api/types'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'
import { renderWithProviders } from '@/test/renderWithProviders'

import TorrentsPage, { type TorrentsPageProps } from './TorrentsPage'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    isCancel: () => false,
    isAxiosError: (err: unknown) => Boolean((err as { isAxiosError?: boolean })?.isAxiosError),
  },
}))
vi.mock('sonner', () => ({ toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn(), warning: vi.fn() }) }))

const logoutBasicAuth = vi.fn()
vi.mock('shared/api/authCredentials', async importOriginal => ({
  ...(await importOriginal<typeof import('shared/api/authCredentials')>()),
  logoutBasicAuth: () => logoutBasicAuth(),
}))

const IN_DB = 5
const WORKING = 3
const row = (hash: string, title: string, extra: Partial<TorrentStat> = {}): TorrentStat =>
  ({ hash, title, stat: IN_DB, timestamp: 0, ...extra }) as unknown as TorrentStat

const A = 'a'.repeat(40)
const B = 'b'.repeat(40)
const C = 'c'.repeat(40)
const LIBRARY = [
  row(A, 'Alpha', { timestamp: 100, category: 'movie' }),
  row(B, 'Bravo', { timestamp: 300, category: 'tv' }),
  row(C, 'Charlie', { timestamp: 200 }),
]

let listResponse: () => Promise<{ data: TorrentStat[] }>
/** Mutations the server should reject, by action. */
let failActions: Set<string>
const mutations = () =>
  vi
    .mocked(axios.post)
    .mock.calls.map(([, body]) => body as { action?: string; hash?: string })
    .filter(body => body?.action && !['list', 'listall'].includes(body.action))

// Cards ask GET /mediabase for the external-player origin; answer it, never hit a network.
const fetchMock = vi.fn(
  async () => new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } }),
)

afterEach(() => vi.unstubAllGlobals())

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock)
  localStorage.clear()
  logoutBasicAuth.mockClear()
  for (const fn of [toast, toast.success, toast.error, toast.warning]) vi.mocked(fn).mockClear()
  failActions = new Set()
  listResponse = async () => ({ data: LIBRARY })
  vi.mocked(axios.get).mockReset().mockResolvedValue({ data: {} })
  vi.mocked(axios.post)
    .mockReset()
    .mockImplementation(async (_url, body) => {
      const action = (body as { action?: string })?.action
      if (action === 'list') return listResponse()
      if (action && failActions.has(action)) throw { isAxiosError: true, message: 'x', response: { status: 500 } }
      return { data: [] }
    })
})

function renderPage(props: Partial<TorrentsPageProps> = {}) {
  return renderWithProviders(
    <ModalOpenProvider>
      <AppSnackbarProvider>
        <LibraryHeaderSlotProvider>
          <LibraryHeaderSlotHost />
          <TorrentsPage sortABC={false} sortCategory='all' {...props} />
        </LibraryHeaderSlotProvider>
      </AppSnackbarProvider>
    </ModalOpenProvider>,
  )
}

const shown = (container: HTMLElement) =>
  [...container.querySelectorAll('article[data-hash]')].map(el => el.getAttribute('data-hash'))
const card = (container: HTMLElement, hash: string) =>
  container.querySelector<HTMLElement>(`article[data-hash="${hash}"]`)!

// LibraryHeaderPortal is referenced so a tree-shaken import does not hide a rename.
void LibraryHeaderPortal

describe('TorrentsPage states', () => {
  it('shows skeleton tiles while the list loads, with no cards or empty state', async () => {
    listResponse = () => new Promise(() => {})
    const { container } = renderPage()
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)
    expect(shown(container)).toEqual([])
    expect(screen.queryByText('No torrents added')).toBeNull()
  })

  it('shows the empty library with a working "add" button', async () => {
    listResponse = async () => ({ data: [] })
    const onAdd = vi.fn()
    renderPage({ onAdd })
    expect(await screen.findByText('No torrents added')).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Add your first torrent' }))
    expect(onAdd).toHaveBeenCalledTimes(1)
  })

  it('disables the empty-state add button when the page has no add handler', async () => {
    listResponse = async () => ({ data: [] })
    renderPage()
    const button = await screen.findByRole('button', { name: 'Add your first torrent' })
    expect(button.hasAttribute('disabled') || button.getAttribute('aria-disabled') === 'true').toBe(true)
  })

  it('shows "no connection" on a failed list and retries on request', async () => {
    listResponse = async () => {
      throw { isAxiosError: true, message: 'Network Error' }
    }
    renderPage()
    expect(await screen.findByText('No connection to server', {}, { timeout: 5000 })).toBeTruthy()
    const listCalls = () =>
      vi.mocked(axios.post).mock.calls.filter(([, b]) => (b as { action?: string }).action === 'list').length
    const before = listCalls()

    listResponse = async () => ({ data: LIBRARY })
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(listCalls()).toBeGreaterThan(before))
    await waitFor(() => expect(screen.queryByText('No connection to server')).toBeNull())
  })

  it.each([401, 403])('shows the sign-in prompt on a %i and signs out through logoutBasicAuth', async status => {
    listResponse = async () => {
      throw { isAxiosError: true, message: 'denied', response: { status } }
    }
    renderPage()
    expect(await screen.findByText('Authentication required', {}, { timeout: 5000 })).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(logoutBasicAuth).toHaveBeenCalledTimes(1)
  })

  it('leaves exactly one observer on the list query: the page does not start a second poller', async () => {
    const { container, queryClient } = renderPage()
    await waitFor(() => expect(shown(container)).toHaveLength(3))
    // ImportLibraryDialog stays mounted with `enabled: open`, so it is a disabled observer; only enabled ones poll.
    const observers = queryClient.getQueryCache().find({ queryKey: ['torrents'] })?.observers ?? []
    expect(observers.filter(observer => observer.options.enabled !== false)).toHaveLength(1)
  })
})

describe('TorrentsPage library', () => {
  it('lists newest first by default and A–Z when sorted', async () => {
    const { container, rerender } = renderPage()
    await waitFor(() => expect(shown(container)).toEqual([B, C, A]))
    rerender(
      <ModalOpenProvider>
        <AppSnackbarProvider>
          <LibraryHeaderSlotProvider>
            <LibraryHeaderSlotHost />
            <TorrentsPage sortABC sortCategory='all' />
          </LibraryHeaderSlotProvider>
        </AppSnackbarProvider>
      </ModalOpenProvider>,
    )
    await waitFor(() => expect(shown(container)).toEqual([A, B, C]))
  })

  it.each([
    ['a category', 'movie', [A]],
    ['the empty (uncategorized) category', '', [C]],
  ])('filters by %s', async (_name, sortCategory, expected) => {
    const { container } = renderPage({ sortCategory })
    await waitFor(() => expect(shown(container)).toEqual(expected))
  })

  it('offers "Show all" in an empty category and calls onClearCategory', async () => {
    const onClearCategory = vi.fn()
    renderPage({ sortCategory: 'music', onClearCategory })
    expect(await screen.findByText('No torrents in this category')).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Show all' }))
    expect(onClearCategory).toHaveBeenCalledTimes(1)
  })

  it('filters by the header search box and clears it', async () => {
    const { container } = renderPage()
    await waitFor(() => expect(shown(container)).toHaveLength(3))

    await userEvent.type(await screen.findByPlaceholderText('Filter library'), 'brav')
    await waitFor(() => expect(shown(container)).toEqual([B]))

    await userEvent.clear(screen.getByPlaceholderText('Filter library'))
    await userEvent.type(screen.getByPlaceholderText('Filter library'), 'zzz')
    expect(await screen.findByText('No matches')).toBeTruthy()
    await userEvent.click(screen.getAllByRole('button', { name: 'Clear' }).at(-1)!)
    await waitFor(() => expect(shown(container)).toHaveLength(3))
  })

  it('does not request anything but the list while browsing', async () => {
    const { container } = renderPage({ sortCategory: 'tv' })
    await waitFor(() => expect(shown(container)).toEqual([B]))
    expect(mutations()).toEqual([])
  })
})

describe('TorrentsPage card actions', () => {
  const openMenu = async (container: HTMLElement, hash: string) => {
    await waitFor(() => expect(card(container, hash)).toBeTruthy())
    await userEvent.click(within(card(container, hash)).getByRole('button', { name: 'Actions' }))
  }

  it('drop asks first, then posts action drop and keeps the row as idle', async () => {
    listResponse = async () => ({ data: [row(A, 'Alpha', { stat: WORKING, download_speed: 5 })] })
    const { container, queryClient } = renderPage()
    await openMenu(container, A)
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Reset Torrent' }))
    expect(mutations()).toEqual([])

    // After the drop the server reports the row as idle.
    listResponse = async () => ({ data: [row(A, 'Alpha')] })
    await userEvent.click(await screen.findByRole('button', { name: 'OK' }))
    await waitFor(() => expect(mutations()).toEqual([{ action: 'drop', hash: A }]))
    expect(toast.success).toHaveBeenCalled()
    expect(queryClient.getQueryData<TorrentStat[]>(['torrents'])?.[0]).toMatchObject({ hash: A, stat: IN_DB })
  })

  it('cancel in the confirm dialog sends nothing', async () => {
    const { container } = renderPage()
    await openMenu(container, A)
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Delete' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Cancel' }))
    expect(mutations()).toEqual([])
    expect(shown(container)).toContain(A)
  })

  it('delete posts action rem and removes the card', async () => {
    const { container } = renderPage()
    await openMenu(container, A)
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Delete' }))
    expect(await screen.findByText(/can't be undone/)).toBeTruthy()
    // The list GET after the delete answers without the row, like the server would.
    listResponse = async () => ({ data: LIBRARY.filter(item => item.hash !== A) })
    await userEvent.click(screen.getByRole('button', { name: 'OK' }))

    await waitFor(() => expect(mutations()).toEqual([{ action: 'rem', hash: A }]))
    await waitFor(() => expect(shown(container)).not.toContain(A))
  })

  it('puts the card back and shows an error when the server rejects the delete', async () => {
    failActions = new Set(['rem'])
    const { container } = renderPage()
    await openMenu(container, A)
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Delete' }))
    await userEvent.click(await screen.findByRole('button', { name: 'OK' }))

    await waitFor(() => expect(toast.error).toHaveBeenCalled())
    expect(shown(container)).toContain(A)
  })

  it('bulk select: drop posts one drop per selected hash, delete posts one rem per hash', async () => {
    const { container } = renderPage()
    await waitFor(() => expect(shown(container)).toHaveLength(3))

    await userEvent.click(await screen.findByRole('button', { name: 'Select' }))
    await userEvent.click(within(card(container, A)).getByRole('button', { name: 'Alpha' }))
    await userEvent.click(within(card(container, B)).getByRole('button', { name: 'Bravo' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Reset Torrent (2)' }))

    await waitFor(() => expect(mutations()).toHaveLength(2))
    expect(mutations()).toEqual(
      expect.arrayContaining([
        { action: 'drop', hash: A },
        { action: 'drop', hash: B },
      ]),
    )

    await userEvent.click(await screen.findByRole('button', { name: 'Select' }))
    await userEvent.click(within(card(container, C)).getByRole('button', { name: 'Charlie' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Delete (1)' }))
    await waitFor(() => expect(mutations()).toContainEqual({ action: 'rem', hash: C }))
    expect(mutations()).toHaveLength(3)
  })
})

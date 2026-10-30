// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { isDisabled } from '../../test/dom'
import { axiosError, callsTo, routeApi } from '../../test/mockApi'
import { renderWithApp } from '../../test/renderWithApp'

import CloseServerDialog from './CloseServerDialog'
import RemoveAllDialog from './RemoveAllDialog'
import ServerStatusDialog from './ServerStatusDialog'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)

const MB = 1024 * 1024
const status = {
  dlna_enabled: true,
  bonjour_enabled: false,
  webdav_enabled: false,
  fuse_enabled: true,
  fuse_path: '/mnt/ts',
  friendly_name: 'Living room',
  bt: {
    listen_port: 6881,
    torrent_count: 2,
    active_streams: 1,
    active_peers: 4,
    total_peers: 9,
    peer_id: '-qB4390-abc',
    loaded_size: 32 * MB,
    torrents: [
      {
        hash: 'aaaaaaaaaaaaaaaa',
        title: 'Live movie',
        stat: 3,
        stat_string: 'Torrent working',
        torrent_size: 700 * MB,
      },
      { hash: 'bbbbbbbbbbbbbbbb', title: 'Idle movie', stat: 5 },
    ],
    raw_stat: 'RAW-DUMP',
  },
  memory: { num_goroutine: 42, heap_inuse: 10 * MB, cache_filled: 8 * MB, cache_capacity: 64 * MB },
  caches: [{ hash: 'cccccccc11111111', filled: 8 * MB, capacity: 64 * MB, closed: true }],
}

describe('ServerStatusDialog', () => {
  it('renders runtime data: counters, live torrents only, closed cache row, raw dump', async () => {
    routeApi({ 'GET /runtime/status': status, 'POST /settings': { CacheSize: 64 * MB } })
    renderWithApp(<ServerStatusDialog open onClose={vi.fn()} />)
    expect(await screen.findByText('6881')).toBeTruthy()
    expect(screen.getByText('42')).toBeTruthy()
    expect(screen.getByText('Live movie')).toBeTruthy()
    expect(screen.queryByText('Idle movie')).toBeNull()
    expect(screen.getByText(/cccccccc….*closed/)).toBeTruthy()
    expect(screen.getByText('/mnt/ts')).toBeTruthy()
    expect(screen.getByText('Living room')).toBeTruthy()
    expect(screen.getByText('RAW-DUMP')).toBeTruthy()
    expect(screen.getByText(/Peer ID: -qB4390-abc/)).toBeTruthy()
  })

  it('shows an error when the status request fails, and Refresh recovers', async () => {
    let fail = true
    routeApi({
      'GET /runtime/status': () => {
        if (fail) throw axiosError(500)
        return status
      },
      'POST /settings': {},
    })
    renderWithApp(<ServerStatusDialog open onClose={vi.fn()} />)
    expect(await screen.findByText('Error')).toBeTruthy()
    fail = false
    await userEvent.click(screen.getByRole('button', { name: 'Refresh' }))
    expect(await screen.findByText('6881')).toBeTruthy()
  })

  it('does not request anything while closed', async () => {
    routeApi({ 'GET /runtime/status': status, 'POST /settings': {} })
    renderWithApp(<ServerStatusDialog open={false} onClose={vi.fn()} />)
    await act(async () => {})
    expect(callsTo('GET', '/runtime/status')).toHaveLength(0)
  })

  it('polls every 2.5 s while open', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    try {
      routeApi({ 'GET /runtime/status': status, 'POST /settings': {} })
      renderWithApp(<ServerStatusDialog open onClose={vi.fn()} />)
      await screen.findByText('6881')
      const first = callsTo('GET', '/runtime/status').length
      await act(async () => {
        await vi.advanceTimersByTimeAsync(2600)
      })
      expect(callsTo('GET', '/runtime/status').length).toBeGreaterThan(first)
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('destructive dialogs', () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }))
  afterEach(() => vi.useRealTimers())

  it('Turn off stays disabled for the countdown, then calls /shutdown and closes', async () => {
    routeApi({ 'GET /shutdown': null })
    const onClose = vi.fn()
    renderWithApp(<CloseServerDialog open onClose={onClose} />)
    const off = screen.getByRole('button', { name: /Turn off/i })
    expect(isDisabled(off)).toBe(true)
    expect(off.textContent).toMatch(/\(5\)/)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5500)
    })
    expect(isDisabled(screen.getByRole('button', { name: /Turn off/i }))).toBe(false)
    await userEvent.click(screen.getByRole('button', { name: /Turn off/i }))
    expect(callsTo('GET', '/shutdown')).toHaveLength(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Cancel closes without touching the server', async () => {
    routeApi({})
    const onClose = vi.fn()
    renderWithApp(<CloseServerDialog open onClose={onClose} />)
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onClose).toHaveBeenCalled()
    expect(callsTo('GET', '/shutdown')).toHaveLength(0)
  })

  it('Remove all wipes the library after the countdown and refreshes the list', async () => {
    routeApi({ 'POST /torrents': [] })
    const onClose = vi.fn()
    renderWithApp(<RemoveAllDialog open onClose={onClose} />)
    expect(isDisabled(screen.getByRole('button', { name: /OK/ }))).toBe(true)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5500)
    })
    await userEvent.click(screen.getByRole('button', { name: /OK/ }))
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(callsTo('POST', '/torrents').map(c => (c.body as { action: string }).action)).toEqual(['wipe'])
  })
})

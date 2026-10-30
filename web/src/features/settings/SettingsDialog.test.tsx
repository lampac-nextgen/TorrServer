// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithApp } from '../../test/renderWithApp'
import { isDisabled } from '../../test/dom'
import { axiosError, callsTo, postBodies, routeApi } from '../../test/mockApi'

import SettingsDialog from './SettingsDialog'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)

const toastMock = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
}))
vi.mock('sonner', () => ({
  toast: Object.assign(vi.fn(), toastMock),
  Toaster: () => null,
}))

const MB = 1024 * 1024
const server = {
  CacheSize: 128 * MB,
  ReaderReadAHead: 80,
  PreloadCache: 30,
  StoreViewedInJson: true,
  UseDisk: false,
}

function open(onClose = vi.fn()) {
  renderWithApp(<SettingsDialog open onClose={onClose} />)
  return onClose
}

const saveButton = () => screen.findByRole('button', { name: 'Save' })

beforeEach(() => {
  vi.clearAllMocks()
})

describe('SettingsDialog load', () => {
  it('keeps Save disabled when GET /settings fails, and enables it once the load succeeds', async () => {
    routeApi({
      'POST /settings': () => {
        throw axiosError(500)
      },
      'GET /storage/settings': { settings: 'json', viewed: 'bbolt' },
      'GET /gst/settings': { built_in: false },
    })
    open()
    expect(isDisabled(await saveButton())).toBe(true)
    await waitFor(() => expect(toastMock.error).toHaveBeenCalled())
    expect(isDisabled(await saveButton())).toBe(true)
  })

  it('enables Save after a successful load', async () => {
    routeApi({
      'POST /settings': server,
      'GET /storage/settings': { settings: 'json', viewed: 'bbolt' },
      'GET /gst/settings': { built_in: false },
    })
    open()
    await waitFor(async () => expect(isDisabled(await saveButton())).toBe(false))
  })
})

describe('SettingsDialog save', () => {
  const happyRoutes = (setHandler?: () => unknown) => ({
    'POST /settings': (req: { body: unknown }) => {
      const body = req.body as { action: string }
      if (body.action === 'set' && setHandler) return setHandler()
      return body.action === 'get' ? server : null
    },
    'GET /storage/settings': { settings: 'bbolt', viewed: 'json' },
    'POST /storage/settings': { status: 'ok' },
    'GET /gst/settings': { built_in: false },
  })

  it('sends CacheSize in bytes with integer fields, round-trips StoreViewedInJson, writes storage, closes', async () => {
    routeApi(happyRoutes())
    const onClose = open()
    const save = await saveButton()
    await waitFor(() => expect(isDisabled(save)).toBe(false))
    await userEvent.click(save)

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
    const sets = (
      postBodies('/settings').find(b => (b as { action: string }).action === 'set') as { sets: Record<string, unknown> }
    ).sets
    expect(sets.CacheSize).toBe(128 * MB)
    for (const key of [
      'CacheSize',
      'ReaderReadAHead',
      'PreloadCache',
      'ConnectionsLimit',
      'TorrentDisconnectTimeout',
      'RetrackersMode',
    ]) {
      expect(Number.isInteger(sets[key]), key).toBe(true)
    }
    expect(sets.StoreViewedInJson).toBe(true)
    expect(postBodies('/storage/settings')).toEqual([{ settings: 'bbolt', viewed: 'json' }])
    expect(toastMock.success).toHaveBeenCalledWith('Saved', expect.anything())
  })

  it('on 403 shows the read-only message and keeps the dialog open', async () => {
    routeApi(
      happyRoutes(() => {
        throw axiosError(403, { error: 'Read-only mode' })
      }),
    )
    const onClose = open()
    const save = await saveButton()
    await waitFor(() => expect(isDisabled(save)).toBe(false))
    await userEvent.click(save)

    await waitFor(() =>
      expect(toastMock.error).toHaveBeenCalledWith('Server is read-only. Settings were not saved.', expect.anything()),
    )
    expect(onClose).not.toHaveBeenCalled()
    expect(callsTo('POST', '/storage/settings')).toHaveLength(0)
    expect(isDisabled(await saveButton())).toBe(false)
  })

  it('skips the storage write when /storage/settings failed to load, and says so', async () => {
    routeApi({
      ...happyRoutes(),
      'GET /storage/settings': () => {
        throw axiosError(500)
      },
    })
    const onClose = open()
    const save = await saveButton()
    await waitFor(() => expect(isDisabled(save)).toBe(false))
    await userEvent.click(save)

    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(callsTo('POST', '/storage/settings')).toHaveLength(0)
    expect(toastMock.success).toHaveBeenCalledWith('Saved (storage backends unchanged)', expect.anything())
  })

  it('shows the server error text for a non-403 failure', async () => {
    routeApi(
      happyRoutes(() => {
        throw axiosError(400, { error: 'bad sets' })
      }),
    )
    const onClose = open()
    const save = await saveButton()
    await waitFor(() => expect(isDisabled(save)).toBe(false))
    await userEvent.click(save)
    await waitFor(() => expect(toastMock.error).toHaveBeenCalledWith('bad sets', expect.anything()))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('reset to default posts action def and reloads the settings', async () => {
    routeApi(happyRoutes())
    open()
    await waitFor(async () => expect(isDisabled(await saveButton())).toBe(false))
    await userEvent.click(screen.getAllByRole('button', { name: 'Defaults' })[0])
    await waitFor(() => expect(postBodies('/settings')).toContainEqual({ action: 'def' }))
    await waitFor(() =>
      expect(
        callsTo('POST', '/settings').filter(c => (c.body as { action: string }).action === 'get').length,
      ).toBeGreaterThan(1),
    )
  })
})

describe('SettingsDialog tabs', () => {
  it('shows the Torznab tab and hides GStreamer on a build without it', async () => {
    routeApi({
      'POST /settings': server,
      'GET /storage/settings': { settings: 'json', viewed: 'bbolt' },
      'GET /gst/settings': { built_in: false },
    })
    open()
    await waitFor(async () => expect(isDisabled(await saveButton())).toBe(false))
    const tablist = screen.getByRole('tablist')
    expect(within(tablist).getByRole('tab', { name: /torznab/i })).toBeTruthy()
    expect(within(tablist).queryByRole('tab', { name: /gstreamer/i })).toBeNull()
  })
})

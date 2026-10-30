// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { isDisabled } from '../../test/dom'
import { callsTo, postBodies, routeApi } from '../../test/mockApi'
import { renderWithApp } from '../../test/renderWithApp'

import SettingsDialog from './SettingsDialog'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)
vi.mock('sonner', () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  }),
  Toaster: () => null,
}))

const gst = {
  built_in: true,
  config: { MaxTasks: 2, VideoBitrate: 8000, TranscodeAVI: false },
  defaults: { MaxTasks: 0, VideoBitrate: 10000 },
}

function setup(gstBody: unknown = gst) {
  routeApi({
    'POST /settings': (req: { body: unknown }) =>
      (req.body as { action: string }).action === 'get' ? { CacheSize: 64 * 1024 * 1024 } : null,
    'GET /storage/settings': { settings: 'json', viewed: 'bbolt' },
    'POST /storage/settings': { status: 'ok' },
    'GET /gst/settings': gstBody,
    'POST /gst/settings': null,
    'GET /gst/echo': {
      gstreamer: { works: true },
      gst_discoverer: { found: true },
    },
  })
  const onClose = vi.fn()
  renderWithApp(<SettingsDialog open onClose={onClose} />)
  return onClose
}

const openGstTab = async () => userEvent.click(await screen.findByRole('tab', { name: 'GStreamer' }))

describe('GStreamer settings tab', () => {
  it('is absent when the build has no GStreamer', async () => {
    setup({ built_in: false })
    await waitFor(async () => expect(isDisabled(await screen.findByRole('button', { name: 'Save' }))).toBe(false))
    expect(screen.queryByRole('tab', { name: 'GStreamer' })).toBeNull()
    expect(callsTo('POST', '/gst/settings')).toHaveLength(0)
  })

  it('shows the runtime probe and saves integer-only config with the other settings', async () => {
    const onClose = setup()
    await openGstTab()
    await waitFor(() => expect(document.body.textContent).toMatch(/GStreamer runtime: .*gst-discoverer: /))

    const bitrate = (await screen.findByLabelText('Video bitrate (kbps)')) as HTMLInputElement
    expect(bitrate.value).toBe('8000')
    await userEvent.clear(bitrate)
    await userEvent.type(bitrate, '4500.6')

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    const body = postBodies('/gst/settings').find(b => (b as { action: string }).action === 'set') as {
      config: Record<string, unknown>
    }
    expect(body.config.VideoBitrate).toBe(4501)
    expect(body.config.MaxTasks).toBe(2)
    expect(Number.isInteger(body.config.SegmentSeconds)).toBe(true)
  })

  it('reset loads the server defaults back into the form', async () => {
    setup()
    await openGstTab()
    await screen.findByLabelText('Video bitrate (kbps)')
    // The tab's own reset comes first in the DOM; the footer one resets BTSets.
    await userEvent.click(screen.getAllByRole('button', { name: 'Defaults' })[0])
    await waitFor(() => expect(postBodies('/gst/settings')).toContainEqual({ action: 'def' }))
  })
})

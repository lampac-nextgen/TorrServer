// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { isDisabled } from '../../test/dom'
import { postBodies, routeApi } from '../../test/mockApi'
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

const MB = 1024 * 1024

async function openLoaded(server: Record<string, unknown> = {}, storage: Record<string, unknown> = {}) {
  routeApi({
    'POST /settings': (req: { body: unknown }) =>
      (req.body as { action: string }).action === 'get' ? { CacheSize: 64 * MB, ...server } : null,
    'GET /storage/settings': { settings: 'json', viewed: 'bbolt', ...storage },
    'POST /storage/settings': { status: 'ok' },
    'GET /gst/settings': { built_in: false },
  })
  const onClose = vi.fn()
  renderWithApp(<SettingsDialog open onClose={onClose} />)
  await waitFor(async () => expect(isDisabled(await screen.findByRole('button', { name: 'Save' }))).toBe(false))
  return onClose
}

const savedSets = () =>
  (postBodies('/settings').find(b => (b as { action: string }).action === 'set') as { sets: Record<string, unknown> })
    .sets

const save = async () => userEvent.click(screen.getByRole('button', { name: 'Save' }))

describe('SettingsDialog panels feed the saved payload', () => {
  it('converts the cache size field from megabytes to bytes', async () => {
    const onClose = await openLoaded()
    const field = screen.getByRole('spinbutton') as HTMLInputElement
    expect(field.value).toBe('64')
    await userEvent.clear(field)
    await userEvent.type(field, '512')
    await save()
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(savedSets().CacheSize).toBe(512 * MB)
  })

  it('clamps a too-small cache size to the 16 MB minimum on blur', async () => {
    const onClose = await openLoaded()
    const field = screen.getByRole('spinbutton') as HTMLInputElement
    await userEvent.clear(field)
    await userEvent.type(field, '4')
    await userEvent.tab()
    expect(field.value).toBe('16')
    await save()
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(savedSets().CacheSize).toBe(16 * MB)
  })

  it('stores the Network DHT switch inverted as DisableDHT', async () => {
    const onClose = await openLoaded({ DisableDHT: false })
    await userEvent.click(screen.getByRole('tab', { name: 'Network' }))
    const dht = await screen.findByRole('switch', { name: /DHT/ })
    expect((dht as HTMLInputElement).checked).toBe(true)
    await userEvent.click(dht)
    await save()
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(savedSets().DisableDHT).toBe(true)
  })

  it('never sends a fractional or empty integer field', async () => {
    const onClose = await openLoaded({ ConnectionsLimit: 40 })
    await userEvent.click(screen.getByRole('tab', { name: 'Network' }))
    const limit = (await screen.findByLabelText('Connections Limit')) as HTMLInputElement
    await userEvent.clear(limit)
    await userEvent.type(limit, '42.7')
    await userEvent.tab()
    expect(limit.value).toBe('43')
    await userEvent.clear(limit)
    await userEvent.tab()
    expect(limit.value).toBe('25')
    await save()
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(savedSets().ConnectionsLimit).toBe(25)
  })

  it('changes the storage backend through POST /storage/settings, not through BTSets', async () => {
    const onClose = await openLoaded({ StoreViewedInJson: true })
    await userEvent.click(screen.getByRole('tab', { name: 'Storage' }))
    await userEvent.click(await screen.findByRole('button', { name: /Settings storage/i }))
    await userEvent.click(await screen.findByRole('option', { name: /BBolt/ }))
    await save()
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(postBodies('/storage/settings')).toEqual([{ settings: 'bbolt', viewed: 'bbolt' }])
    // Present on GET, so it goes back on SET; there is no control for it.
    expect(savedSets().StoreViewedInJson).toBe(true)
  })

  it('opens on the requested tab', async () => {
    routeApi({
      'POST /settings': {},
      'GET /storage/settings': { settings: 'json', viewed: 'bbolt' },
      'GET /gst/settings': { built_in: false },
    })
    renderWithApp(<SettingsDialog open onClose={vi.fn()} initialTab='torznab' />)
    expect(await screen.findByText('Add server', { selector: 'h3' })).toBeTruthy()
  })
})

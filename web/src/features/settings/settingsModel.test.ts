import { AxiosError } from 'axios'
import { describe, expect, it, vi } from 'vitest'

import type { BTSets } from 'shared/api/types'
import { sanitizeBTSetsForWire } from 'shared/api/settings'

import {
  applyLoadedSettings,
  buildSettingsPayload,
  cacheBytesToMb,
  isSaveDisabled,
  saveErrorMessage,
} from './settingsModel'

vi.hoisted(() => {
  // shared/api/hosts reads window.location at import time.
  vi.stubGlobal('window', { location: { protocol: 'http:', hostname: '127.0.0.1', port: '8090' } })
})

const MB = 1024 * 1024
const seed: BTSets = { CacheSize: 64, ReaderReadAHead: 95, PreloadCache: 50, FriendlyName: '' }
const t = (key: string) => `t:${key}`

const httpError = (status: number, data?: unknown) =>
  new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, undefined, {
    status,
    data,
    statusText: '',
    headers: {},
    config: {} as never,
  })

describe('CacheSize megabytes <-> bytes', () => {
  it('shows server bytes as megabytes in the form and keeps bytes for other readers', () => {
    const loaded = applyLoadedSettings({ CacheSize: 128 * MB, FriendlyName: 'Box' }, seed)
    expect(loaded.cacheSizeMb).toBe(128)
    expect(loaded.form.CacheSize).toBe(128)
    expect(loaded.shared.CacheSize).toBe(128 * MB)
    expect(loaded.form.FriendlyName).toBe('Box')
    expect(loaded.form.ReaderReadAHead).toBe(95)
  })

  it('rounds a non-whole megabyte value from the server', () => {
    expect(cacheBytesToMb(64 * MB + 300_000)).toBe(64)
    expect(cacheBytesToMb(Math.floor(64.6 * MB))).toBe(65)
  })

  it('sends megabytes from the form as bytes on the wire', () => {
    const payload = buildSettingsPayload({ ...seed, CacheSize: 128 }, 256, seed)
    expect(payload.CacheSize).toBe(256 * MB)
    expect(sanitizeBTSetsForWire(payload).CacheSize).toBe(268_435_456)
  })

  it('round-trips a loaded value back to the same bytes', () => {
    const loaded = applyLoadedSettings({ CacheSize: 96 * MB }, seed)
    expect(buildSettingsPayload(loaded.form, loaded.cacheSizeMb, seed).CacheSize).toBe(96 * MB)
  })

  it('a fractional megabyte entry still reaches Go as an integer', () => {
    const wire = sanitizeBTSetsForWire(buildSettingsPayload(seed, 64.5, seed))
    expect(Number.isInteger(wire.CacheSize)).toBe(true)
    expect(wire.CacheSize).toBe(Math.round(64.5 * MB))
  })

  it('fills missing sliders from the seed and keeps StoreViewedInJson that came with GET', () => {
    const loaded = applyLoadedSettings({ CacheSize: 64 * MB, StoreViewedInJson: true }, seed)
    const payload = buildSettingsPayload(
      { ...loaded.form, ReaderReadAHead: undefined, PreloadCache: undefined },
      loaded.cacheSizeMb,
      seed,
    )
    expect(payload.ReaderReadAHead).toBe(95)
    expect(payload.PreloadCache).toBe(50)
    expect(payload.StoreViewedInJson).toBe(true)
  })

  it('does not mutate its inputs', () => {
    const data = { CacheSize: 64 * MB }
    const form = { ...seed }
    applyLoadedSettings(data, seed)
    buildSettingsPayload(form, 64, seed)
    expect(data).toEqual({ CacheSize: 64 * MB })
    expect(form).toEqual(seed)
    expect(seed.CacheSize).toBe(64)
  })
})

describe('Save availability', () => {
  it('is disabled until GET /settings succeeded', () => {
    expect(isSaveDisabled({ loading: true, saving: false, settingsReady: false })).toBe(true)
    // load failed: not loading any more, but never ready -> still disabled
    expect(isSaveDisabled({ loading: false, saving: false, settingsReady: false })).toBe(true)
  })

  it('is enabled only when loaded, idle and ready', () => {
    expect(isSaveDisabled({ loading: false, saving: false, settingsReady: true })).toBe(false)
    expect(isSaveDisabled({ loading: true, saving: false, settingsReady: true })).toBe(true)
    expect(isSaveDisabled({ loading: false, saving: true, settingsReady: true })).toBe(true)
  })
})

describe('saveErrorMessage', () => {
  it('403 is read-only mode, whatever the body says', () => {
    expect(saveErrorMessage(httpError(403, { error: 'Read-only mode' }), t)).toBe('t:SettingsReadOnly')
    expect(saveErrorMessage(httpError(403), t)).toBe('t:SettingsReadOnly')
  })

  it("shows the server's own error for 400 and friends", () => {
    expect(saveErrorMessage(httpError(400, { error: 'settings is nil' }), t)).toBe('settings is nil')
  })

  it('falls back to the error message, then to the generic Error key', () => {
    expect(saveErrorMessage(httpError(500), t)).toBe('Request failed')
    expect(saveErrorMessage(new Error('Failed to save GStreamer settings'), t)).toBe(
      'Failed to save GStreamer settings',
    )
    expect(saveErrorMessage('weird', t)).toBe('t:Error')
    expect(saveErrorMessage(new Error(''), t)).toBe('t:Error')
  })
})

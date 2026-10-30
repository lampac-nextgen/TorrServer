import axios from 'axios'

import type { BTSets } from 'shared/api/types'

const BYTES_PER_MB = 1024 * 1024

/**
 * `SettingsDialog` keeps `CacheSize` in megabytes in its form state; the wire (and the
 * query cache other readers see) is bytes. These helpers are the only conversion points.
 */
export const cacheBytesToMb = (bytes: number): number => Math.round(bytes / BYTES_PER_MB)

export interface LoadedSettings {
  /** Form state: `CacheSize` in megabytes. */
  form: BTSets
  cacheSizeMb: number
  /** What the rest of the app reads from `SETTINGS_QUERY_KEY`: `CacheSize` in bytes. */
  shared: BTSets
}

/** Merge a `GET /settings` body over the client seed. */
export const applyLoadedSettings = (data: BTSets, seed: BTSets): LoadedSettings => {
  // The seed's CacheSize is megabytes (form units); only the server's value is bytes.
  const bytes = data.CacheSize ?? (seed.CacheSize ?? 64) * BYTES_PER_MB
  const mb = cacheBytesToMb(bytes)
  const loaded = { ...seed, ...data }
  return { form: { ...loaded, CacheSize: mb }, cacheSizeMb: mb, shared: { ...loaded, CacheSize: bytes } }
}

/** Body for `POST /settings`: megabytes back to bytes, nullable sliders to the seed. */
export const buildSettingsPayload = (settings: BTSets, cacheSizeMb: number, seed: BTSets): BTSets => ({
  ...settings,
  CacheSize: cacheSizeMb * BYTES_PER_MB,
  ReaderReadAHead: settings.ReaderReadAHead ?? seed.ReaderReadAHead,
  PreloadCache: settings.PreloadCache ?? seed.PreloadCache,
})

/**
 * Save is off while anything is loading or saving, and until `GET /settings` succeeded:
 * a failed load must never let the client seed overwrite the server.
 */
export const isSaveDisabled = (state: { loading: boolean; saving: boolean; settingsReady: boolean }): boolean =>
  state.loading || state.saving || !state.settingsReady

/** Toast text for a failed save: 403 is read-only mode, then the server's `error`, then the message. */
export const saveErrorMessage = (err: unknown, t: (key: string) => string): string => {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 403) return t('SettingsReadOnly')
    const data = err.response?.data as { error?: string } | undefined
    if (data?.error) return String(data.error)
  }
  if (err instanceof Error && err.message) return err.message
  return t('Error')
}

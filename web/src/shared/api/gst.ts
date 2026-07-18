import { gstEchoHost, gstSettingsHost } from 'shared/api/hosts'

export interface GstSettingsResponse {
  built_in?: boolean
  config?: Record<string, unknown>
  defaults?: Record<string, unknown>
  [key: string]: unknown
}

/** Raw fetch (not axios) — GST may be absent; callers handle `built_in: false`. */
export const getGstSettings = async (signal?: AbortSignal): Promise<GstSettingsResponse> => {
  const response = await fetch(gstSettingsHost(), { signal })
  if (!response.ok) throw new Error('Failed to load GStreamer settings')
  return (await response.json()) as GstSettingsResponse
}

export const setGstSettings = async (config: Record<string, unknown>): Promise<void> => {
  const response = await fetch(gstSettingsHost(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'set', config }),
  })
  if (!response.ok) throw new Error('Failed to save GStreamer settings')
}

/** Reset GST pipeline config to platform defaults on the server (`action: def`). */
export const resetGstSettings = async (): Promise<GstSettingsResponse> => {
  const response = await fetch(gstSettingsHost(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'def' }),
  })
  if (!response.ok) throw new Error('Failed to reset GStreamer settings')
  // Server may return empty body — reload so UI gets defaults + current config.
  return getGstSettings()
}

/** Lightweight GST pipeline health probe (plain text body). */
export const getGstEcho = async (signal?: AbortSignal): Promise<string> => {
  const response = await fetch(gstEchoHost(), { signal })
  if (!response.ok) throw new Error('GStreamer echo failed')
  return response.text()
}

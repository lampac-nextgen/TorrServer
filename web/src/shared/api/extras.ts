import axios from 'axios'

import { downloadTestHost, ffpHost, playlistAllHost } from 'shared/api/hosts'

/** Library-wide M3U; optional `category` / `search` query filters. */
export const playlistAllUrl = (opts?: { category?: string; search?: string }): string => {
  const params = new URLSearchParams()
  if (opts?.category) params.set('category', opts.category)
  if (opts?.search) params.set('search', opts.search)
  const query = params.toString()
  return query ? `${playlistAllHost()}?${query}` : playlistAllHost()
}

export interface FfpStream {
  index?: number
  codec_type?: string
  codec_name?: string
  codec_long_name?: string
  profile?: string
  width?: number
  height?: number
  display_aspect_ratio?: string
  pix_fmt?: string
  r_frame_rate?: string
  bit_rate?: string
  duration?: string
  sample_rate?: string
  channels?: number
  channel_layout?: string
  color_space?: string
  color_transfer?: string
  color_primaries?: string
  tags?: Record<string, string>
  [key: string]: unknown
}

export interface FfpProbeResult {
  format?: {
    format_name?: string
    format_long_name?: string
    duration?: string
    bit_rate?: string
    size?: string
    [key: string]: unknown
  }
  streams?: FfpStream[]
  [key: string]: unknown
}

export const fetchFfp = async (hash: string, fileId: number, signal?: AbortSignal): Promise<FfpProbeResult> => {
  const { data } = await axios.get<FfpProbeResult>(ffpHost(hash, fileId), { signal })
  return data
}

/** Runs a synthetic download of `sizeMb` megabytes; returns elapsed ms and approx Mbps. */
export const runSpeedTest = async (
  sizeMb = 10,
  signal?: AbortSignal,
): Promise<{ bytes: number; elapsedMs: number; mbps: number }> => {
  const started = performance.now()
  const response = await fetch(downloadTestHost(sizeMb), { signal, cache: 'no-store' })
  if (!response.ok) throw new Error(`Speed test failed (${response.status})`)
  const buffer = await response.arrayBuffer()
  const elapsedMs = Math.max(1, performance.now() - started)
  const bytes = buffer.byteLength
  const mbps = (bytes * 8) / (elapsedMs / 1000) / 1_000_000
  return { bytes, elapsedMs, mbps }
}

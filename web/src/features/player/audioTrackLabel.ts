/** GStreamer probe result track — field casing varies by backend build, so lookups are case-insensitive. */
export type ProbeTrack = Record<string, unknown>

export function probeField(track: ProbeTrack, key: string): unknown {
  const lowerKey = key.toLowerCase()
  const match = Object.keys(track).find(candidate => candidate.toLowerCase() === lowerKey)
  return match ? track[match] : undefined
}

export function extractAudioTracks(
  probe: { Tracks?: ProbeTrack[]; tracks?: ProbeTrack[] } | null | undefined,
): ProbeTrack[] {
  return (probe?.Tracks || probe?.tracks || []).filter(
    track => String(probeField(track, 'Type') || '').toLowerCase() === 'audio',
  )
}

export interface AudioTrackDisplay {
  /** Primary line — usually the Title tag (e.g. "DUB | HDRezka Studio"). */
  title: string
  /** Secondary line — LANG · CODEC · N ch · rate. */
  meta: string
}

function formatSampleRate(raw: unknown): string | null {
  const rate = Number(raw)
  if (!Number.isFinite(rate) || rate <= 0) return null
  if (rate >= 1000) return `${Math.round(rate / 1000)} kHz`
  return `${rate} Hz`
}

function formatChannels(raw: unknown): string | null {
  const channels = Number(raw)
  if (!Number.isFinite(channels) || channels <= 0) return null
  return `${channels} ch`
}

/** Two-line label for the GST audio-track picker (title + technical meta). */
export function formatAudioTrackDisplay(track: ProbeTrack, index: number): AudioTrackDisplay {
  const lang = String(probeField(track, 'Language') || probeField(track, 'Lang') || '').trim()
  const codec = String(probeField(track, 'Codec') || probeField(track, 'CapsName') || '').trim()
  const trackTitle = String(probeField(track, 'Title') || '').trim()
  const channels = formatChannels(probeField(track, 'Channels'))
  const sampleRate = formatSampleRate(probeField(track, 'Rate'))

  const metaParts = [lang ? lang.toUpperCase() : '', codec, channels, sampleRate].filter(Boolean)
  const meta = metaParts.join(' · ')
  const title = trackTitle || (lang ? lang.toUpperCase() : '') || codec || `Audio ${index + 1}`

  return { title, meta }
}

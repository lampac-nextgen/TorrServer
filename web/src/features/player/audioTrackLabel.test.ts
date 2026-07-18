import { describe, expect, it } from 'vitest'

import { extractAudioTracks, formatAudioTrackDisplay, probeField } from './audioTrackLabel'

describe('audioTrackLabel', () => {
  it('probeField is case-insensitive', () => {
    expect(probeField({ Language: 'ru' }, 'language')).toBe('ru')
    expect(probeField({ language: 'en' }, 'Language')).toBe('en')
  })

  it('extractAudioTracks keeps only audio', () => {
    const tracks = extractAudioTracks({
      Tracks: [
        { Type: 'video', Codec: 'h264' },
        { Type: 'audio', Codec: 'ac3', Title: 'DUB' },
        { type: 'Audio', codec: 'aac' },
        { Type: 'subtitle', Codec: 'srt' },
      ],
    })
    expect(tracks).toHaveLength(2)
    expect(probeField(tracks[0], 'Title')).toBe('DUB')
  })

  it('formats two-line display for the track picker', () => {
    const display = formatAudioTrackDisplay(
      {
        Type: 'audio',
        Title: 'DUB | HDRezka Studio | 18+',
        Language: 'ru',
        Codec: 'AC3',
        Channels: 2,
        Rate: 48000,
      },
      0,
    )
    expect(display.title).toBe('DUB | HDRezka Studio | 18+')
    expect(display.meta).toBe('RU · AC3 · 2 ch · 48 kHz')
  })

  it('falls back when Title is missing', () => {
    const display = formatAudioTrackDisplay({ Type: 'audio', Language: 'en', Codec: 'E-AC3', Channels: 6 }, 1)
    expect(display.title).toBe('EN')
    expect(display.meta).toBe('EN · E-AC3 · 6 ch')
  })

  it('uses Audio N when no title/lang/codec', () => {
    const display = formatAudioTrackDisplay({ Type: 'audio' }, 2)
    expect(display.title).toBe('Audio 3')
    expect(display.meta).toBe('')
  })
})

declare module 'parse-torrent' {
  export interface ParsedTorrentFile {
    name?: string
    [key: string]: unknown
  }

  export interface ParsedTorrent {
    infoHash?: string
    name?: string
    files?: ParsedTorrentFile[]
    [key: string]: unknown
  }

  interface ParseTorrent {
    remote: (src: string | File | Buffer, cb: (err: Error | null, parsed?: ParsedTorrent) => void) => void
  }

  const parseTorrent: ParseTorrent
  export default parseTorrent
}

declare module 'hls.js' {
  export interface HlsConfig {
    [key: string]: unknown
  }

  export interface HlsEventData {
    type?: string
    details?: string
    fatal?: boolean
    id?: number
    subtitleTracks?: Array<{ id?: number; name?: string; lang?: string; groupId?: string; [key: string]: unknown }>
    [key: string]: unknown
  }

  export default class Hls {
    static isSupported(): boolean
    static Events: {
      MANIFEST_PARSED: string
      SUBTITLE_TRACKS_UPDATED: string
      SUBTITLE_TRACK_SWITCH: string
      ERROR: string
      [key: string]: string
    }
    static ErrorTypes: {
      NETWORK_ERROR: string
      MEDIA_ERROR: string
      [key: string]: string
    }

    constructor(config?: Partial<HlsConfig>)
    loadSource(src: string): void
    attachMedia(media: HTMLMediaElement): void
    destroy(): void
    recoverMediaError(): void
    startLoad(startPosition?: number): void
    stopLoad(): void
    on(event: string, listener: (event: string, data: HlsEventData) => void): void
    subtitleTrack: number
    subtitleDisplay: boolean
    subtitleTracks: Array<{ id?: number; name?: string; lang?: string; groupId?: string; [key: string]: unknown }>
  }
}

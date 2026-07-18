declare module 'parse-torrent' {
  interface ParsedTorrent {
    infoHash?: string
    name?: string
    files?: Array<{ name?: string; length?: number }>
    [key: string]: unknown
  }

  interface ParseTorrent {
    (torrent: Buffer | string | File): ParsedTorrent
    remote: (
      torrent: Buffer | string | File | Blob,
      callback: (err: Error | null, parsed?: ParsedTorrent) => void,
    ) => void
  }

  const parseTorrent: ParseTorrent
  export default parseTorrent
}

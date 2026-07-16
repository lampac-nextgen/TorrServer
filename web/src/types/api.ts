export type TorrentCategory = string

export interface TorrentFileStat {
  Id: number
  Path: string
  Length: number
}

export interface TorrentStat {
  Hash: string
  Name: string
  Title?: string
  Category?: TorrentCategory
  Poster?: string
  Size?: number
  TorrentSize?: number
  LoadedSize?: number
  DownloadSpeed?: number
  UploadSpeed?: number
  TotalPeers?: number
  ActivePeers?: number
  PendingPeers?: number
  HalfOpenPeers?: number
  BytesRead?: number
  BytesWritten?: number
  BytesReadData?: number
  BytesWrittenData?: number
  Status?: number
  TorrentStatus?: number
  FileStats?: TorrentFileStat[]
  [key: string]: unknown
}

export interface BTSets {
  CacheSize?: number
  ReaderReadAHead?: number
  PreloadCache?: number
  [key: string]: unknown
}

export interface GStreamerRuntime {
  built_in: boolean
  config?: {
    TranscodeAVI?: boolean
    [key: string]: unknown
  }
  [key: string]: unknown
}

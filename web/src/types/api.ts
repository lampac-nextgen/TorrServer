export type TorrentCategory = string

export interface TorrentFileStat {
  Id: number
  Path: string
  Length: number
}

/** List/status payload from POST /torrents action=list|get */
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
  /** Legacy snake_case fields still present in some UI helpers */
  active_peers?: number
  total_peers?: number
  connected_seeders?: number
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

export interface CachePiece {
  Id?: number
  Size?: number
  Length?: number
  Completed?: boolean
  Priority?: number
  [key: string]: unknown
}

export interface CacheReader {
  Reader?: number
  Start?: number
  End?: number
  ReaderPieces?: number[]
  [key: string]: unknown
}

export interface TorrentCache {
  Hash?: string
  Capacity?: number
  Filled?: number
  PiecesLength?: number
  PiecesCount?: number
  Pieces?: Record<string, CachePiece> | CachePiece[]
  Readers?: CacheReader[]
  [key: string]: unknown
}

export interface CacheMapItem {
  percentage: number
  priority: number
  isReader?: boolean
  isReaderRange?: boolean
}

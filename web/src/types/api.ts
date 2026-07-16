export type TorrentCategory = string

export interface TorrentFileStat {
  Id?: number
  id?: number
  Path?: string
  path?: string
  Length?: number
  length?: number
}

/** List/status payload from POST /torrents (API uses snake_case in the web UI) */
export interface TorrentStat {
  hash: string
  title?: string
  name?: string
  category?: TorrentCategory
  poster?: string
  torrent_size?: number
  download_speed?: number
  upload_speed?: number
  active_peers?: number
  total_peers?: number
  connected_seeders?: number
  timestamp?: number
  stat?: number
  data?: string
  file_stats?: TorrentFileStat[]
  Hash?: string
  Name?: string
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
  Status?: number
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

export interface OfflineAwareProps {
  isOffline?: boolean
  isLoading?: boolean
}

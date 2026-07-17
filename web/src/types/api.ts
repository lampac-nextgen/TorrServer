export type TorrentCategory = string

export interface TorrentFileStat {
  Id?: number
  id?: number
  Path?: string
  path?: string
  Length?: number
  length?: number
}

/** List/status payload from POST /torrents (API uses snake_case) */
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
}

export interface TorznabUrl {
  Host: string
  Key: string
  Name?: string
}

export interface TMDBSettingsConfig {
  APIKey?: string
  APIURL?: string
  ImageURL?: string
  ImageURLRu?: string
  [key: string]: unknown
}

export interface BTSets {
  CacheSize?: number
  ReaderReadAHead?: number
  PreloadCache?: number
  UseDisk?: boolean
  TorrentsSavePath?: string
  RemoveCacheOnDrop?: boolean
  EnableRutorSearch?: boolean
  EnableTorznabSearch?: boolean
  TorznabUrls?: TorznabUrl[]
  TMDBSettings?: TMDBSettingsConfig
  RetrackersMode?: number | string
  TorrentDisconnectTimeout?: number
  EnableDebug?: boolean
  EnableDLNA?: boolean
  EnableBonjour?: boolean
  EnableIPv6?: boolean
  FriendlyName?: string
  ForceEncrypt?: boolean
  DisableTCP?: boolean
  DisableUTP?: boolean
  DisableUPNP?: boolean
  DisableDHT?: boolean
  DisablePEX?: boolean
  DisableUpload?: boolean
  EnableLPD?: boolean
  LPDIPv6?: boolean
  DownloadRateLimit?: number
  UploadRateLimit?: number
  ConnectionsLimit?: number
  PeersListenPort?: number
  ResponsiveMode?: boolean
  SslPort?: number
  SslCert?: string
  SslKey?: string
  ShowFSActiveTorr?: boolean
  [key: string]: unknown
}

export type SettingsUpdater = (partial: Partial<BTSets>) => void
export type SettingsInputHandler = (event: {
  target: { type?: string; value?: unknown; checked?: boolean; id?: string; name?: string }
}) => void

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

/** Torznab / Rutor search result row */
export interface SearchResultItem {
  Title?: string
  Size?: string
  Seed?: number
  Peer?: number
  Hash?: string
  Link?: string
  Magnet?: string
  Poster?: string
  [key: string]: unknown
}

/** Normalized playable file from torrent.file_stats */
export interface PlayableFile {
  id: number
  path: string
  length: number
  [key: string]: unknown
}

export interface ViewedFileEntry {
  file_index: number
  [key: string]: unknown
}

export interface MultiAddFileState {
  file: File
  title: string
  category: string
  poster: string
  isPosterOk: boolean
  originalName: string
  parsedTitle: string
  infoHash: string
  alreadyExists: boolean
}

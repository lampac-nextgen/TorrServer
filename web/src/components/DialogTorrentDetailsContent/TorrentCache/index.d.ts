import type { FC } from 'react'
import type { TorrentCache as TorrentCacheData } from 'types/api'

export interface TorrentCacheProps {
  cache: TorrentCacheData
  isMini?: boolean
  isSnakeDebugMode?: boolean
}

declare const TorrentCache: FC<TorrentCacheProps>
export default TorrentCache

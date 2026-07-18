import axios from 'axios'

import type { TorrentStat } from 'shared/api/types'
import { torrentsHost } from 'shared/api/hosts'

export const getTorrents = async (): Promise<TorrentStat[]> => {
  try {
    const { data } = await axios.post<TorrentStat[]>(torrentsHost(), { action: 'list' })
    return data
  } catch {
    throw new Error('Failed to load torrents')
  }
}

export const getTorrent = async (hash: string): Promise<TorrentStat> => {
  const { data } = await axios.post<TorrentStat>(torrentsHost(), { action: 'get', hash })
  return data
}

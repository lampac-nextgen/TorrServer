import axios from 'axios'

import type { TorrentStat } from 'shared/api/types'
import { torrentUploadHost, torrentsHost } from 'shared/api/hosts'

export const TORRENTS_QUERY_KEY = ['torrents'] as const

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

export interface AddTorrentInput {
  link: string
  title?: string
  category?: string
  poster?: string
  save_to_db?: boolean
}

export const addTorrent = async (input: AddTorrentInput): Promise<void> => {
  await axios.post(torrentsHost(), {
    action: 'add',
    link: input.link,
    title: input.title || undefined,
    category: input.category || undefined,
    poster: input.poster ?? '',
    save_to_db: input.save_to_db ?? true,
  })
}

export const dropTorrent = async (hash: string): Promise<void> => {
  await axios.post(torrentsHost(), { action: 'drop', hash })
}

export const removeTorrent = async (hash: string): Promise<void> => {
  await axios.post(torrentsHost(), { action: 'rem', hash })
}

export const wipeTorrents = async (): Promise<void> => {
  await axios.post(torrentsHost(), { action: 'wipe' })
}

export interface UploadTorrentMeta {
  title?: string
  category?: string
  poster?: string
  save?: boolean
}

export const uploadTorrent = async (file: File, meta: UploadTorrentMeta = {}): Promise<void> => {
  const data = new FormData()
  data.append('save', meta.save === false ? 'false' : 'true')
  data.append('file', file)
  if (meta.title) data.append('title', meta.title)
  if (meta.category) data.append('category', meta.category)
  if (meta.poster) data.append('poster', meta.poster)
  await axios.post(torrentUploadHost(), data)
}

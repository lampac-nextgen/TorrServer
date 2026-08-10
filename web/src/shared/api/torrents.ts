import axios from 'axios'
import type { QueryClient } from '@tanstack/react-query'

import type { TorrentStat } from 'shared/api/types'
import { torrentUploadHost, torrentsHost } from 'shared/api/hosts'

export const TORRENTS_QUERY_KEY = ['torrents'] as const

/** Merge torrent rows into the list cache (new hashes prepended) for instant UI paint. */
export const upsertTorrentsInList = (queryClient: QueryClient, torrents: TorrentStat | TorrentStat[]): void => {
  const items = Array.isArray(torrents) ? torrents : [torrents]
  if (!items.length) return
  queryClient.setQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY, prev => {
    const list = prev ? [...prev] : []
    for (const item of items) {
      if (!item?.hash) continue
      const idx = list.findIndex(row => row.hash?.toLowerCase() === item.hash.toLowerCase())
      if (idx >= 0) list[idx] = { ...list[idx], ...item }
      else list.unshift(item)
    }
    return list
  })
}

/**
 * Paint from known rows (add/upload response), then reconcile in the background.
 * Does not await the list round-trip — that was the main post-add lag.
 */
export const refreshTorrentsList = async (
  queryClient: QueryClient,
  options?: { torrents?: TorrentStat | TorrentStat[] },
): Promise<void> => {
  if (options?.torrents) upsertTorrentsInList(queryClient, options.torrents)
  // Fire-and-forget: UI already has upserted rows; don't block dialog close on list GET.
  void queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
}

/** List torrents; attaches HTTP `status` on the thrown Error for auth/offline UI. */
export const getTorrents = async (): Promise<TorrentStat[]> => {
  try {
    const { data } = await axios.post<TorrentStat[]>(torrentsHost(), { action: 'list' })
    return data
  } catch (err) {
    const status = axios.isAxiosError(err) ? err.response?.status : undefined
    const error = new Error('Failed to load torrents') as Error & { response?: { status?: number } }
    if (status != null) error.response = { status }
    throw error
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

export const addTorrent = async (input: AddTorrentInput): Promise<TorrentStat> => {
  const { data } = await axios.post<TorrentStat>(torrentsHost(), {
    action: 'add',
    link: input.link,
    title: input.title || undefined,
    category: input.category || undefined,
    poster: input.poster ?? '',
    save_to_db: input.save_to_db ?? true,
  })
  return data
}

export interface UpdateTorrentInput {
  hash: string
  title?: string
  category?: string
  poster?: string
}

export const updateTorrent = async (input: UpdateTorrentInput): Promise<void> => {
  await axios.post(torrentsHost(), {
    action: 'set',
    hash: input.hash,
    title: input.title || undefined,
    category: input.category || undefined,
    poster: input.poster ?? '',
  })
}

/** Stop swarm activity but keep the torrent in the DB (`action: drop`). */
export const dropTorrent = async (hash: string): Promise<void> => {
  await axios.post(torrentsHost(), { action: 'drop', hash })
}

/** Permanently delete the torrent from the DB (`action: rem`). */
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

/** Multipart `.torrent` upload; form field `save` mirrors server "save to DB" flag. */
export const uploadTorrent = async (file: File, meta: UploadTorrentMeta = {}): Promise<TorrentStat | TorrentStat[]> => {
  const data = new FormData()
  data.append('save', meta.save === false ? 'false' : 'true')
  data.append('file', file)
  if (meta.title) data.append('title', meta.title)
  if (meta.category) data.append('category', meta.category)
  if (meta.poster) data.append('poster', meta.poster)
  const { data: status } = await axios.post<TorrentStat | TorrentStat[]>(torrentUploadHost(), data)
  return status
}

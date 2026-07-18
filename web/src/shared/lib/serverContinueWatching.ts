import type { TorrentStat, ViewedFileEntry } from 'shared/api/types'
import type { ContinueWatchEntry } from 'shared/lib/continueWatching'
import { listContinueWatching } from 'shared/lib/continueWatching'

/**
 * Prefer server viewed history (cross-device) when entries have a hash + file index.
 * Falls back to localStorage shelf for devices that only wrote client-side progress.
 */
export function buildContinueWatchShelf(
  torrents: TorrentStat[] | undefined,
  serverViewed: ViewedFileEntry[] | undefined,
  localTick?: number,
): ContinueWatchEntry[] {
  void localTick
  const byHash = new Map((torrents || []).map(tr => [tr.hash, tr]))
  const hashes = new Set(byHash.keys())

  const serverRows: ContinueWatchEntry[] = []
  if (serverViewed?.length) {
    // Keep the highest-timecode file per torrent.
    const best = new Map<string, ViewedFileEntry>()
    for (const row of serverViewed) {
      const hash = row.hash
      if (!hash || !hashes.has(hash)) continue
      const prev = best.get(hash)
      if (!prev || (row.timecode ?? 0) >= (prev.timecode ?? 0)) best.set(hash, row)
    }
    for (const [hash, row] of best) {
      const torrent = byHash.get(hash)
      if (!torrent) continue
      const file = torrent.file_stats?.find(f => (f.id ?? f.Id) === row.file_index)
      const fileName = file?.path || file?.Path || ''
      serverRows.push({
        hash,
        fileIndex: row.file_index,
        title: torrent.title || torrent.name || hash,
        fileName: fileName.split(/[/\\]/).pop() || fileName,
        timecode: row.timecode ?? 0,
        updatedAt: Date.now(),
      })
    }
  }

  if (serverRows.length > 0) return serverRows.slice(0, 6)

  return listContinueWatching(hashes).slice(0, 6)
}

/**
 * Server `TorrentStat.stat` codes (must stay aligned with Go torrent states).
 *
 * `IN_DB` means the torrent is stored but idle — live `file_stats` may be empty;
 * fall back to metadata in `torrent.data` for playable lists.
 */
export const GETTING_INFO = 1
export const PRELOAD = 2
export const WORKING = 3
export const CLOSED = 4
export const IN_DB = 5

/** Live in the BT client (preload/working/getting info). Idle library rows are `IN_DB`. */
export function isLiveTorrentStat(stat?: number) {
  return stat != null && stat !== IN_DB
}

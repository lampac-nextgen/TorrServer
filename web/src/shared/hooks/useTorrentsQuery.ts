import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import type { TorrentStat } from 'shared/api/types'
import { getTorrents, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { GETTING_INFO, PRELOAD } from 'shared/torrent/states'

const isWarming = (list: TorrentStat[] | undefined) =>
  Boolean(list?.some(torrent => torrent.stat === GETTING_INFO || torrent.stat === PRELOAD))

/** Single owner for the torrents list poll — reuse everywhere (Shell, TorrentsPage, MultiAdd). */
export function useTorrentsQuery(options?: { enabled?: boolean }): UseQueryResult<TorrentStat[], Error> {
  return useQuery({
    queryKey: TORRENTS_QUERY_KEY,
    queryFn: getTorrents,
    retry: 1,
    enabled: options?.enabled ?? true,
    refetchInterval: query => {
      if (document.hidden) return 10_000
      // Keep 1s while metadata is resolving so cards leave GETTING_INFO promptly.
      if (isWarming(query.state.data)) return 1000
      // Details/settings/etc. open — ease off the list poll to cut server + battery load.
      if (document.body.dataset.modalOpen === 'true') return 5_000
      return 1000
    },
  })
}

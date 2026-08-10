import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { getTorrent } from 'shared/api/torrents'
import type { TorrentStat } from 'shared/api/types'
import { GETTING_INFO, PRELOAD } from 'shared/torrent/states'

/**
 * Live torrent detail poll for the details sheet.
 * Uses list-row `initial` for instant paint; refetches every 2s (5s while the tab is hidden),
 * or ~750ms while GETTING_INFO / PRELOAD so files/title appear quickly.
 */
export function useTorrentDetail(hash: string | undefined, initial?: TorrentStat): UseQueryResult<TorrentStat, Error> {
  return useQuery({
    queryKey: ['torrent', hash],
    queryFn: () => getTorrent(hash!),
    enabled: Boolean(hash),
    initialData: initial,
    refetchInterval: query => {
      if (document.hidden) return 5000
      const torrent = query.state.data
      if (torrent?.stat === GETTING_INFO || torrent?.stat === PRELOAD) return 750
      return 2000
    },
    retry: 1,
  })
}

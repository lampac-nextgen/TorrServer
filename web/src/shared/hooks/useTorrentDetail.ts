import { useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query'

import { getTorrent, TORRENTS_QUERY_KEY, upsertTorrentsInList } from 'shared/api/torrents'
import type { TorrentStat } from 'shared/api/types'
import { GETTING_INFO, PRELOAD } from 'shared/torrent/states'

/**
 * Live torrent detail poll for the details sheet.
 * Uses list-row `initial` for instant paint; while GETTING_INFO / PRELOAD polls ~400ms
 * and mirrors rows into the library cache so cards update without waiting on the list poll.
 */
export function useTorrentDetail(hash: string | undefined, initial?: TorrentStat): UseQueryResult<TorrentStat, Error> {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['torrent', hash],
    queryFn: async () => {
      const data = await getTorrent(hash!)
      // Keep library cards in lockstep while metadata resolves.
      if (queryClient.getQueryData(TORRENTS_QUERY_KEY)) {
        upsertTorrentsInList(queryClient, data)
      }
      return data
    },
    enabled: Boolean(hash),
    initialData: initial,
    refetchInterval: query => {
      if (document.hidden) return 5000
      const torrent = query.state.data
      if (torrent?.stat === GETTING_INFO || torrent?.stat === PRELOAD) return 400
      return 1500
    },
    retry: 1,
  })
}

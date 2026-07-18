import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { getTorrent } from 'shared/api/torrents'
import type { TorrentStat } from 'shared/api/types'

export function useTorrentDetail(hash: string | undefined, initial?: TorrentStat): UseQueryResult<TorrentStat, Error> {
  return useQuery({
    queryKey: ['torrent', hash],
    queryFn: () => getTorrent(hash!),
    enabled: Boolean(hash),
    initialData: initial,
    refetchInterval: () => (document.hidden ? 5000 : 1000),
    retry: 1,
  })
}

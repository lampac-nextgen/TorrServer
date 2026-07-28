import { humanizeSize } from 'shared/lib/format'
import type { TorrentStat } from 'shared/api/types'
import { useTranslation } from 'react-i18next'

import MetricRows from './MetricRows'

export interface SwarmStatsPanelProps {
  torrent: TorrentStat
  /** Side pane on desktop Stats — single column, can stretch. */
  className?: string
  columns?: 1 | 2
  /** When false, omit outer frame (parent already provides a panel). */
  framed?: boolean
  /** Hide the Swarm heading when nested under a combined metrics panel. */
  showTitle?: boolean
}

/** Dense transfer / peer counters from TorrentStat — definition rows, not chips. */
export default function SwarmStatsPanel({
  torrent,
  className,
  columns = 1,
  framed = true,
  showTitle = true,
}: SwarmStatsPanelProps) {
  const { t } = useTranslation()

  const items = [
    { label: t('PendingPeers'), value: torrent.pending_peers != null ? String(torrent.pending_peers) : '—' },
    { label: t('HalfOpenPeers'), value: torrent.half_open_peers != null ? String(torrent.half_open_peers) : '—' },
    {
      label: t('Preloaded'),
      value:
        torrent.preloaded_bytes != null || torrent.preload_size != null
          ? `${humanizeSize(torrent.preloaded_bytes)} / ${humanizeSize(torrent.preload_size)}`
          : '—',
    },
    { label: t('BytesRead'), value: torrent.bytes_read != null ? humanizeSize(torrent.bytes_read) : '—' },
    { label: t('BytesWritten'), value: torrent.bytes_written != null ? humanizeSize(torrent.bytes_written) : '—' },
  ]

  return (
    <MetricRows
      title={showTitle ? t('SwarmStats') : undefined}
      items={items}
      columns={columns}
      framed={framed}
      className={className}
    />
  )
}

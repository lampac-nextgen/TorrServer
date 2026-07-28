import { getPeerString, humanizeSize } from 'shared/lib/format'
import type { TorrentStat } from 'shared/api/types'
import { useTranslation } from 'react-i18next'

import MetricRows from './MetricRows'

export interface SwarmStatsPanelProps {
  torrent: TorrentStat
  /** Side pane on desktop Stats — stretch to match SpeedCharts. */
  className?: string
  columns?: 1 | 2
  /** When false, omit outer frame (parent already provides a panel). */
  framed?: boolean
  /** Match SpeedCharts fill card: live header strip + equal min-height. */
  fill?: boolean
}

/** Dense transfer / peer counters — SpeedCharts-aligned header + definition rows. */
export default function SwarmStatsPanel({
  torrent,
  className = '',
  columns = 1,
  framed = true,
  fill = false,
}: SwarmStatsPanelProps) {
  const { t } = useTranslation()

  const peersValue = getPeerString(torrent) || '—'
  const pendingValue = torrent.pending_peers != null ? String(torrent.pending_peers) : '—'

  const detailItems = [
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
    ...(torrent.loaded_size != null
      ? [{ label: t('ServerStatusLoaded'), value: humanizeSize(torrent.loaded_size) }]
      : []),
  ]

  const header = (
    <div className='mb-2 flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1'>
      <div className='flex items-center gap-2'>
        <span className='size-2.5 rounded-full bg-accent' aria-hidden />
        <span className='text-xs text-muted'>{t('Peers')}</span>
        <span className='text-sm font-bold tabular-nums text-foreground'>{peersValue}</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='size-2.5 rounded-full bg-warning' aria-hidden />
        <span className='text-xs text-muted'>{t('PendingPeers')}</span>
        <span className='text-sm font-bold tabular-nums text-foreground'>{pendingValue}</span>
      </div>
    </div>
  )

  const inner = (
    <>
      {!fill ? (
        <p className='mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase'>{t('SwarmStats')}</p>
      ) : null}
      {header}
      <MetricRows framed={false} items={detailItems} columns={columns} />
    </>
  )

  if (!framed) {
    return <div className={className || undefined}>{inner}</div>
  }

  return (
    <div
      className={`flex flex-col rounded-xl border border-border bg-surface-secondary p-2.5 ${
        fill ? 'h-full min-h-[14rem]' : ''
      } ${className}`.trim()}
    >
      {inner}
    </div>
  )
}

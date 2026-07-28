import { formatCacheFilledLabel, getPeerString, humanizeSize } from 'shared/lib/format'
import type { TorrentStat } from 'shared/api/types'
import { useTranslation } from 'react-i18next'

import MetricRows, { type MetricRowItem } from './MetricRows'

export interface SwarmStatsPanelProps {
  torrent: TorrentStat
  className?: string
  columns?: 1 | 2
  /** When false, omit outer frame (parent already provides a panel). */
  framed?: boolean
  /**
   * `summary` — Stats side card (same height as SpeedCharts; bottom meters fill the hole).
   * `full` — Swarm tab: complete metrics + visuals, denser so it fits without scroll.
   */
  variant?: 'summary' | 'full'
  cacheFilled?: number | null
  cacheCapacity?: number | null
  cacheReaders?: number | null
}

function formatDuration(seconds?: number): string | null {
  if (seconds == null || !Number.isFinite(seconds) || seconds <= 0) return null
  const total = Math.round(seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

function pct(part: number, whole: number): number {
  if (whole <= 0) return 0
  return Math.min(100, Math.max(0, (part / whole) * 100))
}

function ProgressMeter({
  label,
  valueLabel,
  ratio,
  compact = false,
}: {
  label: string
  valueLabel: string
  ratio: number
  compact?: boolean
}) {
  const width = Number.isFinite(ratio) ? Math.min(100, Math.max(0, ratio)) : 0
  return (
    <div className='min-w-0'>
      <div className={`flex items-baseline justify-between gap-2 text-xs ${compact ? 'mb-0.5' : 'mb-1'}`}>
        <span className='truncate text-muted'>{label}</span>
        <span className='shrink-0 font-bold tabular-nums text-foreground'>{valueLabel}</span>
      </div>
      <div className={`overflow-hidden rounded-full bg-surface ${compact ? 'h-1.5' : 'h-2'}`}>
        <div className='h-full rounded-full bg-accent transition-[width] duration-300' style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

function PeerMixBar({
  active,
  seeders,
  pending,
  halfOpen,
  labels,
  compact = false,
}: {
  active: number
  seeders: number
  pending: number
  halfOpen: number
  labels: { active: string; seeders: string; pending: string; halfOpen: string }
  compact?: boolean
}) {
  const parts = [
    { key: 'active', n: active, className: 'bg-accent', label: labels.active },
    { key: 'seeders', n: seeders, className: 'bg-accent/70', label: labels.seeders },
    { key: 'pending', n: pending, className: 'bg-warning', label: labels.pending },
    { key: 'half', n: halfOpen, className: 'bg-foreground/25', label: labels.halfOpen },
  ]
  const total = parts.reduce((sum, p) => sum + Math.max(0, p.n), 0)

  return (
    <div className='min-w-0'>
      <div className={`flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted ${compact ? 'mb-1' : 'mb-1.5'}`}>
        {parts.map(p => (
          <span key={p.key} className='inline-flex items-center gap-1'>
            <span className={`size-1.5 rounded-full ${p.className}`} aria-hidden />
            {p.label} <span className='font-semibold tabular-nums text-foreground'>{p.n}</span>
          </span>
        ))}
      </div>
      <div className={`flex overflow-hidden rounded-full bg-surface ${compact ? 'h-2' : 'h-2.5'}`}>
        {total > 0
          ? parts.map(p =>
              p.n > 0 ? (
                <div
                  key={p.key}
                  className={`h-full ${p.className}`}
                  style={{ width: `${(p.n / total) * 100}%` }}
                  title={`${p.label}: ${p.n}`}
                />
              ) : null,
            )
          : null}
      </div>
    </div>
  )
}

/** Swarm metrics — Stats summary (fills chart-aligned hole) or compact Swarm-tab panel. */
export default function SwarmStatsPanel({
  torrent,
  className = '',
  columns: columnsProp,
  framed = true,
  variant = 'summary',
  cacheFilled,
  cacheCapacity,
  cacheReaders,
}: SwarmStatsPanelProps) {
  const { t } = useTranslation()
  const isFull = variant === 'full'
  const columns = columnsProp ?? 2

  const peersValue = getPeerString(torrent) || '—'
  const pendingValue = torrent.pending_peers != null ? String(torrent.pending_peers) : '—'

  const loaded = torrent.loaded_size ?? 0
  const totalSize = torrent.torrent_size ?? 0
  const loadedPct = pct(loaded, totalSize)
  const preloadDone = torrent.preloaded_bytes ?? 0
  const preloadNeed = torrent.preload_size ?? 0
  const preloadPct = pct(preloadDone, preloadNeed > 0 ? preloadNeed : preloadDone || 1)
  const cacheCap = cacheCapacity ?? 0
  const cacheFill = cacheFilled ?? 0
  const cachePct = pct(cacheFill, cacheCap)
  const durationLabel = formatDuration(torrent.duration_seconds)
  const loadedLabel = totalSize > 0 ? `${humanizeSize(loaded)} · ${Math.round(loadedPct)}%` : humanizeSize(loaded)
  const cacheLabel = formatCacheFilledLabel(cacheFilled, cacheCapacity) ?? '—'
  const preloadLabel =
    preloadNeed > 0 || preloadDone > 0
      ? `${humanizeSize(preloadDone)} / ${humanizeSize(preloadNeed || undefined)}`
      : '—'

  const peerMixLabels = {
    active: t('ActivePeers'),
    seeders: t('ConnectedSeeders'),
    pending: t('PendingPeers'),
    halfOpen: t('HalfOpenPeers'),
  }

  /** Stats side: transfer rows only — Loaded/Cache live in bottom meters (fill the hole). */
  const summaryItems: MetricRowItem[] = [
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
    {
      label: t('UsefulRead'),
      value: torrent.bytes_read_useful_data != null ? humanizeSize(torrent.bytes_read_useful_data) : '—',
    },
    {
      label: t('ChunksWasted'),
      value: torrent.chunks_read_wasted != null ? String(torrent.chunks_read_wasted) : '—',
    },
  ]

  /**
   * Swarm tab: peers/seeders live in PeerMixBar; Loaded/Preload/Cache in meters.
   * Keep transfer + chunk counters dense so the tab fits without scroll.
   */
  const fullItems: MetricRowItem[] = [
    { label: t('HalfOpenPeers'), value: torrent.half_open_peers != null ? String(torrent.half_open_peers) : '—' },
    { label: t('TotalPeers'), value: torrent.total_peers != null ? String(torrent.total_peers) : '—' },
    { label: t('BytesRead'), value: torrent.bytes_read != null ? humanizeSize(torrent.bytes_read) : '—' },
    { label: t('BytesWritten'), value: torrent.bytes_written != null ? humanizeSize(torrent.bytes_written) : '—' },
    {
      label: t('UsefulRead'),
      value: torrent.bytes_read_useful_data != null ? humanizeSize(torrent.bytes_read_useful_data) : '—',
    },
    {
      label: t('BytesReadData'),
      value: torrent.bytes_read_data != null ? humanizeSize(torrent.bytes_read_data) : '—',
    },
    { label: t('ChunksRead'), value: torrent.chunks_read != null ? String(torrent.chunks_read) : '—' },
    { label: t('ChunksWritten'), value: torrent.chunks_written != null ? String(torrent.chunks_written) : '—' },
    {
      label: t('ChunksWasted'),
      value: torrent.chunks_read_wasted != null ? String(torrent.chunks_read_wasted) : '—',
    },
    {
      label: t('ChunksUseful'),
      value: torrent.chunks_read_useful != null ? String(torrent.chunks_read_useful) : '—',
    },
    ...(cacheReaders != null ? [{ label: t('CacheReaders'), value: String(cacheReaders) }] : []),
    ...(torrent.bit_rate ? [{ label: t('BitRate'), value: torrent.bit_rate }] : []),
    ...(durationLabel ? [{ label: t('FfpDuration'), value: durationLabel }] : []),
  ]

  const header = (
    <div className={`flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 ${isFull ? 'mb-1.5' : 'mb-2'}`}>
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

  const meters = (
    <>
      <PeerMixBar
        active={torrent.active_peers ?? 0}
        seeders={torrent.connected_seeders ?? 0}
        pending={torrent.pending_peers ?? 0}
        halfOpen={torrent.half_open_peers ?? 0}
        labels={peerMixLabels}
        compact={isFull}
      />
      {isFull ? (
        <div className='grid grid-cols-1 gap-1.5 sm:grid-cols-3'>
          <ProgressMeter label={t('ServerStatusLoaded')} valueLabel={loadedLabel} ratio={loadedPct} compact />
          <ProgressMeter
            label={t('Preloaded')}
            valueLabel={preloadLabel}
            ratio={preloadNeed > 0 ? preloadPct : 0}
            compact
          />
          {cacheCap > 0 ? (
            <ProgressMeter
              label={t('CacheFilled')}
              valueLabel={`${humanizeSize(cacheFill)} / ${humanizeSize(cacheCap)}`}
              ratio={cachePct}
              compact
            />
          ) : (
            <ProgressMeter label={t('CacheFilled')} valueLabel={cacheLabel} ratio={0} compact />
          )}
        </div>
      ) : (
        <div className='space-y-2'>
          <ProgressMeter label={t('ServerStatusLoaded')} valueLabel={loadedLabel} ratio={loadedPct} />
          <ProgressMeter label={t('Preloaded')} valueLabel={preloadLabel} ratio={preloadNeed > 0 ? preloadPct : 0} />
          {cacheCap > 0 ? (
            <ProgressMeter
              label={t('CacheFilled')}
              valueLabel={`${humanizeSize(cacheFill)} / ${humanizeSize(cacheCap)}`}
              ratio={cachePct}
            />
          ) : (
            <ProgressMeter label={t('CacheFilled')} valueLabel={cacheLabel} ratio={0} />
          )}
        </div>
      )}
    </>
  )

  /** Stats: pin meters to the bottom of the chart-height card — fills the empty band. */
  const summaryVisuals = !isFull ? (
    <div className='mt-auto space-y-2 border-t border-border pt-2.5'>{meters}</div>
  ) : null

  const fullVisuals = isFull ? <div className='mt-2 space-y-1.5 border-t border-border pt-2'>{meters}</div> : null

  const inner = (
    <>
      {framed && !isFull ? (
        <p className='mb-1.5 shrink-0 text-xs font-semibold tracking-wide text-muted uppercase'>{t('SwarmStats')}</p>
      ) : null}
      {header}
      <MetricRows framed={false} items={isFull ? fullItems : summaryItems} columns={columns} dense={isFull} />
      {summaryVisuals}
      {fullVisuals}
    </>
  )

  if (!framed) {
    return <div className={className || undefined}>{inner}</div>
  }

  return (
    <div
      className={`flex flex-col rounded-xl border border-border bg-surface-secondary p-2.5 ${
        !isFull ? 'h-full min-h-[14rem]' : ''
      } ${className}`.trim()}
    >
      {inner}
    </div>
  )
}

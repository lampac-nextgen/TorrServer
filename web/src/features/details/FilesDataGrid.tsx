import { CheckCircle2 } from 'lucide-react'
import { memo, useMemo, useState, type ReactNode } from 'react'
import ptt from 'parse-torrent-title'
import { useTranslation } from 'react-i18next'
import { streamHost } from 'shared/api/hosts'
import type { PlayableFile } from 'shared/api/types'
import {
  gstreamerHeartbeatUrl,
  gstreamerMasterUrl,
  shouldUseGStreamerPlayer,
  useGStreamerRuntime,
} from 'shared/lib/gstreamer'
import { useExternalPlayers } from 'shared/lib/externalPlayers'
import { humanizeSize } from 'shared/lib/format'

import FileRowActions from './FileRowActions'

/**
 * Global `parse-torrent-title` handler extensions for Russian-language release
 * naming conventions. These mutate the shared `ptt` singleton, so they must be
 * registered exactly once at module scope (this file owns torrent file parsing).
 */
ptt.addHandler('episode', /(\d{1,4})[- |. ]серия|серия[- |. ](\d{1,4})/i, { type: 'integer' })
ptt.addHandler('season', /sezon[- |. ](\d{1,3})|(\d{1,3})[- |. ]sezon/i, { type: 'integer' })
ptt.addHandler('season', /сезон[- |. ](\d{1,3})|(\d{1,3})[- |. ]сезон/i, { type: 'integer' })

export interface FilesDataGridProps {
  playableFileList?: PlayableFile[]
  viewedFileList?: number[]
  selectedSeason?: number
  seasonAmount?: number[] | null
  hash: string
}

interface FileRow {
  id: number
  name: string
  season?: number
  episode?: number
  resolution?: string
  size: number
  viewed: boolean
  path: string
  link: string
  player: { key: string; src: string; hls: boolean; heartbeatSrc: string }
  fullLink: string
}

function episodeBadge(episode?: number): string | null {
  if (episode == null) return null
  return `E${String(episode).padStart(2, '0')}`
}

/** Streaming-style episode/file row — title + meta chips + compact action strip. */
function EpisodeRow({ row, actions }: { row: FileRow; actions: ReactNode }) {
  const { t } = useTranslation()
  const badge = episodeBadge(row.episode)
  const title = row.episode != null ? row.name.replace(/^E\d+\s*[·.-]\s*/i, '').trim() || row.name : row.name

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 sm:flex-row sm:items-center sm:gap-4 ${
        row.viewed ? 'opacity-80' : 'border-l-[3px] border-l-accent'
      }`}
    >
      <div className='flex min-w-0 flex-1 items-start gap-3'>
        {badge ? (
          <span className='mt-0.5 inline-flex h-9 min-w-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft px-2 text-sm font-bold tabular-nums text-accent'>
            {badge}
          </span>
        ) : null}
        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-2'>
            <p className='truncate text-sm font-semibold text-foreground' title={row.path}>
              {title}
            </p>
            {row.viewed ? (
              <span className='inline-flex items-center gap-1 text-xs text-accent'>
                <CheckCircle2 className='size-3.5' aria-hidden />
                {t('Viewed')}
              </span>
            ) : null}
          </div>
          <div className='mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted'>
            {row.season != null ? (
              <span>
                {t('Season')} {row.season}
              </span>
            ) : null}
            {row.resolution ? <span>{row.resolution}</span> : null}
            <span>{humanizeSize(row.size)}</span>
          </div>
        </div>
      </div>
      <div className='shrink-0 sm:ml-auto'>{actions}</div>
    </div>
  )
}

const FilesDataGrid = memo(
  ({ playableFileList, viewedFileList, selectedSeason, seasonAmount, hash }: FilesDataGridProps) => {
    const { t } = useTranslation()
    const [unsupportedPlayerKeys, setUnsupportedPlayerKeys] = useState<Record<string, boolean>>({})
    const gstRuntime = useGStreamerRuntime()
    const { buildExternalPlayers, shouldShowOpenLink } = useExternalPlayers()

    const preloadBuffer = (fileId: number) => void fetch(`${streamHost()}?link=${hash}&index=${fileId}&preload`)

    const buildFileLink = (path: string, id: number) => {
      const fileName = path.split('\\').pop()!.split('/').pop()!
      return `${streamHost()}/${encodeURIComponent(fileName)}?link=${hash}&index=${id}&play`
    }

    const buildPlayer = (path: string, id: number) => {
      const useGStreamer = shouldUseGStreamerPlayer(path, gstRuntime)
      return {
        key: `${id}:${useGStreamer ? 'gst' : 'stream'}`,
        src: useGStreamer ? gstreamerMasterUrl(hash, id) : buildFileLink(path, id),
        hls: useGStreamer,
        heartbeatSrc: useGStreamer ? gstreamerHeartbeatUrl(hash) : '',
      }
    }

    const markPlayerUnsupported = (key: string) => {
      setUnsupportedPlayerKeys(current => ({ ...current, [key]: true }))
    }

    const fileHasEpisodeText = !!playableFileList?.find(({ path }) => ptt.parse(path).episode)
    const shouldDisplayFullFileName = (playableFileList?.length ?? 0) > 1 && !fileHasEpisodeText

    const filteredFiles = useMemo(() => {
      if (!playableFileList?.length) return []
      return playableFileList.filter(({ path }) => {
        const { season } = ptt.parse(path)
        return season == null || season === selectedSeason || !seasonAmount?.length
      })
    }, [playableFileList, selectedSeason, seasonAmount])

    const rows = useMemo<FileRow[]>(
      () =>
        filteredFiles.map(file => {
          const parsed = ptt.parse(file.path)
          const link = buildFileLink(file.path, file.id)
          const player = buildPlayer(file.path, file.id)
          const fullLink = new URL(link, window.location.href).toString()
          const fileName = file.path.split('/').pop() || file.path
          const episodeLabel =
            parsed.episode != null
              ? `E${parsed.episode}${parsed.title ? ` · ${parsed.title}` : ''}`
              : shouldDisplayFullFileName
                ? file.path
                : parsed.title || fileName
          return {
            id: file.id,
            name: episodeLabel,
            season: parsed.season,
            episode: parsed.episode,
            resolution: parsed.resolution,
            size: file.length,
            viewed: viewedFileList?.includes(file.id) ?? false,
            path: file.path,
            link,
            player,
            fullLink,
          }
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps -- link builders close over hash/gstRuntime
      [filteredFiles, viewedFileList, shouldDisplayFullFileName, hash, gstRuntime, unsupportedPlayerKeys],
    )

    if (!playableFileList?.length) {
      return <p className='py-6 text-center text-sm text-muted'>{t('NoPlayableFiles')}</p>
    }

    return (
      <div className='space-y-2.5'>
        {rows.map(row => (
          <EpisodeRow
            key={row.id}
            row={row}
            actions={
              <FileRowActions
                preloadLabel={t('Preload')}
                onPreload={() => preloadBuffer(row.id)}
                playerSupported={!unsupportedPlayerKeys[row.player.key]}
                playerTitle={row.name}
                playerSrc={row.player.src}
                downloadSrc={row.link}
                hls={row.player.hls}
                heartbeatSrc={row.player.heartbeatSrc}
                onPlayerNotSupported={() => markPlayerUnsupported(row.player.key)}
                openLinkHref={row.link}
                showOpenLink={shouldShowOpenLink}
                copyText={row.fullLink}
                externalPlayers={buildExternalPlayers(row.fullLink)}
              />
            }
          />
        ))}
      </div>
    )
  },
  (prev, next) =>
    prev.hash === next.hash &&
    prev.selectedSeason === next.selectedSeason &&
    prev.playableFileList === next.playableFileList &&
    prev.viewedFileList === next.viewedFileList &&
    prev.seasonAmount === next.seasonAmount,
)

export default FilesDataGrid

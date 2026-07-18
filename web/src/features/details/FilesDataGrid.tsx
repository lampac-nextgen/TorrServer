import { useMediaQuery } from '@heroui/react'
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
import { queryMax } from 'shared/theme/breakpoints'

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

function FileCard({
  name,
  size,
  viewed,
  actions,
}: {
  name: string
  size: number
  viewed: boolean
  actions: ReactNode
}) {
  const { t } = useTranslation()

  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-surface-secondary ${viewed ? '' : 'border-l-4 border-l-accent'}`}
    >
      <div className='px-3 py-2'>
        <p className='break-words text-sm font-semibold text-foreground'>{name}</p>
      </div>
      <div className='px-3 pb-3'>
        <div className='mb-2 flex items-center gap-3 text-xs text-muted'>
          {viewed ? (
            <span className='inline-flex items-center gap-1 text-accent'>
              <CheckCircle2 className='size-3.5' aria-hidden />
              {t('Viewed')}
            </span>
          ) : null}
          <span>
            {t('Size')}: {humanizeSize(size)}
          </span>
        </div>
        {actions}
      </div>
    </div>
  )
}

const FilesDataGrid = memo(
  ({ playableFileList, viewedFileList, selectedSeason, seasonAmount, hash }: FilesDataGridProps) => {
    const { t } = useTranslation()
    const isCompactLayout = useMediaQuery(queryMax('shortTable'))
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
    const fileHasSeasonText = !!playableFileList?.find(({ path }) => ptt.parse(path).season)
    const fileHasResolutionText = !!playableFileList?.find(({ path }) => ptt.parse(path).resolution)
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

    const renderRowActions = (row: FileRow) => (
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
    )

    if (!playableFileList?.length) {
      return <p className='py-6 text-center text-sm text-muted'>{t('NoPlayableFiles')}</p>
    }

    if (isCompactLayout) {
      return (
        <div className='space-y-3'>
          {rows.map(row => (
            <FileCard
              key={row.id}
              name={row.name}
              size={row.size}
              viewed={row.viewed}
              actions={renderRowActions(row)}
            />
          ))}
        </div>
      )
    }

    return (
      <div className='w-full overflow-auto rounded-xl border border-border'>
        <table className='w-full min-w-[680px] border-collapse text-sm'>
          <thead className='bg-surface-tertiary text-left text-xs uppercase tracking-wide text-muted'>
            <tr>
              <th className='px-3 py-2'>{t('Viewed')}</th>
              <th className='px-3 py-2'>{t('Name')}</th>
              {fileHasSeasonText && seasonAmount?.length === 1 ? <th className='px-3 py-2'>{t('Season')}</th> : null}
              {fileHasEpisodeText ? <th className='px-3 py-2'>{t('Episode')}</th> : null}
              {fileHasResolutionText ? <th className='px-3 py-2'>{t('Resolution')}</th> : null}
              <th className='px-3 py-2'>{t('Size')}</th>
              <th className='px-3 py-2'>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className={`border-t border-border ${row.viewed ? 'bg-surface-secondary' : ''}`}>
                <td className='px-3 py-2 text-center'>
                  {row.viewed ? <CheckCircle2 className='mx-auto size-4 text-accent' aria-label={t('Viewed')} /> : null}
                </td>
                <td className='px-3 py-2 align-top text-foreground'>{row.name}</td>
                {fileHasSeasonText && seasonAmount?.length === 1 ? (
                  <td className='px-3 py-2 text-muted'>{row.season ?? '—'}</td>
                ) : null}
                {fileHasEpisodeText ? <td className='px-3 py-2 text-muted'>{row.episode ?? '—'}</td> : null}
                {fileHasResolutionText ? <td className='px-3 py-2 text-muted'>{row.resolution ?? '—'}</td> : null}
                <td className='px-3 py-2 whitespace-nowrap text-muted'>{humanizeSize(row.size)}</td>
                <td className='px-3 py-2 align-top'>{renderRowActions(row)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

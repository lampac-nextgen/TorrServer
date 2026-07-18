import { Button } from '@heroui/react'
import { CheckCircle } from 'lucide-react'
import { memo, useMemo, useState, type ReactNode } from 'react'
import ptt from 'parse-torrent-title'
import { useMediaQuery } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { streamHost } from 'shared/api/hosts'
import type { PlayableFile } from 'shared/api/types'
import {
  gstreamerHeartbeatUrl,
  gstreamerMasterUrl,
  shouldUseGStreamerPlayer,
  useGStreamerRuntime,
} from 'shared/lib/gstreamer'
import { useLocalBoolPref } from 'shared/hooks/useLocalPref'
import { humanizeSize } from 'shared/lib/format'
import { detectStandaloneApp, isAppleDevice, isMacOS } from 'shared/lib/platform'
import { queryMax } from 'shared/theme/breakpoints'

import FileRowActions, { type ExternalPlayerLink } from './FileRowActions'

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

type FileRow = {
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
  infuseLink: string
  senPlayerLink: string
  iinaLink: string
}

function ShortFileCard({
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
      className={`overflow-hidden rounded-xl border border-default-200 bg-content1 ${
        viewed ? 'border-l-4 border-l-success' : 'border-l-4 border-l-primary'
      }`}
    >
      <div className='px-3 py-2'>
        <p className='break-words text-sm font-semibold'>{name}</p>
      </div>
      <div className='px-3 pb-3'>
        <div className='mb-2 flex items-center gap-4 text-xs text-default-500'>
          {viewed ? (
            <span className='inline-flex items-center gap-1 text-success'>
              <CheckCircle className='size-3.5' aria-hidden />
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
    const isCompact = useMediaQuery(queryMax('shortTable'))
    const [unsupportedPlayers, setUnsupportedPlayers] = useState<Record<string, boolean>>({})
    const gstRuntime = useGStreamerRuntime()

    const preloadBuffer = (fileId: number) => fetch(`${streamHost()}?link=${hash}&index=${fileId}&preload`)
    const getFileLink = (path: string, id: number) =>
      `${streamHost()}/${encodeURIComponent(path.split('\\').pop()!.split('/').pop()!)}?link=${hash}&index=${id}&play`
    const getPlayer = (path: string, id: number) => {
      const useHls = shouldUseGStreamerPlayer(path, gstRuntime)
      return {
        key: `${id}:${useHls ? 'gst' : 'stream'}`,
        src: useHls ? gstreamerMasterUrl(hash, id) : getFileLink(path, id),
        hls: useHls,
        heartbeatSrc: useHls ? gstreamerHeartbeatUrl(hash) : '',
      }
    }
    const markPlayerUnsupported = (key: string) => {
      setUnsupportedPlayers(current => ({ ...current, [key]: true }))
    }

    const fileHasEpisodeText = !!playableFileList?.find(({ path }) => ptt.parse(path).episode)
    const fileHasSeasonText = !!playableFileList?.find(({ path }) => ptt.parse(path).season)
    const fileHasResolutionText = !!playableFileList?.find(({ path }) => ptt.parse(path).resolution)
    const shouldDisplayFullFileName = (playableFileList?.length ?? 0) > 1 && !fileHasEpisodeText

    const [isVlcUsed] = useLocalBoolPref('isVlcUsed')
    const [isInfuseUsed] = useLocalBoolPref('isInfuseUsed')
    const [isSenPlayerUsed] = useLocalBoolPref('isSenPlayerUsed')
    const [isIinaUsed] = useLocalBoolPref('isIinaUsed')
    const isStandalone = detectStandaloneApp()
    const isMac = isMacOS()
    const isApple = isAppleDevice()
    const shouldShowOpenLink =
      !isStandalone ||
      (!(isApple && isInfuseUsed) && !(isApple && isSenPlayerUsed) && !isVlcUsed && !(isMac && isIinaUsed))

    const buildExternalPlayers = (fullLink: URL, infuseLink: string, senPlayerLink: string, iinaLink: string) => {
      const externalPlayers: ExternalPlayerLink[] = []
      if (isApple && isInfuseUsed) externalPlayers.push({ label: t('Infuse'), href: infuseLink })
      if (isApple && isSenPlayerUsed) externalPlayers.push({ label: t('SenPlayer'), href: senPlayerLink })
      if (isVlcUsed) externalPlayers.push({ label: 'VLC', href: `vlc://${fullLink}` })
      if (isMac && isIinaUsed) externalPlayers.push({ label: 'IINA', href: iinaLink })
      return externalPlayers
    }

    const filtered = useMemo(() => {
      if (!playableFileList?.length) return []
      return playableFileList.filter(({ path }) => {
        const { season } = ptt.parse(path)
        return season == null || season === selectedSeason || !seasonAmount?.length
      })
    }, [playableFileList, selectedSeason, seasonAmount])

    const rows = useMemo(
      () =>
        filtered.map(file => {
          const parsed = ptt.parse(file.path)
          const link = getFileLink(file.path, file.id)
          const player = getPlayer(file.path, file.id)
          const fullLink = new URL(link, window.location.href)
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
            fullLink: fullLink.toString(),
            infuseLink: `infuse://x-callback-url/play?url=${encodeURIComponent(fullLink.toString())}`,
            senPlayerLink: `senplayer://x-callback-url/play?url=${encodeURIComponent(fullLink.toString())}`,
            iinaLink: `iina://weblink?url=${encodeURIComponent(fullLink.toString())}`,
          } satisfies FileRow
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps -- helpers close over hash/gst
      [filtered, viewedFileList, shouldDisplayFullFileName, hash, gstRuntime, unsupportedPlayers],
    )

    const renderActions = (row: FileRow) => (
      <FileRowActions
        preloadLabel={t('Preload')}
        onPreload={() => preloadBuffer(row.id)}
        playerSupported={!unsupportedPlayers[row.player.key]}
        playerTitle={row.name}
        playerSrc={row.player.src}
        downloadSrc={row.link}
        hls={row.player.hls}
        heartbeatSrc={row.player.heartbeatSrc}
        onPlayerNotSupported={() => markPlayerUnsupported(row.player.key)}
        openLinkHref={row.link}
        showOpenLink={shouldShowOpenLink}
        copyText={row.fullLink}
        externalPlayers={buildExternalPlayers(new URL(row.fullLink), row.infuseLink, row.senPlayerLink, row.iinaLink)}
      />
    )

    if (!playableFileList?.length) return t('NoPlayableFiles')

    if (isCompact) {
      return (
        <div className='space-y-3'>
          {rows.map(row => (
            <ShortFileCard
              key={row.id}
              name={row.name}
              size={row.size}
              viewed={row.viewed}
              actions={renderActions(row)}
            />
          ))}
        </div>
      )
    }

    return (
      <div className='min-h-[240px] w-full overflow-auto rounded-xl border border-default-200'>
        <table className='w-full min-w-[640px] border-collapse text-sm'>
          <thead className='bg-default-100 text-left text-xs uppercase text-default-500'>
            <tr>
              <th className='px-3 py-2'>{t('Viewed')}</th>
              <th className='px-3 py-2'>{t('Name')}</th>
              {fileHasSeasonText && seasonAmount?.length === 1 ? (
                <th className='px-3 py-2'>{t('Season')}</th>
              ) : null}
              {fileHasEpisodeText ? <th className='px-3 py-2'>{t('Episode')}</th> : null}
              {fileHasResolutionText ? <th className='px-3 py-2'>{t('Resolution')}</th> : null}
              <th className='px-3 py-2'>{t('Size')}</th>
              <th className='px-3 py-2'>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className={row.viewed ? 'bg-default-100/60' : undefined}>
                <td className='px-3 py-2 text-center'>
                  {row.viewed ? <CheckCircle className='mx-auto size-4 text-success' aria-label={t('Viewed')} /> : null}
                </td>
                <td className='px-3 py-2 align-top'>{row.name}</td>
                {fileHasSeasonText && seasonAmount?.length === 1 ? (
                  <td className='px-3 py-2'>{row.season ?? '—'}</td>
                ) : null}
                {fileHasEpisodeText ? <td className='px-3 py-2'>{row.episode ?? '—'}</td> : null}
                {fileHasResolutionText ? <td className='px-3 py-2'>{row.resolution ?? '—'}</td> : null}
                <td className='px-3 py-2 whitespace-nowrap'>{humanizeSize(row.size)}</td>
                <td className='px-3 py-2 align-top'>{renderActions(row)}</td>
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

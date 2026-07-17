import { memo, useState } from 'react'
import { streamHost } from 'utils/Hosts'
import isEqual from 'lodash/isEqual'
import { humanizeSize, detectStandaloneApp, isMacOS, isAppleDevice } from 'utils/Utils'
import ptt from 'parse-torrent-title'
import { useTranslation } from 'react-i18next'
import {
  gstreamerHeartbeatUrl,
  gstreamerMasterUrl,
  shouldUseGStreamerPlayer,
  useGStreamerRuntime,
} from 'utils/GStreamer'
import type { PlayableFile } from 'types/api'

import { TableStyle, ShortTableWrapper, ShortTable } from './style'
import FileRowActions, { type ExternalPlayerLink } from './FileRowActions'

ptt.addHandler('episode', /(\d{1,4})[- |. ]серия|серия[- |. ](\d{1,4})/i, {
  type: 'integer',
})
ptt.addHandler('season', /sezon[- |. ](\d{1,3})|(\d{1,3})[- |. ]sezon/i, {
  type: 'integer',
})
ptt.addHandler('season', /сезон[- |. ](\d{1,3})|(\d{1,3})[- |. ]сезон/i, {
  type: 'integer',
})

export interface TableProps {
  playableFileList?: PlayableFile[]
  viewedFileList?: number[]
  selectedSeason?: number
  seasonAmount?: number[] | null
  hash: string
}

const Table = memo(
  ({ playableFileList, viewedFileList, selectedSeason, seasonAmount, hash }: TableProps) => {
    const { t } = useTranslation()
    const [unsupportedPlayers, setUnsupportedPlayers] = useState<Record<string, boolean>>({})
    const gstRuntime = useGStreamerRuntime()
    const preloadBuffer = (fileId: number) => fetch(`${streamHost()}?link=${hash}&index=${fileId}&preload`)
    const getFileLink = (path: string, id: number) =>
      `${streamHost()}/${encodeURIComponent(path.split('\\').pop()!.split('/').pop()!)}?link=${hash}&index=${id}&play`
    const getPlayer = (path: string, id: number) => {
      const hls = shouldUseGStreamerPlayer(path, gstRuntime)
      return {
        key: `${id}:${hls ? 'gst' : 'stream'}`,
        src: hls ? gstreamerMasterUrl(hash, id) : getFileLink(path, id),
        hls,
        heartbeatSrc: hls ? gstreamerHeartbeatUrl(hash) : '',
      }
    }
    const markPlayerUnsupported = (key: string) => {
      setUnsupportedPlayers(current => ({ ...current, [key]: true }))
    }
    const fileHasEpisodeText = !!playableFileList?.find(({ path }) => ptt.parse(path).episode)
    const fileHasSeasonText = !!playableFileList?.find(({ path }) => ptt.parse(path).season)
    const fileHasResolutionText = !!playableFileList?.find(({ path }) => ptt.parse(path).resolution)
    const shouldDisplayFullFileName = (playableFileList?.length ?? 0) > 1 && !fileHasEpisodeText

    const isVlcUsed = JSON.parse(localStorage.getItem('isVlcUsed') || 'null') ?? false
    const isInfuseUsed = JSON.parse(localStorage.getItem('isInfuseUsed') || 'null') ?? false
    const isSenPlayerUsed = JSON.parse(localStorage.getItem('isSenPlayerUsed') || 'null') ?? false
    const isIinaUsed = JSON.parse(localStorage.getItem('isIinaUsed') || 'null') ?? false
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

    return !playableFileList?.length ? (
      t('NoPlayableFiles')
    ) : (
      <>
        <TableStyle>
          <thead>
            <tr>
              <th style={{ width: '0' }}>{t('Viewed')}</th>
              <th>{t('Name')}</th>
              {fileHasSeasonText && seasonAmount?.length === 1 && <th style={{ width: '0' }}>{t('Season')}</th>}
              {fileHasEpisodeText && <th style={{ width: '0' }}>{t('Episode')}</th>}
              {fileHasResolutionText && <th style={{ width: '0' }}>{t('Resolution')}</th>}
              <th style={{ width: '100px' }}>{t('Size')}</th>
              <th style={{ width: '420px' }}>{t('Actions')}</th>
            </tr>
          </thead>

          <tbody>
            {playableFileList.map(({ id, path, length }) => {
              const { title, resolution, episode, season } = ptt.parse(path)
              const isViewed = viewedFileList?.includes(id)
              const link = getFileLink(path, id)
              const player = getPlayer(path, id)
              const playerSupported = !unsupportedPlayers[player.key]
              const fullLink = new URL(link, window.location.href)
              const infuseLink = `infuse://x-callback-url/play?url=${encodeURIComponent(fullLink.toString())}`
              const senPlayerLink = `senplayer://x-callback-url/play?url=${encodeURIComponent(fullLink.toString())}`
              const iinaLink = `iina://weblink?url=${encodeURIComponent(fullLink.toString())}`

              return (
                (season === selectedSeason || !seasonAmount?.length) && (
                  <tr key={id} className={isViewed ? 'viewed-file-row' : undefined}>
                    <td
                      data-label='viewed'
                      aria-label='viewed'
                      className={isViewed ? 'viewed-file-indicator' : undefined}
                    />
                    <td data-label='name'>{shouldDisplayFullFileName ? path : title}</td>
                    {fileHasSeasonText && seasonAmount?.length === 1 && <td data-label='season'>{season}</td>}
                    {fileHasEpisodeText && <td data-label='episode'>{episode}</td>}
                    {fileHasResolutionText && <td data-label='resolution'>{resolution}</td>}
                    <td data-label='size'>{humanizeSize(length)}</td>
                    <td>
                      <FileRowActions
                        preloadLabel={t('Preload')}
                        onPreload={() => preloadBuffer(id)}
                        playerSupported={playerSupported}
                        playerTitle={title}
                        playerSrc={player.src}
                        downloadSrc={link}
                        hls={player.hls}
                        heartbeatSrc={player.heartbeatSrc}
                        onPlayerNotSupported={() => markPlayerUnsupported(player.key)}
                        openLinkHref={link}
                        showOpenLink={shouldShowOpenLink}
                        copyText={fullLink.toString()}
                        externalPlayers={buildExternalPlayers(fullLink, infuseLink, senPlayerLink, iinaLink)}
                      />
                    </td>
                  </tr>
                )
              )
            })}
          </tbody>
        </TableStyle>

        <ShortTableWrapper>
          {playableFileList.map(({ id, path, length }) => {
            const { title, resolution, episode, season } = ptt.parse(path)
            const isViewed = viewedFileList?.includes(id)
            const link = getFileLink(path, id)
            const player = getPlayer(path, id)
            const playerSupported = !unsupportedPlayers[player.key]
            const fullLink = new URL(link, window.location.href)
            const infuseLink = `infuse://x-callback-url/play?url=${encodeURIComponent(fullLink.toString())}`
            const senPlayerLink = `senplayer://x-callback-url/play?url=${encodeURIComponent(fullLink.toString())}`
            const iinaLink = `iina://weblink?url=${encodeURIComponent(fullLink.toString())}`

            return (
              (season === selectedSeason || !seasonAmount?.length) && (
                <ShortTable key={id} $isViewed={isViewed}>
                  <div className='short-table-name'>{shouldDisplayFullFileName ? path : title}</div>
                  <div className='short-table-data'>
                    {isViewed && (
                      <div className='short-table-field'>
                        <div className='short-table-field-name'>{t('Viewed')}</div>
                        <div className='short-table-field-value'>
                          <div className='short-table-viewed-indicator' />
                        </div>
                      </div>
                    )}
                    {fileHasSeasonText && seasonAmount?.length === 1 && (
                      <div className='short-table-field'>
                        <div className='short-table-field-name'>{t('Season')}</div>
                        <div className='short-table-field-value'>{season}</div>
                      </div>
                    )}
                    {fileHasEpisodeText && (
                      <div className='short-table-field'>
                        <div className='short-table-field-name'>{t('Episode')}</div>
                        <div className='short-table-field-value'>{episode}</div>
                      </div>
                    )}
                    {fileHasResolutionText && (
                      <div className='short-table-field'>
                        <div className='short-table-field-name'>{t('Resolution')}</div>
                        <div className='short-table-field-value'>{resolution}</div>
                      </div>
                    )}
                    <div className='short-table-field'>
                      <div className='short-table-field-name'>{t('Size')}</div>
                      <div className='short-table-field-value'>{humanizeSize(length)}</div>
                    </div>
                  </div>
                  <div className='short-table-buttons'>
                    <FileRowActions
                      preloadLabel={t('Preload')}
                      onPreload={() => preloadBuffer(id)}
                      playerSupported={playerSupported}
                      playerTitle={title}
                      playerSrc={player.src}
                      downloadSrc={link}
                      hls={player.hls}
                      heartbeatSrc={player.heartbeatSrc}
                      onPlayerNotSupported={() => markPlayerUnsupported(player.key)}
                      openLinkHref={link}
                      showOpenLink={shouldShowOpenLink}
                      copyText={fullLink.toString()}
                      externalPlayers={buildExternalPlayers(fullLink, infuseLink, senPlayerLink, iinaLink)}
                    />
                  </div>
                </ShortTable>
              )
            )
          })}
        </ShortTableWrapper>
      </>
    )
  },
  (prev, next) => isEqual(prev, next),
)

export default Table

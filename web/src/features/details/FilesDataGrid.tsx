import { memo, useMemo, useState, type ReactNode } from 'react'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
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
    <Card variant='outlined' sx={{ overflow: 'hidden' }}>
      <Box sx={{ px: 1.5, py: 1.25, bgcolor: viewed ? 'success.dark' : 'primary.main', color: 'primary.contrastText' }}>
        <Typography variant='subtitle2' sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
          {name}
        </Typography>
      </Box>
      <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
        <Stack direction='row' spacing={2} sx={{ mb: 1 }}>
          {viewed && (
            <Typography variant='caption' color='text.secondary'>
              {t('Viewed')}
            </Typography>
          )}
          <Typography variant='caption' color='text.secondary'>
            {t('Size')}: {humanizeSize(size)}
          </Typography>
        </Stack>
        {actions}
      </CardContent>
    </Card>
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
        return season === selectedSeason || !seasonAmount?.length
      })
    }, [playableFileList, selectedSeason, seasonAmount])

    const rows = useMemo(
      () =>
        filtered.map(file => {
          const parsed = ptt.parse(file.path)
          const link = getFileLink(file.path, file.id)
          const player = getPlayer(file.path, file.id)
          const fullLink = new URL(link, window.location.href)
          return {
            id: file.id,
            name: shouldDisplayFullFileName ? file.path : parsed.title || file.path,
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
          }
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps -- helpers close over hash/gst
      [filtered, viewedFileList, shouldDisplayFullFileName, hash, gstRuntime, unsupportedPlayers],
    )

    const renderActions = (row: (typeof rows)[number]) => (
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

    const columns = useMemo<GridColDef[]>(() => {
      const cols: GridColDef[] = [
        {
          field: 'viewed',
          headerName: t('Viewed'),
          width: 70,
          renderCell: params =>
            params.value ? (
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main', m: 'auto' }} />
            ) : null,
        },
        { field: 'name', headerName: t('Name'), flex: 1, minWidth: 160 },
      ]
      if (fileHasSeasonText && seasonAmount?.length === 1) {
        cols.push({ field: 'season', headerName: t('Season'), width: 80 })
      }
      if (fileHasEpisodeText) cols.push({ field: 'episode', headerName: t('Episode'), width: 80 })
      if (fileHasResolutionText) cols.push({ field: 'resolution', headerName: t('Resolution'), width: 100 })
      cols.push({
        field: 'size',
        headerName: t('Size'),
        width: 100,
        valueFormatter: (value: number) => humanizeSize(value),
      })
      cols.push({
        field: 'actions',
        headerName: t('Actions'),
        width: 360,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: params => renderActions(params.row),
      })
      return cols
    }, [
      t,
      fileHasSeasonText,
      fileHasEpisodeText,
      fileHasResolutionText,
      seasonAmount,
      unsupportedPlayers,
      shouldShowOpenLink,
    ])

    if (!playableFileList?.length) return t('NoPlayableFiles')

    if (isCompact) {
      return (
        <Stack spacing={1.5}>
          {rows.map(row => (
            <ShortFileCard
              key={row.id}
              name={row.name}
              size={row.size}
              viewed={row.viewed}
              actions={renderActions(row)}
            />
          ))}
        </Stack>
      )
    }

    return (
      <Box sx={{ width: '100%', minHeight: 240, height: Math.min(480, 56 + rows.length * 64) }}>
        <DataGrid
          rows={rows}
          columns={columns}
          density='compact'
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
          pageSizeOptions={[25, 50, 100]}
          initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
          sx={{
            border: 0,
            '& .MuiDataGrid-cell': { py: 0.75, alignItems: 'flex-start' },
          }}
        />
      </Box>
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

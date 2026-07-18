import CheckCircleIcon from '@mui/icons-material/CheckCircle'
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
    <Card
      variant='outlined'
      sx={{
        overflow: 'hidden',
        borderLeft: 4,
        borderLeftColor: viewed ? 'success.main' : 'primary.main',
      }}
    >
      <Box sx={{ px: 1.5, py: 1.25 }}>
        <Typography variant='subtitle2' sx={{ wordBreak: 'break-word', fontWeight: 600 }}>
          {name}
        </Typography>
      </Box>
      <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
        <Stack direction='row' spacing={2} sx={{ mb: 1, alignItems: 'center' }}>
          {viewed ? (
            <Typography variant='caption' color='success.main' sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
              <CheckCircleIcon fontSize='inherit' />
              {t('Viewed')}
            </Typography>
          ) : null}
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
          align: 'center',
          headerAlign: 'center',
          renderCell: params =>
            params.value ? <CheckCircleIcon color='success' fontSize='small' aria-label={t('Viewed')} /> : null,
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
        flex: 1,
        minWidth: 280,
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
      <Box sx={{ width: '100%', minHeight: 240, height: Math.min(520, 56 + rows.length * 72) }}>
        <DataGrid
          rows={rows}
          columns={columns}
          density='compact'
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
          getRowClassName={({ row }) => (row.viewed ? 'viewed-row' : '')}
          pageSizeOptions={[25, 50, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
            sorting: fileHasEpisodeText ? { sortModel: [{ field: 'episode', sort: 'asc' }] } : undefined,
          }}
          sx={{
            border: 0,
            '& .viewed-row': { bgcolor: 'action.selected' },
            '& .MuiDataGrid-cell': { py: 1, alignItems: 'center' },
            '& .MuiDataGrid-cell[data-field="actions"]': { alignItems: 'flex-start' },
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

import { useMemo } from 'react'
import { DataGrid, type GridColDef, type GridRowParams } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { getPeerString, humanizeSize, humanizeSpeed } from 'shared/lib/format'
import { CLOSED, GETTING_INFO, IN_DB, PRELOAD, WORKING } from 'shared/torrent/states'

const STATUS_COLOR: Record<number, string> = {
  [GETTING_INFO]: '#2196F3',
  [PRELOAD]: '#FF9800',
  [WORKING]: '#4CAF50',
  [CLOSED]: '#9E9E9E',
  [IN_DB]: '#607D8B',
}

interface SimpleTorrentsDataGridProps {
  torrents: TorrentStat[]
  onSelect: (torrent: TorrentStat) => void
}

export default function SimpleTorrentsDataGrid({ torrents, onSelect }: SimpleTorrentsDataGridProps) {
  const { t } = useTranslation()

  const pick = (torrent: TorrentStat) => {
    onSelect(torrent)
  }

  const statusLabel = (stat: number) => {
    const map: Record<number, string> = {
      [GETTING_INFO]: t('TorrentGettingInfo'),
      [PRELOAD]: t('TorrentPreload'),
      [WORKING]: t('TorrentWorking'),
      [CLOSED]: t('TorrentClosed'),
      [IN_DB]: t('TorrentInDB'),
    }
    return map[stat] || String(stat)
  }

  const rows = useMemo(
    () =>
      torrents.map(torrent => ({
        id: torrent.hash,
        title: torrent.title || torrent.name || torrent.hash,
        size: torrent.torrent_size ?? 0,
        download: torrent.download_speed ?? 0,
        upload: torrent.upload_speed ?? 0,
        peers: getPeerString(torrent) || '—',
        status: torrent.stat ?? 0,
        torrent,
      })),
    [torrents],
  )

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'title', headerName: t('Name', { defaultValue: 'Name' }), flex: 2, minWidth: 200 },
      {
        field: 'status',
        headerName: t('Status', { defaultValue: 'Status' }),
        width: 140,
        renderCell: params => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
            <Box
              component='span'
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: STATUS_COLOR[params.value as number] || '#9E9E9E',
                flexShrink: 0,
              }}
            />
            {statusLabel(params.value as number)}
          </Box>
        ),
      },
      {
        field: 'size',
        headerName: t('Size', { defaultValue: 'Size' }),
        width: 110,
        valueFormatter: (value: number) => humanizeSize(value),
      },
      {
        field: 'download',
        headerName: t('Download', { defaultValue: 'Download' }),
        width: 120,
        valueFormatter: (value: number) => humanizeSpeed(value),
      },
      {
        field: 'upload',
        headerName: t('Upload', { defaultValue: 'Upload' }),
        width: 120,
        valueFormatter: (value: number) => humanizeSpeed(value),
      },
      { field: 'peers', headerName: t('Peers', { defaultValue: 'Peers' }), width: 110 },
    ],
    [t],
  )

  const onRowClick = (params: GridRowParams) => {
    pick(params.row.torrent as TorrentStat)
  }

  return (
    <Box sx={{ height: '100%', width: '100%', minHeight: 0 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        density='compact'
        pageSizeOptions={[25, 50, 100]}
        initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
        onRowClick={onRowClick}
        sx={{
          border: 0,
          height: '100%',
          cursor: 'pointer',
          '& .MuiDataGrid-cell': { fontSize: '0.8125rem' },
          '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600 },
        }}
      />
    </Box>
  )
}

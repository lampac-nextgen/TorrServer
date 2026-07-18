import { useMemo } from 'react'
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'
import type { SearchResultItem } from 'shared/api/types'

interface SearchResultsGridProps {
  results: SearchResultItem[]
  loading: boolean
  adding: boolean
  addingKey: string | null
  resultDedupeKey: (item: SearchResultItem) => string
  formatSize: (item: SearchResultItem) => string
  onAdd: (item: SearchResultItem) => void
}

/** Torznab/Rutor search results as MUI X Data Grid. */
export default function SearchResultsGrid({
  results,
  loading,
  adding,
  addingKey,
  resultDedupeKey,
  formatSize,
  onAdd,
}: SearchResultsGridProps) {
  const { t } = useTranslation()

  const rows = useMemo(
    () =>
      results.map((item, index) => {
        const key = resultDedupeKey(item) || `${item.Title || 'item'}-${index}`
        return {
          id: key,
          title: item.Title || '—',
          poster: item.Poster || '',
          size: formatSize(item),
          seeders: item.Seed ?? '—',
          peers: item.Peer ?? '—',
          item,
        }
      }),
    [results, resultDedupeKey, formatSize],
  )

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'poster',
        headerName: '',
        width: 56,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams) =>
          params.value ? (
            <Box
              component='img'
              src={String(params.value)}
              alt=''
              sx={{ width: 36, height: 54, objectFit: 'cover', borderRadius: 0.5, my: 0.5 }}
            />
          ) : (
            <Box sx={{ width: 36, height: 54, bgcolor: 'action.hover', borderRadius: 0.5, my: 0.5 }} />
          ),
      },
      { field: 'title', headerName: t('Name'), flex: 2, minWidth: 180 },
      { field: 'size', headerName: t('Size'), width: 100 },
      { field: 'seeders', headerName: t('Seeders'), width: 90 },
      { field: 'peers', headerName: t('Peers'), width: 90 },
      {
        field: 'actions',
        headerName: '',
        width: 100,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams) => {
          const key = String(params.id)
          const busy = adding && addingKey === key
          return (
            <Button
              size='small'
              variant='contained'
              disabled={adding}
              onClick={e => {
                e.stopPropagation()
                onAdd(params.row.item as SearchResultItem)
              }}
            >
              {busy ? <CircularProgress size={16} color='inherit' /> : t('Add')}
            </Button>
          )
        },
      },
    ],
    [t, adding, addingKey, onAdd],
  )

  if (loading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 4 }}>
        <CircularProgress color='secondary' size={32} />
      </Box>
    )
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      density='compact'
      disableRowSelectionOnClick
      pageSizeOptions={[25, 50]}
      initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
      getRowHeight={() => 'auto'}
      sx={{
        border: 0,
        minHeight: 280,
        height: '100%',
        opacity: adding ? 0.85 : 1,
        '& .MuiDataGrid-cell': { py: 0.5 },
        '& .MuiDataGrid-row': {
          ...(addingKey
            ? {
                [`&[data-id="${addingKey}"]`]: { bgcolor: 'action.selected' },
              }
            : {}),
        },
      }}
    />
  )
}

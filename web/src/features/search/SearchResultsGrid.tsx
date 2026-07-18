import { useMemo } from 'react'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
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

/** Torznab search results as MUI X Data Grid. */
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
      { field: 'title', headerName: t('Name', { defaultValue: 'Name' }), flex: 2, minWidth: 180 },
      { field: 'size', headerName: t('Size', { defaultValue: 'Size' }), width: 100 },
      { field: 'seeders', headerName: t('Seeders', { defaultValue: 'Seeders' }), width: 90 },
      { field: 'peers', headerName: t('Peers', { defaultValue: 'Peers' }), width: 90 },
    ],
    [t],
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
      onRowClick={params => {
        if (!adding) onAdd(params.row.item as SearchResultItem)
      }}
      sx={{
        border: 0,
        minHeight: 280,
        height: '100%',
        cursor: adding ? 'wait' : 'pointer',
        opacity: adding ? 0.7 : 1,
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

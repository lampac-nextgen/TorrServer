import { lazy, Suspense, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'

import TorrentCard from './TorrentCard'

const DetailsDialog = lazy(() => import('features/details/DetailsDialog'))
const EditTorrentDialog = lazy(() => import('features/add/EditTorrentDialog'))

export interface TorrentsPageProps {
  sortABC: boolean
  sortCategory: string
  onAdd?: () => void
}

function sortTorrents(torrents: TorrentStat[], sortABC: boolean, sortCategory: string) {
  const filtered = torrents.filter(t => sortCategory === 'all' || t.category === sortCategory)

  if (sortABC) {
    return [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || '') || a.hash.localeCompare(b.hash))
  }

  return [...filtered].sort((a, b) => {
    const tsA = a.timestamp || 0
    const tsB = b.timestamp || 0
    if (tsA !== tsB) return tsB - tsA
    return a.hash.localeCompare(b.hash)
  })
}

const gridSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, minmax(0, 1fr))',
    lg: 'repeat(3, minmax(0, 1fr))',
  },
  gap: { xs: 1, sm: 1.25, md: 1.5 },
  p: { xs: 1, sm: 1.25, md: 1.75 },
  pb: 2.5,
  alignContent: 'start',
  minHeight: '100%',
  bgcolor: 'background.default',
} as const

export default function TorrentsPage({ sortABC, sortCategory, onAdd }: TorrentsPageProps) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<TorrentStat | null>(null)
  const [editing, setEditing] = useState<TorrentStat | null>(null)

  const { data: torrents, isLoading, isError } = useTorrentsQuery()

  const sorted = useMemo(
    () => (torrents ? sortTorrents(torrents, sortABC, sortCategory) : []),
    [torrents, sortABC, sortCategory],
  )

  if (isLoading) {
    return (
      <Box sx={gridSx}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} variant='rounded' height={132} sx={{ borderRadius: 2.5 }} />
        ))}
      </Box>
    )
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          height: '100%',
          minHeight: 200,
          p: 3,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <CloudOffIcon sx={{ fontSize: 48, mb: 1, opacity: 0.6 }} />
        <Typography variant='h6'>{t('NoServerConnection')}</Typography>
      </Box>
    )
  }

  if (!torrents?.length) {
    return (
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          height: '100%',
          minHeight: 200,
          p: 3,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <ButtonBase
          onClick={onAdd}
          disabled={!onAdd}
          sx={{
            display: 'grid',
            placeItems: 'center',
            gap: 1.5,
            p: 3,
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            borderStyle: 'dashed',
            minWidth: 260,
            minHeight: 180,
            bgcolor: 'background.paper',
          }}
        >
          <CreateNewFolderOutlinedIcon sx={{ fontSize: 48, opacity: 0.7 }} color='primary' />
          <Typography variant='h6' color='text.primary'>
            {t('NoTorrentsAdded')}
          </Typography>
          <Button variant='contained' component='span'>
            {t('AddFirstTorrent')}
          </Button>
        </ButtonBase>
      </Box>
    )
  }

  if (!sorted.length) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '100%', p: 3 }}>
        <Typography color='text.secondary'>{t('NoTorrentsInCategory')}</Typography>
      </Box>
    )
  }

  return (
    <>
      <Box sx={gridSx}>
        {sorted.map(torrent => (
          <TorrentCard key={torrent.hash} torrent={torrent} onSelect={setSelected} onEdit={setEditing} />
        ))}
      </Box>

      {selected ? (
        <Suspense fallback={null}>
          <DetailsDialog
            torrent={selected}
            onClose={() => setSelected(null)}
            onEdit={torrent => {
              setSelected(null)
              setEditing(torrent)
            }}
          />
        </Suspense>
      ) : null}

      <Suspense fallback={null}>
        <EditTorrentDialog torrent={editing} open={Boolean(editing)} onClose={() => setEditing(null)} />
      </Suspense>
    </>
  )
}

export { sortTorrents }

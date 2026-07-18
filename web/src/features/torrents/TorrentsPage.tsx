import { lazy, Suspense, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { getTorrents } from 'shared/api/torrents'
import { humanizeSize, humanizeSpeed } from 'shared/lib/format'
import { queryMax } from 'shared/theme/breakpoints'

import SimpleTorrentsDataGrid from './SimpleTorrentsDataGrid'

const DetailsDialog = lazy(() => import('features/details/DetailsDialog'))

export interface TorrentsPageProps {
  sortABC: boolean
  sortCategory: string
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

export default function TorrentsPage({ sortABC, sortCategory }: TorrentsPageProps) {
  const { t } = useTranslation()
  const isMobile = useMediaQuery(queryMax('mobile'))
  const [selected, setSelected] = useState<TorrentStat | null>(null)

  const {
    data: torrents,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['torrents'],
    queryFn: getTorrents,
    retry: 1,
    refetchInterval: () => (document.hidden ? 5000 : 1000),
  })

  const sorted = useMemo(
    () => (torrents ? sortTorrents(torrents, sortABC, sortCategory) : []),
    [torrents, sortABC, sortCategory],
  )

  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Stack key={i} spacing={1} sx={{ mb: 2 }}>
            <Skeleton variant='rounded' height={isMobile ? 100 : 48} />
            <Skeleton width='60%' />
          </Stack>
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
        <Typography variant='h6'>{t('NoServerConnection', { defaultValue: 'No server connection' })}</Typography>
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
        <FolderOpenIcon sx={{ fontSize: 48, mb: 1, opacity: 0.6 }} />
        <Typography variant='h6'>{t('AddFirstTorrent', { defaultValue: 'Add your first torrent' })}</Typography>
      </Box>
    )
  }

  if (!sorted.length) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '100%', p: 3 }}>
        <Typography color='text.secondary'>
          {t('NoTorrentsInCategory', { defaultValue: 'No torrents in this category' })}
        </Typography>
      </Box>
    )
  }

  return (
    <>
      {!isMobile ? (
        <Box sx={{ height: '100%', minHeight: 0, p: 1 }}>
          <SimpleTorrentsDataGrid torrents={sorted} onSelect={setSelected} />
        </Box>
      ) : (
        <Stack spacing={1.5} sx={{ p: 1.5, pb: 2 }}>
          {sorted.map(torrent => (
            <Card key={torrent.hash} variant='outlined'>
              <CardActionArea onClick={() => setSelected(torrent)}>
                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Typography variant='subtitle2' noWrap>
                    {torrent.title || torrent.name || torrent.hash}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {humanizeSize(torrent.torrent_size)} · ↓{humanizeSpeed(torrent.download_speed)} · ↑
                    {humanizeSpeed(torrent.upload_speed)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}

      {selected ? (
        <Suspense fallback={null}>
          <DetailsDialog torrent={selected} onClose={() => setSelected(null)} />
        </Suspense>
      ) : null}
    </>
  )
}

export { sortTorrents }

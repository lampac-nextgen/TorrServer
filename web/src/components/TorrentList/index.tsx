import { useMemo } from 'react'
import TorrentCard from 'components/TorrentCard'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { TorrentListWrapper, CenteredGrid } from 'components/App/style'
import type { OfflineAwareProps, TorrentStat } from 'types/api'

import NoServerConnection from './NoServerConnection'
import AddFirstTorrent from './AddFirstTorrent'

interface TorrentListProps extends OfflineAwareProps {
  sortABC: boolean
  torrents?: TorrentStat[]
  sortCategory: string
}

export default function TorrentList({ isOffline, isLoading, sortABC, torrents, sortCategory }: TorrentListProps) {
  const { t } = useTranslation()
  const sortedTorrents = useMemo(() => {
    if (!torrents) return []
    const filtered = torrents.filter(torrent => sortCategory === 'all' || torrent.category === sortCategory)

    if (sortABC) {
      return [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || '') || a.hash.localeCompare(b.hash))
    }

    return [...filtered].sort((a, b) => {
      const tsA = a.timestamp || 0
      const tsB = b.timestamp || 0
      if (tsA !== tsB) return tsB - tsA
      return a.hash.localeCompare(b.hash)
    })
  }, [torrents, sortCategory, sortABC])

  if (isLoading) {
    return (
      <TorrentListWrapper>
        {Array.from({ length: 4 }).map((_, i) => (
          <Stack key={i} spacing={1} sx={{ p: 2 }}>
            <Skeleton variant='rounded' height={160} />
            <Skeleton width='60%' />
            <Skeleton width='40%' />
          </Stack>
        ))}
      </TorrentListWrapper>
    )
  }

  if (isOffline) {
    return (
      <CenteredGrid>
        <NoServerConnection />
      </CenteredGrid>
    )
  }

  if (!torrents?.length) {
    return (
      <CenteredGrid>
        <AddFirstTorrent />
      </CenteredGrid>
    )
  }

  if (!sortedTorrents.length) {
    return (
      <CenteredGrid>
        <Typography color='text.secondary'>
          {t('NoTorrentsInCategory', { defaultValue: 'No torrents in this category' })}
        </Typography>
      </CenteredGrid>
    )
  }

  return (
    <TorrentListWrapper>
      {sortedTorrents.map(torrent => (
        <TorrentCard key={torrent.hash} torrent={torrent} />
      ))}
    </TorrentListWrapper>
  )
}

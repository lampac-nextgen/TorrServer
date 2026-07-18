import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { getPeerString, humanizeSize, humanizeSpeed } from 'shared/lib/format'
import { CLOSED, GETTING_INFO, IN_DB, PRELOAD, WORKING } from 'shared/torrent/states'

export interface TorrentCardProps {
  torrent: TorrentStat
  onSelect: (torrent: TorrentStat) => void
}

function statusColor(stat?: number): 'default' | 'primary' | 'success' | 'warning' | 'info' {
  switch (stat) {
    case WORKING:
      return 'success'
    case PRELOAD:
    case GETTING_INFO:
      return 'info'
    case CLOSED:
      return 'default'
    case IN_DB:
      return 'warning'
    default:
      return 'primary'
  }
}

export default function TorrentCard({ torrent, onSelect }: TorrentCardProps) {
  const { t } = useTranslation()
  const title = torrent.title || torrent.name || torrent.hash
  const poster = torrent.poster

  const statusLabel = (() => {
    const map: Record<number, string> = {
      [GETTING_INFO]: t('TorrentGettingInfo'),
      [PRELOAD]: t('TorrentPreload'),
      [WORKING]: t('TorrentWorking'),
      [CLOSED]: t('TorrentClosed'),
      [IN_DB]: t('TorrentInDB'),
    }
    return torrent.stat != null ? map[torrent.stat] || String(torrent.stat) : '—'
  })()

  return (
    <Card variant='outlined' sx={{ overflow: 'hidden' }}>
      <CardActionArea onClick={() => onSelect(torrent)} sx={{ alignItems: 'stretch' }}>
        <Stack direction='row' spacing={0} sx={{ minHeight: 112 }}>
          <Box
            sx={{
              width: 80,
              flexShrink: 0,
              bgcolor: 'action.hover',
              display: 'grid',
              placeItems: 'center',
              overflow: 'hidden',
            }}
          >
            {poster ? (
              <Box
                component='img'
                src={poster}
                alt=''
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <ImageNotSupportedIcon color='disabled' />
            )}
          </Box>
          <CardContent sx={{ flex: 1, minWidth: 0, py: 1.25, px: 1.5, '&:last-child': { pb: 1.25 } }}>
            <Typography variant='subtitle2' noWrap title={title} sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Stack direction='row' spacing={0.75} sx={{ mt: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
              <Chip size='small' label={statusLabel} color={statusColor(torrent.stat)} variant='outlined' />
              {torrent.category ? <Chip size='small' label={t(torrent.category)} variant='outlined' /> : null}
            </Stack>
            <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mt: 0.75 }}>
              {humanizeSize(torrent.torrent_size)} · ↓{humanizeSpeed(torrent.download_speed)} · ↑
              {humanizeSpeed(torrent.upload_speed)}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {getPeerString(torrent) || '—'}
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  )
}

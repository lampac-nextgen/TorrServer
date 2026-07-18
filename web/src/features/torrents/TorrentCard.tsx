import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { getPeerString, humanizeSize, humanizeSpeed } from 'shared/lib/format'
import { CLOSED, GETTING_INFO, IN_DB, PRELOAD, WORKING } from 'shared/torrent/states'
import { queryMax } from 'shared/theme/breakpoints'
import { getThemeColors } from 'shared/theme/colors'
import { radius } from 'shared/theme/tokens'

import TorrentCardActions from './TorrentCardActions'

export interface TorrentCardProps {
  torrent: TorrentStat
  onSelect: (torrent: TorrentStat) => void
  onEdit?: (torrent: TorrentStat) => void
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
      return 'default'
    default:
      return 'primary'
  }
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ minWidth: 72, flex: '1 1 72px' }}>
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ display: 'block', lineHeight: 1.2, fontSize: '0.68rem', letterSpacing: '0.04em' }}
      >
        {label}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.3,
          fontSize: { xs: '0.875rem', sm: '0.9375rem' },
          mt: 0.25,
        }}
        title={value}
      >
        {value}
      </Typography>
    </Box>
  )
}

export default function TorrentCard({ torrent, onSelect, onEdit }: TorrentCardProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(queryMax('mobile'))
  const mode = theme.palette.mode === 'dark' ? 'dark' : 'light'
  const cardColors = getThemeColors(mode).torrentCard

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
    <Card
      elevation={0}
      sx={{
        overflow: 'hidden',
        borderRadius: { xs: 2, sm: 2.5 },
        border: 1,
        borderColor: 'divider',
        bgcolor: cardColors.cardSurfaceColor,
        transition: theme.transitions.create(['border-color', 'box-shadow'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          borderColor: mode === 'dark' ? 'rgba(46, 207, 154, 0.28)' : 'rgba(0, 165, 114, 0.35)',
          boxShadow: mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(15, 25, 21, 0.08)',
        },
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0} sx={{ alignItems: 'stretch' }}>
        <Box
          onClick={() => onSelect(torrent)}
          sx={{
            width: { xs: '100%', sm: 108 },
            height: { xs: 168, sm: 'auto' },
            minHeight: { sm: 148 },
            flexShrink: 0,
            bgcolor: cardColors.accentCardColor,
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
            cursor: 'pointer',
            borderRadius: { sm: `${radius.md}px 0 0 ${radius.md}px` },
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
            <ImageNotSupportedIcon sx={{ color: 'text.disabled', fontSize: 36 }} />
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: { xs: 1.5, sm: 2 },
            py: { xs: 1.25, sm: 1.5 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box onClick={() => onSelect(torrent)} sx={{ cursor: 'pointer' }}>
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              sx={{
                fontWeight: 600,
                lineHeight: 1.35,
                color: 'text.primary',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
              title={title}
            >
              {title}
            </Typography>
            <Stack direction='row' spacing={0.75} sx={{ mt: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
              <Chip
                size='small'
                label={statusLabel}
                color={statusColor(torrent.stat)}
                variant={torrent.stat === IN_DB ? 'outlined' : 'filled'}
              />
              {torrent.category ? <Chip size='small' label={t(torrent.category)} variant='outlined' /> : null}
            </Stack>
          </Box>

          <Stack
            direction='row'
            useFlexGap
            spacing={{ xs: 1.25, sm: 2 }}
            sx={{
              flexWrap: 'wrap',
              pt: 0.75,
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <StatCell label={t('Size')} value={humanizeSize(torrent.torrent_size)} />
            <StatCell label={`↓ ${t('Download')}`} value={humanizeSpeed(torrent.download_speed)} />
            <StatCell label={`↑ ${t('Upload')}`} value={humanizeSpeed(torrent.upload_speed)} />
            <StatCell label={t('Peers')} value={getPeerString(torrent) || '—'} />
          </Stack>

          <Box sx={{ mt: 'auto', pt: 0.5 }}>
            <TorrentCardActions
              torrent={torrent}
              onDetails={() => onSelect(torrent)}
              onEdit={onEdit ? () => onEdit(torrent) : undefined}
            />
          </Box>
        </Box>
      </Stack>
    </Card>
  )
}

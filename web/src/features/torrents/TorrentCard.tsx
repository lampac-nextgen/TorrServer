import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { alpha, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { getPeerString, humanizeSize, humanizeSpeed } from 'shared/lib/format'
import { CLOSED, GETTING_INFO, IN_DB, PRELOAD, WORKING } from 'shared/torrent/states'

import TorrentCardActions from './TorrentCardActions'

export interface TorrentCardProps {
  torrent: TorrentStat
  onSelect: (torrent: TorrentStat) => void
  onEdit?: (torrent: TorrentStat) => void
}

function statusColor(stat?: number): 'default' | 'success' | 'warning' | 'info' {
  switch (stat) {
    case WORKING:
      return 'success'
    case PRELOAD:
    case GETTING_INFO:
      return 'info'
    case CLOSED:
    case IN_DB:
      return 'default'
    default:
      return 'default'
  }
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ minWidth: 0, flex: '1 1 0' }}>
      <Typography
        component='div'
        sx={{
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          lineHeight: 1.2,
          mb: 0.35,
        }}
      >
        {label}
      </Typography>
      <Typography
        component='div'
        noWrap
        title={value}
        sx={{
          fontSize: '0.8125rem',
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.25,
          color: 'text.primary',
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}

export default function TorrentCard({ torrent, onSelect, onEdit }: TorrentCardProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  const title = torrent.title || torrent.name || torrent.hash
  const poster = torrent.poster
  const isDark = theme.palette.mode === 'dark'

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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        minHeight: 132,
        borderRadius: 2.5,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        boxShadow: isDark ? `0 1px 0 ${alpha('#fff', 0.04)}` : `0 1px 2px ${alpha('#0b1210', 0.06)}`,
        transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, isDark ? 0.45 : 0.35),
          boxShadow: isDark
            ? `0 10px 28px ${alpha('#000', 0.45)}`
            : `0 10px 28px ${alpha('#0b1210', 0.1)}`,
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Box
        onClick={() => onSelect(torrent)}
        sx={{
          width: 88,
          flexShrink: 0,
          bgcolor: alpha(theme.palette.primary.main, isDark ? 0.12 : 0.08),
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {poster ? (
          <Box
            component='img'
            src={poster}
            alt=''
            loading='lazy'
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <ImageNotSupportedIcon sx={{ color: 'text.disabled', fontSize: 28 }} />
        )}
      </Box>

      <Box
        onClick={() => onSelect(torrent)}
        sx={{
          flex: 1,
          minWidth: 0,
          px: 1.5,
          py: 1.25,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          cursor: 'pointer',
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            title={title}
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              lineHeight: 1.35,
              color: 'text.primary',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>
          <Stack direction='row' spacing={0.5} sx={{ mt: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
            <Chip
              size='small'
              label={statusLabel}
              color={statusColor(torrent.stat)}
              variant={torrent.stat === WORKING ? 'filled' : 'outlined'}
              sx={{ height: 22, '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem', fontWeight: 500 } }}
            />
            {torrent.category ? (
              <Chip
                size='small'
                label={t(torrent.category)}
                variant='outlined'
                sx={{ height: 22, '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' } }}
              />
            ) : null}
          </Stack>
        </Box>

        <Stack direction='row' spacing={1} useFlexGap sx={{ mt: 'auto', pt: 0.25 }}>
          <MetaStat label={t('Size')} value={humanizeSize(torrent.torrent_size)} />
          <MetaStat label={t('Download')} value={humanizeSpeed(torrent.download_speed)} />
          <MetaStat label={t('Peers')} value={getPeerString(torrent) || '—'} />
        </Stack>
      </Box>

      <TorrentCardActions
        torrent={torrent}
        onDetails={() => onSelect(torrent)}
        onEdit={onEdit ? () => onEdit(torrent) : undefined}
      />
    </Box>
  )
}

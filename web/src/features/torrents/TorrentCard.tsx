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
      return 'warning'
    default:
      return 'primary'
  }
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ minWidth: 88, flex: '1 1 88px' }}>
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ display: 'block', lineHeight: 1.2, fontSize: '0.7rem', letterSpacing: '0.02em' }}
      >
        {label}
      </Typography>
      <Typography
        variant='body1'
        sx={{
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.25,
          fontSize: { xs: '0.95rem', sm: '1.05rem' },
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
        borderRadius: { xs: 1.5, sm: 1 },
        border: 1,
        borderColor: cardColors.cardSecondaryColor,
        bgcolor: cardColors.cardSurfaceColor,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={0}
        sx={{ alignItems: 'stretch', minHeight: { sm: 176 } }}
      >
        <Box
          onClick={() => onSelect(torrent)}
          sx={{
            width: { xs: '100%', sm: 118 },
            height: { xs: 180, sm: 'auto' },
            flexShrink: 0,
            bgcolor: cardColors.cardSecondaryColor,
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
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <ImageNotSupportedIcon sx={{ color: '#fff', opacity: 0.85, fontSize: 40 }} />
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
            gap: 1.25,
          }}
        >
          <Box onClick={() => onSelect(torrent)} sx={{ cursor: 'pointer' }}>
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              sx={{
                fontWeight: 700,
                lineHeight: 1.3,
                color: cardColors.cardPrimaryColor,
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
              <Chip size='small' label={statusLabel} color={statusColor(torrent.stat)} variant='filled' />
              {torrent.category ? <Chip size='small' label={t(torrent.category)} variant='outlined' /> : null}
            </Stack>
          </Box>

          <Stack
            direction='row'
            useFlexGap
            spacing={{ xs: 1.5, sm: 2.5 }}
            sx={{
              flexWrap: 'wrap',
              mt: 'auto',
              pt: 0.5,
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <StatCell label={t('Size')} value={humanizeSize(torrent.torrent_size)} />
            <StatCell label={`↓ ${t('Download')}`} value={humanizeSpeed(torrent.download_speed)} />
            <StatCell label={`↑ ${t('Upload')}`} value={humanizeSpeed(torrent.upload_speed)} />
            <StatCell label={t('Peers')} value={getPeerString(torrent) || '—'} />
          </Stack>
        </Box>

        <Box
          sx={{
            width: { xs: '100%', sm: 168 },
            flexShrink: 0,
            display: 'flex',
            bgcolor: cardColors.buttonBGColor,
            borderTop: { xs: 1, sm: 0 },
            borderLeft: { sm: 1 },
            borderColor: cardColors.accentCardColor,
            p: { xs: 1, sm: 0 },
          }}
        >
          <TorrentCardActions
            torrent={torrent}
            onDetails={() => onSelect(torrent)}
            onEdit={onEdit ? () => onEdit(torrent) : undefined}
          />
        </Box>
      </Stack>
    </Card>
  )
}

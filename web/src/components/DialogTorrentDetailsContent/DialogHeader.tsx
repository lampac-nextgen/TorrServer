import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ArrowBack } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { isStandaloneApp } from 'utils/Utils'
import type { MouseEvent } from 'react'

interface DialogHeaderProps {
  title: string
  onClose: () => void
  onBack?: () => void
}

export default function DialogHeader({ title, onClose, onBack }: DialogHeaderProps) {
  const { t } = useTranslation()

  const handleClose = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    onClose()
  }

  return (
    <AppBar
      sx={{
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        zIndex: 2,
        ...(isStandaloneApp && { paddingTop: 'calc(8px + env(safe-area-inset-top, 0px))' }),
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 48, sm: 56 } }}>
        {onBack && (
          <IconButton edge='start' color='inherit' onClick={onBack} aria-label={t('Back', { defaultValue: 'Back' })}>
            <ArrowBack />
          </IconButton>
        )}

        <Typography
          variant='h6'
          sx={{
            marginLeft: '5px',
            flex: 1,
            fontWeight: 500,
            fontSize: { xs: '0.9375rem', sm: '1rem' },
            letterSpacing: 'normal',
          }}
        >
          {title}
        </Typography>

        <IconButton
          color='inherit'
          onClick={handleClose}
          aria-label={t('Close', { defaultValue: 'Close' })}
          sx={{ marginRight: '-10px' }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

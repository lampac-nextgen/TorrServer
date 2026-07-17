import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ArrowBack } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { isStandaloneApp } from 'utils/Utils'

interface DialogHeaderProps {
  title: string
  onClose: () => void
  onBack?: () => void
}

export default function DialogHeader({ title, onClose, onBack }: DialogHeaderProps) {
  const { t } = useTranslation()

  return (
    <AppBar
      sx={{
        position: 'relative',
        ...(isStandaloneApp && { paddingTop: 'calc(12px + env(safe-area-inset-top, 0px))' }),
      }}
    >
      <Toolbar>
        {onBack && (
          <IconButton edge='start' color='inherit' onClick={onBack} aria-label={t('Back', { defaultValue: 'Back' })}>
            <ArrowBack />
          </IconButton>
        )}

        <Typography variant='h6' sx={{ marginLeft: '5px', flex: 1 }}>
          {title}
        </Typography>

        <IconButton
          autoFocus
          color='inherit'
          onClick={onClose}
          aria-label={t('Close', { defaultValue: 'Close' })}
          sx={{ marginRight: '-10px' }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

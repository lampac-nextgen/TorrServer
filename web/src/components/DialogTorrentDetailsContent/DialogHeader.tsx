import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ArrowBack } from '@mui/icons-material'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

interface DialogHeaderProps {
  title: string
  onClose: () => void
  onBack?: () => void
}

const SafeAppBar = styled(AppBar)`
  && {
    position: relative;
    padding-top: var(--safe-top);
  }
`

/** Relative AppBar + safe-area top (all surfaces). */
export default function DialogHeader({ title, onClose, onBack }: DialogHeaderProps) {
  const { t } = useTranslation()

  return (
    <SafeAppBar>
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
          color='inherit'
          onClick={onClose}
          aria-label={t('Close', { defaultValue: 'Close' })}
          sx={{ marginRight: '-10px' }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </SafeAppBar>
  )
}

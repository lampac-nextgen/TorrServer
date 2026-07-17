import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ArrowBack } from '@mui/icons-material'
import { DIALOG_SAFE_TOP } from 'components/App/PWAFooter/style'
import { standaloneMedia } from 'style/standaloneMedia'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

interface DialogHeaderProps {
  title: string
  onClose: () => void
  onBack?: () => void
}

const StandaloneAppBar = styled(AppBar)`
  && {
    position: relative;
  }

  ${standaloneMedia(css`
    && {
      /* CSS path — do not rely on JS isStandaloneApp for notch pad */
      padding-top: ${DIALOG_SAFE_TOP};
    }
  `)}
`

/** Relative AppBar + standalone top pad via CSS (matches footer detection). */
export default function DialogHeader({ title, onClose, onBack }: DialogHeaderProps) {
  const { t } = useTranslation()

  return (
    <StandaloneAppBar>
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
    </StandaloneAppBar>
  )
}

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ArrowBack } from '@mui/icons-material'
import { isStandaloneApp } from 'utils/Utils'

interface DialogHeaderProps {
  title: string
  onClose: () => void
  onBack?: () => void
}

export default function DialogHeader({ title, onClose, onBack }: DialogHeaderProps) {
  return (
    <AppBar sx={{ position: 'relative', ...(isStandaloneApp && { paddingTop: '30px' }) }}>
      <Toolbar>
        {onBack && (
          <IconButton edge='start' color='inherit' onClick={onBack} aria-label='back'>
            <ArrowBack />
          </IconButton>
        )}

        <Typography variant='h6' sx={{ marginLeft: '5px', flex: 1 }}>
          {title}
        </Typography>

        <IconButton autoFocus color='inherit' onClick={onClose} aria-label='close' sx={{ marginRight: '-10px' }}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

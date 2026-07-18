import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { readLocalBool } from 'shared/lib/localPrefs'
import { publicUrl } from 'shared/lib/publicUrl'

function IOSShareIcon() {
  return (
    <svg width={23} viewBox='0 0 1000 1000' fill='#005FF2' aria-hidden>
      <path d='M780,290H640v35h140c19.3,0,35,15.7,35,35v560c0,19.3-15.7,35-35,35H220c-19.2,0-35-15.7-35-35V360c0-19.2,15.7-35,35-35h140v-35H220c-38.7,0-70,31.3-70,70v560c0,38.7,31.3,70,70,70h560c38.7,0,70-31.3,70-70V360C850,321.3,818.7,290,780,290z M372.5,180l110-110.2v552.7c0,9.6,7.9,17.5,17.5,17.5c9.6,0,17.5-7.9,17.5-17.5V69.8l110,110c3.5,3.5,7.9,5,12.5,5s9-1.7,12.5-5c6.8-6.8,6.8-17.9,0-24.7l-140-140c-6.8-6.8-17.9-6.8-24.7,0l-140,140c-6.8,6.8-6.8,17.9,0,24.7C354.5,186.8,365.5,186.8,372.5,180z' />
    </svg>
  )
}

export default function PWAInstallationGuide() {
  const closed = readLocalBool('pwaNotificationIsClosed')
  const [isOpen, setIsOpen] = useState(!closed)
  const [visible, setVisible] = useState(!closed)
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        bgcolor: 'grey.100',
        color: 'text.primary',
        px: 2,
        pt: 1.5,
        pb: 'calc(12px + env(safe-area-inset-bottom, 0px))',
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.3s ease',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '50px 1fr auto',
          gap: 1.5,
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Box component='img' src={publicUrl('icon.png')} width={50} height={50} alt='' sx={{ borderRadius: 1 }} />
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          {t('PWAGuide.Header')}
        </Typography>
        <IconButton
          size='small'
          aria-label={t('Close', { defaultValue: 'Close' })}
          onClick={() => {
            setVisible(false)
            window.setTimeout(() => {
              setIsOpen(false)
              localStorage.setItem('pwaNotificationIsClosed', 'true')
            }, 300)
          }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>

      <Typography variant='body2' sx={{ mb: 1 }}>
        {t('PWAGuide.Description')}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1 }}>
        {t('PWAGuide.PlayerButtons')}
      </Typography>
      <Typography variant='body2' sx={{ mb: 0.5, displayItems: 'center', gap: 0.5 }}>
        1. {t('PWAGuide.FirstStep')} <IOSShareIcon />
      </Typography>
      <Typography variant='body2'>
        2. {t('PWAGuide.SecondStep.Select')}{' '}
        <Box component='span' sx={{ fontWeight: 700, color: 'primary.main' }}>
          {t('PWAGuide.SecondStep.AddToHomeScreen')}
        </Box>
      </Typography>
    </Box>
  )
}

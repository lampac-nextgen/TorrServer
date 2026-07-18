import { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { echoHost } from 'shared/api/hosts'
import { publicUrl } from 'shared/lib/publicUrl'
import AppDialog from 'shared/ui/AppDialog'

export interface AboutDialogProps {
  open: boolean
  onClose: () => void
}

function AboutLink({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href} target='_blank' rel='noopener noreferrer' sx={{ display: 'block', py: 0.5 }}>
      {name}
    </Link>
  )
}

export default function AboutDialog({ open, onClose }: AboutDialogProps) {
  const { t } = useTranslation()
  const [version, setVersion] = useState('')

  useEffect(() => {
    if (!open) return
    axios.get(echoHost()).then(({ data }) => setVersion(String(data)))
  }, [open])

  return (
    <AppDialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{t('About')}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pt: 1 }}>
          <Box component='img' src={publicUrl('icon.png')} alt='TorrServer' sx={{ width: 72, height: 72 }} />
          <Typography variant='h6'>TorrServer {version}</Typography>
          <Typography color='text.secondary' sx={{ textAlign: 'center' }}>
            {t('ThanksToEveryone')}
          </Typography>
        </Box>

        <Typography variant='subtitle2' sx={{ mt: 3, mb: 1 }}>
          {t('Links')}
        </Typography>
        <AboutLink name={t('ProjectSource')} href='https://github.com/YouROK/TorrServer' />
        <AboutLink name={t('Releases')} href='https://github.com/YouROK/TorrServer/releases' />
        <AboutLink name={t('ApiDocs')} href='swagger/index.html' />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('Close', { defaultValue: 'Close' })}</Button>
      </DialogActions>
    </AppDialog>
  )
}

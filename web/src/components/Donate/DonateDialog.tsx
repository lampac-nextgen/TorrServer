import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { StyledDialog } from 'style/CustomMaterialUiStyles'
import { LAYOUT_MOBILE_MEDIA } from 'style/materialUISetup'
import useOnStandaloneAppOutsideClick from 'utils/useOnStandaloneAppOutsideClick'

interface DonateDialogProps {
  onClose: () => void
}

export default function DonateDialog({ onClose }: DonateDialogProps) {
  const { t } = useTranslation()
  const ref = useOnStandaloneAppOutsideClick(onClose)
  const fullScreen = useMediaQuery(LAYOUT_MOBILE_MEDIA)

  return (
    <StyledDialog
      open
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      fullScreen={fullScreen}
      fullWidth
      maxWidth='xs'
      ref={ref}
    >
      <DialogTitle id='form-dialog-title'>{t('Donate')}</DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} useFlexGap flexWrap='wrap'>
          <Button variant='outlined' color='secondary' onClick={() => window.open('https://boosty.to/yourok', '_blank')}>
            Boosty
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => window.open('https://yoomoney.ru/to/410013733697114', '_blank')}
          >
            IO.Money
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => window.open('https://www.tbank.ru/cf/742qEMhKhKn', '_blank')}
          >
            TBank
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Ok
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

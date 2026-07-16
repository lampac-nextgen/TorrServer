import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { StyledDialog } from 'style/CustomMaterialUiStyles'
import useOnStandaloneAppOutsideClick from 'utils/useOnStandaloneAppOutsideClick'

interface DonateDialogProps {
  onClose: () => void
}

export default function DonateDialog({ onClose }: DonateDialogProps) {
  const { t } = useTranslation()
  const ref = useOnStandaloneAppOutsideClick(onClose)

  return (
    <StyledDialog open onClose={onClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs' ref={ref}>
      <DialogTitle id='form-dialog-title'>{t('Donate')}</DialogTitle>
      <DialogContent>
        <ButtonGroup variant='outlined' color='secondary' aria-label='contained primary button group'>
          <Button onClick={() => window.open('https://boosty.to/yourok', '_blank')}>Boosty</Button>
          <Button onClick={() => window.open('https://yoomoney.ru/to/410013733697114', '_blank')}>IO.Money</Button>
          <Button onClick={() => window.open('https://www.tbank.ru/cf/742qEMhKhKn', '_blank')}>TBank</Button>
        </ButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Ok
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

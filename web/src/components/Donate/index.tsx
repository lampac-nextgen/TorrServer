import { useState, lazy, Suspense } from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { standaloneMedia } from 'style/standaloneMedia'

const DonateDialog = lazy(() => import('./DonateDialog'))

const StyledSnackbar = styled(Snackbar)`
  ${standaloneMedia(css`
    margin-bottom: calc(90px + env(safe-area-inset-bottom, 0px));
  `)};
`

export default function DonateSnackbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(true)

  const disableSnackbar = () => {
    setSnackbarOpen(false)
    localStorage.setItem('snackbarIsClosed', 'true')
  }

  return (
    <>
      {open && (
        <Suspense fallback={<CircularProgress size={24} />}>
          <DonateDialog onClose={() => setOpen(false)} />
        </Suspense>
      )}

      <StyledSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        onClose={disableSnackbar}
      >
        <Alert
          severity='info'
          variant='filled'
          onClose={disableSnackbar}
          action={
            <Button
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(true)
                disableSnackbar()
              }}
              startIcon={<CreditCardIcon fontSize='small' />}
            >
              {t('Support')}
            </Button>
          }
          icon={false}
        >
          {t('Donate?')}
        </Alert>
      </StyledSnackbar>
    </>
  )
}

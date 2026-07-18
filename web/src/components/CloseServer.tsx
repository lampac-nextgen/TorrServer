import { useState } from 'react'
import { Button, DialogActions, DialogTitle, ListItemIcon, ListItemText } from '@mui/material'
import { StyledDialog, StyledMenuButtonWrapper } from 'style/CustomMaterialUiStyles'
import { PowerSettingsNew as PowerSettingsNewIcon, PowerOff as PowerOffIcon } from '@mui/icons-material'
import { shutdownHost } from 'utils/Hosts'
import { useTranslation } from 'react-i18next'
import type { OfflineAwareProps } from 'types/api'

import UnsafeButton from './UnsafeButton'

export default function CloseServer({ isOffline, isLoading }: OfflineAwareProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const closeDialog = () => setOpen(false)
  const openDialog = () => setOpen(true)

  return (
    <>
      <StyledMenuButtonWrapper disabled={isOffline || isLoading} onClick={openDialog}>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary={t('CloseServer')} />
      </StyledMenuButtonWrapper>

      <StyledDialog open={open} onClose={closeDialog}>
        <DialogTitle>{t('CloseServer?')}</DialogTitle>
        <DialogActions>
          <Button variant='outlined' onClick={closeDialog} color='secondary'>
            {t('Cancel')}
          </Button>

          <UnsafeButton
            timeout={5}
            startIcon={<PowerOffIcon />}
            variant='contained'
            onClick={() => {
              fetch(shutdownHost())
              closeDialog()
            }}
            color='secondary'
            autoFocus
          >
            {t('TurnOff')}
          </UnsafeButton>
        </DialogActions>
      </StyledDialog>
    </>
  )
}

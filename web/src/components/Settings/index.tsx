import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { useTranslation } from 'react-i18next'
import { StyledMenuButtonWrapper } from 'style/CustomMaterialUiStyles'
import { isStandaloneApp } from 'utils/Utils'
import type { OfflineAwareProps } from 'types/api'

import SettingsDialog from './SettingsDialog'

export default function SettingsDialogButton({ isOffline, isLoading }: OfflineAwareProps) {
  const { t } = useTranslation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleClickOpen = () => setIsDialogOpen(true)
  const handleClose = () => setIsDialogOpen(false)

  return (
    <div>
      <StyledMenuButtonWrapper disabled={isOffline || isLoading} onClick={handleClickOpen}>
        {isStandaloneApp ? (
          <>
            <SettingsIcon />
            <div>{t('SettingsDialog.Settings')}</div>
          </>
        ) : (
          <>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>

            <ListItemText primary={t('SettingsDialog.Settings')} />
          </>
        )}
      </StyledMenuButtonWrapper>

      {isDialogOpen && <SettingsDialog handleClose={handleClose} />}
    </div>
  )
}

import { useState, lazy, Suspense } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'
import { StyledMenuButtonWrapper } from 'style/CustomMaterialUiStyles'
import { isStandaloneApp } from 'utils/Utils'
import type { OfflineAwareProps } from 'types/api'

import { StyledPWAAddButton } from './style'

const AddDialog = lazy(() => import('./AddDialog'))

export default function AddDialogButton({ isOffline, isLoading }: OfflineAwareProps) {
  const { t } = useTranslation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleClickOpen = () => setIsDialogOpen(true)
  const handleClose = () => setIsDialogOpen(false)

  return (
    <div>
      <StyledMenuButtonWrapper disabled={isOffline || isLoading} onClick={handleClickOpen}>
        {isStandaloneApp ? (
          <StyledPWAAddButton />
        ) : (
          <>
            <ListItemIcon>
              <LibraryAddIcon />
            </ListItemIcon>

            <ListItemText primary={t('AddFromLink')} />
          </>
        )}
      </StyledMenuButtonWrapper>

      {isDialogOpen && (
        <Suspense fallback={<CircularProgress size={24} sx={{ m: 2 }} />}>
          <AddDialog handleClose={handleClose} />
        </Suspense>
      )}
    </div>
  )
}

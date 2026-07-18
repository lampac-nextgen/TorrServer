import { useState, lazy, Suspense } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'
import { StyledMenuButtonWrapper } from 'style/CustomMaterialUiStyles'
import type { OfflineAwareProps } from 'types/api'

import { StyledPWAAddButton } from './style'

const AddDialog = lazy(() => import('./AddDialog'))

export default function AddDialogButton({ isOffline, isLoading }: OfflineAwareProps) {
  const { t } = useTranslation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleClickOpen = () => setIsDialogOpen(true)
  const handleClose = () => setIsDialogOpen(false)

  return (
    <>
      <StyledMenuButtonWrapper disabled={isOffline || isLoading} onClick={handleClickOpen}>
        <span className='ts-nav-tab-only'>
          <StyledPWAAddButton />
          <span className='ts-nav-tab-label'>{t('Add', { defaultValue: 'Add' })}</span>
        </span>
        <span className='ts-nav-list-only'>
          <ListItemIcon>
            <LibraryAddIcon />
          </ListItemIcon>
          <ListItemText primary={t('AddFromLink')} />
        </span>
      </StyledMenuButtonWrapper>

      {isDialogOpen && (
        <Suspense fallback={<CircularProgress size={24} sx={{ m: 2 }} />}>
          <AddDialog handleClose={handleClose} />
        </Suspense>
      )}
    </>
  )
}

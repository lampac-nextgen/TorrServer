import { useState, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import ListItemIcon from '@mui/material/ListItemIcon'
import SearchIcon from '@mui/icons-material/Search'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import CircularProgress from '@mui/material/CircularProgress'
import type { OfflineAwareProps } from 'types/api'

const SearchDialog = lazy(() => import('./SearchDialog'))

export default function SearchDialogButton({ isOffline, isLoading }: OfflineAwareProps) {
  const { t } = useTranslation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleClickOpen = () => setIsDialogOpen(true)
  const handleClose = () => setIsDialogOpen(false)

  return (
    <>
      <ListItemButton onClick={handleClickOpen} disabled={isOffline || isLoading}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary={t('Search')} />
      </ListItemButton>

      {isDialogOpen && (
        <Suspense fallback={<CircularProgress size={24} sx={{ m: 2 }} />}>
          <SearchDialog handleClose={handleClose} />
        </Suspense>
      )}
    </>
  )
}

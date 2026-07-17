import { useTheme } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import { useState, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

import IconWrapper from './style'

const AddDialog = lazy(() => import('../Add/AddDialog'))

export default function AddFirstTorrent() {
  const { t } = useTranslation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleClickOpen = () => setIsDialogOpen(true)
  const handleClose = () => setIsDialogOpen(false)
  const primary = useTheme().palette.primary.main

  return (
    <>
      <IconWrapper
        onClick={handleClickOpen}
        $isButton
        role='button'
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClickOpen()
          }
        }}
      >
        <CreateNewFolderOutlinedIcon className='empty-icon' sx={{ color: primary }} />
        <div className='icon-label'>{t('NoTorrentsAdded')}</div>
      </IconWrapper>

      {isDialogOpen && (
        <Suspense fallback={<CircularProgress size={24} />}>
          <AddDialog handleClose={handleClose} />
        </Suspense>
      )}
    </>
  )
}

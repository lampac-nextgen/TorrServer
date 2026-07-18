import { useTheme } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase'
import CircularProgress from '@mui/material/CircularProgress'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import { useState, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { resolveThemeColors } from 'shared/theme/color'

const AddDialog = lazy(() => import('../Add/AddDialog'))

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`

const EmptyTorrentCTA = styled(ButtonBase)`
  ${({ theme }) => {
    const {addDialog: { notificationSuccessBGColor, languageSwitchBGColor },} = resolveThemeColors(theme)
    return css`
    && {
      display: grid;
      place-items: center;
      gap: 12px;
      padding: 28px 40px;
      border-radius: var(--ts-radius-md);
      background: ${notificationSuccessBGColor};
      color: inherit;
      font: inherit;
      font-size: var(--ts-font-body);
      transition:
        background 0.2s ease,
        box-shadow 0.2s ease;

      &:hover,
      &.Mui-focusVisible {
        background: ${languageSwitchBGColor};
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

        .empty-icon {
          animation: ${float} 1.4s ease-in-out infinite;
        }
      }

      .empty-icon {
        font-size: 56px;
      }

      .icon-label {
        font-size: 14px;
        font-weight: 500;
        text-align: center;
      }
    }
  `
  }}
`

export default function AddFirstTorrent() {
  const { t } = useTranslation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleClickOpen = () => setIsDialogOpen(true)
  const handleClose = () => setIsDialogOpen(false)
  const primary = useTheme().palette.primary.main

  return (
    <>
      <EmptyTorrentCTA onClick={handleClickOpen} aria-label={t('NoTorrentsAdded')}>
        <CreateNewFolderOutlinedIcon className='empty-icon' sx={{ color: primary }} />
        <div className='icon-label'>{t('NoTorrentsAdded')}</div>
      </EmptyTorrentCTA>

      {isDialogOpen && (
        <Suspense fallback={<CircularProgress size={24} />}>
          <AddDialog handleClose={handleClose} />
        </Suspense>
      )}
    </>
  )
}

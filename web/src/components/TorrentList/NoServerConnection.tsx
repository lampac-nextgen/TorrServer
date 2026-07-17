import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import IconWrapper from './style'

export default function NoServerConnection() {
  const { t } = useTranslation()
  const primary = useTheme().palette.primary.main

  return (
    <IconWrapper>
      <CloudOffOutlinedIcon className='empty-icon' sx={{ color: primary }} />
      <div className='icon-label'>{t('Offline')}</div>
    </IconWrapper>
  )
}

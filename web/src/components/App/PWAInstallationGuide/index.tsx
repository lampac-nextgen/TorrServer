import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { readLocalBool } from 'utils/localPrefs'
import { publicUrl } from 'utils/publicUrl'

import IOSShareIcon from './IOSShareIcon'
import { StyledWrapper, StyledHeader, StyledContent } from './style'

export function PWAInstallationGuide() {
  const pwaNotificationIsClosed = readLocalBool('pwaNotificationIsClosed')
  const [isOpen, setIsOpen] = useState(!pwaNotificationIsClosed)
  const [shouldBeOpened, setShouldBeOpened] = useState(!pwaNotificationIsClosed)

  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <StyledWrapper $isOpen={shouldBeOpened}>
      <StyledHeader>
        <img src={publicUrl('icon.png')} width={50} alt='ts-icon' />

        {t('PWAGuide.Header')}

        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          onClick={() => {
            setShouldBeOpened(false)

            setTimeout(() => {
              setIsOpen(false)
              localStorage.setItem('pwaNotificationIsClosed', 'true')
            }, 300)
          }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </StyledHeader>

      <StyledContent>
        <p>{t('PWAGuide.Description')}</p>

        <p>{t('PWAGuide.PlayerButtons')}</p>

        <p>
          1. {t('PWAGuide.FirstStep')} <IOSShareIcon />
        </p>

        <p>
          2. {t('PWAGuide.SecondStep.Select')} <span>{t('PWAGuide.SecondStep.AddToHomeScreen')}</span>
        </p>
      </StyledContent>
    </StyledWrapper>
  )
}

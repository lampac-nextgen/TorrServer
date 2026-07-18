import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { registerSW } from 'virtual:pwa-register'

/** Prompts to reload when a new service-worker build is available (does not affect install banners). */
export default function PwaUpdateToast() {
  const { t } = useTranslation()
  const updateSWRef = useRef<((reloadPage?: boolean) => Promise<void>) | undefined>(undefined)

  useEffect(() => {
    updateSWRef.current = registerSW({
      immediate: true,
      onNeedRefresh() {
        toast(t('PwaUpdateAvailable', { defaultValue: 'Update available' }), {
          duration: Infinity,
          action: {
            label: t('Reload', { defaultValue: 'Reload' }),
            onClick: () => {
              void updateSWRef.current?.(true)
            },
          },
        })
      },
    })
  }, [t])

  return null
}

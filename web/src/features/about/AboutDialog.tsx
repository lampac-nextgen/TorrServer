import { Button, Link, Modal } from '@heroui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { echoHost } from 'shared/api/hosts'
import { publicUrl } from 'shared/lib/publicUrl'
import AppDialog from 'shared/ui/AppDialog'

export interface AboutDialogProps {
  open: boolean
  onClose: () => void
}

function AboutLink({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href} target='_blank' rel='noopener noreferrer' className='block rounded-md px-1 py-1.5 text-sm'>
      {name}
    </Link>
  )
}

/** Simple about/info dialog: app icon, live server version, and a credits/links band. */
export default function AboutDialog({ open, onClose }: AboutDialogProps) {
  const { t } = useTranslation()
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setVersion(null)
    axios
      .get(echoHost())
      .then(({ data }) => setVersion(String(data)))
      .catch(() => setVersion(''))
  }, [open])

  return (
    <AppDialog open={open} onClose={onClose} size='sm'>
      <Modal.Header>
        <Modal.Heading>{t('About')}</Modal.Heading>
        <Modal.CloseTrigger />
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-col items-center gap-3 pb-2 pt-1 text-center'>
          <img src={publicUrl('icon.png')} alt='TorrServer' className='size-[72px] rounded-2xl shadow-lg' />
          <h2 className='text-lg font-semibold text-foreground'>
            TorrServer{' '}
            {version === null ? (
              <span className='inline-block h-4 w-12 animate-pulse rounded bg-surface-secondary align-middle' />
            ) : (
              version
            )}
          </h2>
          <p className='text-muted'>{t('ThanksToEveryone')}</p>
        </div>

        <div className='mt-2 rounded-lg border border-border bg-surface-secondary p-3'>
          <p className='mb-1 px-1 text-xs font-semibold uppercase tracking-wide text-muted'>{t('Links')}</p>
          <AboutLink name={t('ProjectSource')} href='https://github.com/YouROK/TorrServer' />
          <AboutLink name={t('Releases')} href='https://github.com/YouROK/TorrServer/releases' />
          <AboutLink name={t('ApiDocs')} href={publicUrl('swagger/index.html')} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onPress={onClose} autoFocus>
          {t('Close')}
        </Button>
      </Modal.Footer>
    </AppDialog>
  )
}

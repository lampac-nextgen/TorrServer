import { Button, Link, Modal } from '@heroui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
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
    <Link href={href} target='_blank' rel='noopener noreferrer' className='block py-1'>
      {name}
    </Link>
  )
}

export default function AboutDialog({ open, onClose }: AboutDialogProps) {
  const { t } = useTranslation()
  const [version, setVersion] = useState('')

  useEffect(() => {
    if (!open) return
    axios.get(echoHost()).then(({ data }) => setVersion(String(data)))
  }, [open])

  return (
    <AppDialog open={open} onClose={onClose} size='sm'>
      <Modal.Header>
        <Modal.Heading>{t('About')}</Modal.Heading>
        <Modal.CloseTrigger />
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-col items-center gap-4 pt-1'>
          <img src={publicUrl('icon.png')} alt='TorrServer' className='size-[72px]' />
          <h2 className='text-lg font-semibold'>TorrServer {version}</h2>
          <p className='text-center text-default-500'>{t('ThanksToEveryone')}</p>
        </div>

        <p className='mb-2 mt-6 text-sm font-semibold'>{t('Links')}</p>
        <AboutLink name={t('ProjectSource')} href='https://github.com/YouROK/TorrServer' />
        <AboutLink name={t('Releases')} href='https://github.com/YouROK/TorrServer/releases' />
        <AboutLink name={t('ApiDocs')} href='swagger/index.html' />
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={onClose}>{t('Close', { defaultValue: 'Close' })}</Button>
      </Modal.Footer>
    </AppDialog>
  )
}

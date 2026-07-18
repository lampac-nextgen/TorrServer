import {
  Button,
  Description,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Spinner,
  TextArea,
  TextField,
} from '@heroui/react'
import { CloudUpload } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { addTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import {
  checkTorrentSource,
  getMoviePosters,
  parseSourceInfoHash,
  parseTorrentTitle,
  shortenTitleForPosterSearch,
} from 'shared/lib/torrentHelpers'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'
import { queryMax } from 'shared/theme/breakpoints'
import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import AppDialog from 'shared/ui/AppDialog'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { useOptionalAppToast } from 'shared/ui/Toast'
import MultiAddDialog from './MultiAddDialog'

export interface AddDialogProps {
  open: boolean
  onClose: () => void
  /** Pre-fill magnet/hash (PWA protocol / share_target). */
  initialSource?: string | null
}

export default function AddDialog({ open, onClose, initialSource }: AddDialogProps) {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const toast = useOptionalAppToast()
  const isMobile = useMediaQuery(queryMax('mobile'))

  const [source, setSource] = useState(initialSource || '')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [poster, setPoster] = useState('')
  const [posterOptions, setPosterOptions] = useState<string[]>([])
  const [postersLoading, setPostersLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [multiFiles, setMultiFiles] = useState<File[] | null>(null)
  const [hashExists, setHashExists] = useState(false)
  const posterRequestRef = useRef(0)
  const titleTouchedRef = useRef(false)

  const { data: torrents } = useTorrentsQuery()

  useSyncModalOpen(open && !multiFiles)

  useEffect(() => {
    if (open && initialSource) setSource(initialSource)
  }, [open, initialSource])

  const resetForm = () => {
    setSource('')
    setTitle('')
    setCategory('')
    setPoster('')
    setPosterOptions([])
    setHashExists(false)
    titleTouchedRef.current = false
  }

  useEffect(() => {
    const trimmed = source.trim()
    if (!open || !trimmed || !checkTorrentSource(trimmed)) {
      setHashExists(false)
      return undefined
    }

    let cancelled = false
    const timer = window.setTimeout(() => {
      void parseSourceInfoHash(trimmed).then(infoHash => {
        if (cancelled || !infoHash) {
          if (!cancelled) setHashExists(false)
          return
        }
        const exists = (torrents || []).some(t => t.hash?.toLowerCase() === infoHash.toLowerCase())
        setHashExists(exists)
      })
    }, 300)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [open, source, torrents])

  useEffect(() => {
    const trimmed = source.trim()
    if (!open || !trimmed || !checkTorrentSource(trimmed) || titleTouchedRef.current) return undefined

    let cancelled = false
    const timer = window.setTimeout(() => {
      parseTorrentTitle(trimmed, ({ parsedTitle }) => {
        if (cancelled || !parsedTitle || titleTouchedRef.current) return
        setTitle(parsedTitle)
      })
    }, 350)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [open, source])

  const handleFiles = useCallback((files: File[]) => {
    if (!files.length) return
    setMultiFiles(files)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFiles,
    accept: { 'application/x-bittorrent': ['.torrent'] },
    multiple: true,
    noClick: false,
    disabled: saving,
  })

  useEffect(() => {
    const query = shortenTitleForPosterSearch(title.trim()) || title.trim()
    if (!query || query.length < 2) {
      setPosterOptions([])
      return undefined
    }

    const requestId = ++posterRequestRef.current
    const timer = window.setTimeout(() => {
      setPostersLoading(true)
      const lang = i18n.language?.startsWith('ru') ? 'ru' : 'en'
      void getMoviePosters(query, lang)
        .then(urls => {
          if (requestId !== posterRequestRef.current) return
          setPosterOptions(urls || [])
          setPoster(prev => prev || urls?.[0] || '')
        })
        .finally(() => {
          if (requestId === posterRequestRef.current) setPostersLoading(false)
        })
    }, 450)

    return () => window.clearTimeout(timer)
  }, [title, i18n.language])

  const handleAdd = async () => {
    const trimmed = source.trim()
    if (!trimmed) return
    if (!checkTorrentSource(trimmed)) {
      toast?.showToast({
        message: t('AddDialog.WrongTorrentSource'),
        severity: 'error',
      })
      return
    }
    if (hashExists) {
      toast?.showToast({ message: t('AddDialog.HashExists'), severity: 'warning' })
      return
    }

    setSaving(true)
    try {
      await addTorrent({
        link: trimmed,
        title: title || undefined,
        category: category || undefined,
        poster: poster || '',
      })
      await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
      toast?.showToast({ message: t('TorrentAdded'), severity: 'success' })
      resetForm()
      onClose()
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const footerButtonClassName = isMobile ? 'min-h-11 px-4' : undefined

  if (multiFiles) {
    return (
      <MultiAddDialog
        files={multiFiles}
        open={open}
        onClose={() => {
          setMultiFiles(null)
          onClose()
        }}
      />
    )
  }

  return (
    <AppDialog open={open} onClose={onClose} size='sm'>
      <Modal.Header>
        <Modal.Heading>{t('AddNewTorrent')}</Modal.Heading>
        <Modal.CloseTrigger />
      </Modal.Header>
      <Modal.Body className='space-y-4'>
        <TextField value={source} onChange={setSource} isInvalid={hashExists} isDisabled={saving}>
          <Label>{t('AddDialog.TorrentSourceLink')}</Label>
          <TextArea rows={2} autoFocus />
          <Description>{hashExists ? t('AddDialog.HashExists') : t('AddDialog.TorrentSourceOptions')}</Description>
        </TextField>

        <TextField
          value={title}
          onChange={value => {
            titleTouchedRef.current = true
            setTitle(value)
          }}
          isDisabled={saving}
        >
          <Label>{t('AddDialog.TitleBlank')}</Label>
          <Input />
          <Description>{t('AddDialog.CustomTorrentTitleHelperText')}</Description>
        </TextField>

        <Select selectedKey={category || 'none'} onSelectionChange={key => setCategory(key === 'none' ? '' : String(key))} isDisabled={saving}>
          <Label>{t('AddDialog.CategoryHelperText')}</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id='none'>—</ListBox.Item>
              {TORRENT_CATEGORIES.map(cat => (
                <ListBox.Item key={cat.key} id={cat.key}>
                  {t(cat.name)}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {(postersLoading || posterOptions.length > 0 || poster) && (
          <div>
            <Description className='mb-2 block'>
              {t('AddDialog.AddPosterLinkInput')}
              {postersLoading ? '…' : ''}
            </Description>
            <div className='mb-2 flex gap-2 overflow-x-auto pb-1'>
              {posterOptions.map(url => (
                <button
                  key={url}
                  type='button'
                  onClick={() => setPoster(url)}
                  className={`h-24 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                    poster === url ? 'border-primary' : 'border-default-200'
                  }`}
                >
                  <img src={url} alt='' className='h-full w-full object-cover' />
                </button>
              ))}
            </div>
            <TextField value={poster} onChange={setPoster} isDisabled={saving}>
              <Label>{t('AddDialog.AddPosterLinkInput')}</Label>
              <Input />
            </TextField>
          </div>
        )}

        <div
          {...getRootProps()}
          className={`grid min-h-11 cursor-pointer place-items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-default-300'
          }`}
        >
          <input {...getInputProps()} />
          <CloudUpload className='size-6 text-default-500' aria-hidden />
          <Description>{t('AddDialog.AppendFile.ClickOrDrag')}</Description>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={onClose} isDisabled={saving} variant='secondary' className={footerButtonClassName}>
          {t('Cancel')}
        </Button>
        <Button
          variant='primary'
          onPress={() => void handleAdd()}
          isDisabled={saving || !source.trim() || hashExists}
          className={footerButtonClassName}
        >
          {saving ? <Spinner size='sm' color='current' /> : t('Add')}
        </Button>
      </Modal.Footer>
    </AppDialog>
  )
}

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
  useMediaQuery,
} from '@heroui/react'
import { Check, UploadCloud } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { addTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'
import {
  checkTorrentSource,
  getMoviePosters,
  parseSourceInfoHash,
  parseTorrentTitle,
  shortenTitleForPosterSearch,
} from 'shared/lib/torrentHelpers'
import { queryMax } from 'shared/theme/breakpoints'
import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import AppDialog from 'shared/ui/AppDialog'
import { DIALOG_SHEET_M } from 'shared/ui/dialogSizes'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { useOptionalAppToast } from 'shared/ui/Toast'

import MultiAddDialog from './MultiAddDialog'

export interface AddDialogProps {
  open: boolean
  onClose: () => void
  /** Pre-fill magnet/hash/link (PWA protocol handler / share target). */
  initialSource?: string | null
}

export default function AddDialog({ open, onClose, initialSource }: AddDialogProps) {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const toast = useOptionalAppToast()
  const isMobile = useMediaQuery(queryMax('mobile'))
  // Matches Details/VideoPlayer's fullscreen breakpoint so tablets don't get some dialogs fullscreen and others centered.
  const isFullScreenBreakpoint = useMediaQuery(queryMax('dialog'))

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

  // Debounced duplicate-hash check against the currently known torrent list.
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
        const exists = (torrents || []).some(item => item.hash?.toLowerCase() === infoHash.toLowerCase())
        setHashExists(exists)
      })
    }, 300)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [open, source, torrents])

  // Debounced title auto-fill from the parsed torrent/magnet name, unless the user edited it.
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

  // Debounced TMDB poster search driven by the (possibly auto-filled) title.
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
      toast?.showToast({ message: t('AddDialog.WrongTorrentSource'), severity: 'error' })
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
      toast?.showToast({ message: t('Search.TorrentAdded'), severity: 'success' })
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
    <AppDialog
      open={open}
      onClose={onClose}
      size='md'
      fullScreen={isFullScreenBreakpoint}
      dialogStyle={isMobile ? undefined : DIALOG_SHEET_M}
    >
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

        <div
          {...getRootProps()}
          className={`grid min-h-16 cursor-pointer place-items-center gap-1.5 rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
            isDragActive ? 'border-accent bg-accent-soft' : 'border-border hover:border-accent/50'
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className='size-5 text-muted' aria-hidden />
          <Description>{t('AddDialog.AppendFile.ClickOrDrag')}</Description>
        </div>

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

        <Select
          selectedKey={category || 'none'}
          onSelectionChange={key => setCategory(key === 'none' ? '' : String(key))}
          isDisabled={saving}
        >
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

        {postersLoading || posterOptions.length > 0 || poster ? (
          <div>
            <Description className='mb-2 block'>
              {t('AddDialog.AddPosterLinkInput')}
              {postersLoading ? '…' : ''}
            </Description>
            {posterOptions.length > 0 ? (
              <div className='mb-3 flex gap-2 overflow-x-auto pb-1'>
                {posterOptions.map(url => {
                  const selected = poster === url
                  return (
                    <button
                      key={url}
                      type='button'
                      onClick={() => setPoster(url)}
                      aria-pressed={selected}
                      className={`relative h-24 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                        selected ? 'border-accent' : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <img src={url} alt='' className='h-full w-full object-cover' />
                      {selected ? (
                        <span className='absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-accent text-accent-foreground'>
                          <Check className='size-3' aria-hidden />
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            ) : null}
            <TextField value={poster} onChange={setPoster} isDisabled={saving}>
              <Label>{t('AddDialog.AddPosterLinkInput')}</Label>
              <Input />
            </TextField>
          </div>
        ) : null}
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

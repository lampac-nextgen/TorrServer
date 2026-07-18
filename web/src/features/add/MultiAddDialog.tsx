import { Button, Input, Label, ListBox, Modal, Select, Spinner, TextField } from '@heroui/react'
import { Trash2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { MultiAddFileState } from 'shared/api/types'
import { TORRENTS_QUERY_KEY, uploadTorrent } from 'shared/api/torrents'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'
import {
  checkImageURL,
  getMoviePosters,
  parseTorrentInfoHash,
  parseTorrentTitle,
  shortenTitleForPosterSearch,
} from 'shared/lib/torrentHelpers'
import { queryMax } from 'shared/theme/breakpoints'
import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import AppDialog from 'shared/ui/AppDialog'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { useOptionalAppToast } from 'shared/ui/Toast'

export interface MultiAddDialogProps {
  files: File[]
  open: boolean
  onClose: () => void
}

function createInitialState(files: File[]): MultiAddFileState[] {
  return files.map(file => ({
    file,
    title: file.name.replace(/\.torrent$/i, ''),
    category: '',
    poster: '',
    isPosterOk: false,
    originalName: file.name,
    parsedTitle: '',
    infoHash: '',
    alreadyExists: false,
  }))
}

export default function MultiAddDialog({ files, open, onClose }: MultiAddDialogProps) {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const toast = useOptionalAppToast()
  const isMobile = useMediaQuery(queryMax('mobile'))
  useSyncModalOpen(open)

  const { data: existingTorrents = [] } = useTorrentsQuery()

  const [fileList, setFileList] = useState<MultiAddFileState[]>(() => createInitialState(files))
  const [saving, setSaving] = useState(false)
  const [enriching, setEnriching] = useState(true)

  const handleUpdate = useCallback((index: number, updates: Partial<MultiAddFileState>) => {
    setFileList(prev => prev.map((item, i) => (i === index ? { ...item, ...updates } : item)))
  }, [])

  useEffect(() => {
    let cancelled = false
    const posterLang = i18n.language?.startsWith('ru') ? 'ru' : 'en'

    const enrich = async () => {
      setEnriching(true)
      await Promise.all(
        files.map(async (file, index) => {
          const infoHash = await parseTorrentInfoHash(file)
          if (cancelled) return

          if (infoHash) {
            const existing = existingTorrents.find(tor => tor.hash?.toLowerCase() === infoHash.toLowerCase())
            if (existing) {
              handleUpdate(index, {
                infoHash,
                alreadyExists: true,
                title: existing.title || existing.name || file.name,
                category: String(existing.category || ''),
                poster: existing.poster || '',
                isPosterOk: Boolean(existing.poster),
              })
              return
            }
            handleUpdate(index, { infoHash })
          }

          await new Promise<void>(resolve => {
            parseTorrentTitle(file, ({ parsedTitle, originalName }) => {
              if (cancelled) {
                resolve()
                return
              }
              const searchTitle = shortenTitleForPosterSearch(parsedTitle || originalName || file.name)
              handleUpdate(index, {
                originalName: originalName || file.name,
                parsedTitle: parsedTitle || '',
                title: parsedTitle || originalName || file.name.replace(/\.torrent$/i, ''),
              })
              if (!searchTitle) {
                resolve()
                return
              }
              getMoviePosters(searchTitle, posterLang)
                .then(async urls => {
                  if (cancelled || !urls?.length) return
                  const ok = await checkImageURL(urls[0])
                  if (ok) handleUpdate(index, { poster: urls[0], isPosterOk: true })
                })
                .finally(() => resolve())
            })
          })
        }),
      )
      if (!cancelled) setEnriching(false)
    }

    void enrich()
    return () => {
      cancelled = true
    }
  }, [files, existingTorrents, handleUpdate, i18n.language])

  const visibleFiles = useMemo(() => fileList.filter(item => !item.alreadyExists), [fileList])
  const skippedCount = fileList.length - visibleFiles.length

  const handleRemove = useCallback(
    (index: number) => {
      setFileList(prev => {
        const next = prev.filter((_, i) => i !== index)
        if (next.filter(item => !item.alreadyExists).length === 0) onClose()
        return next
      })
    },
    [onClose],
  )

  const handleSaveAll = async () => {
    if (!visibleFiles.length) return
    setSaving(true)
    try {
      await Promise.all(
        visibleFiles.map(item =>
          uploadTorrent(item.file, {
            title: item.title,
            category: item.category,
            poster: item.poster,
          }),
        ),
      )
      await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
      toast?.showToast({
        message: t('TorrentAdded'),
        severity: 'success',
      })
      onClose()
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const footerButtonClassName = isMobile ? 'min-h-11 px-4' : undefined

  return (
    <AppDialog open={open} onClose={onClose} size='md'>
      <Modal.Header>
        <Modal.Heading>
          {t('AddNewTorrent', { defaultValue: 'Add torrent' })} ({visibleFiles.length}
          {skippedCount > 0 ? ` · ${skippedCount} ${t('AlreadyExists', { defaultValue: 'exist' })}` : ''})
        </Modal.Heading>
        <Modal.CloseTrigger />
      </Modal.Header>
      <Modal.Body>
        {enriching ? (
          <div className='grid place-items-center py-8'>
            <Spinner size='lg' />
          </div>
        ) : (
          <div className='space-y-4'>
            {fileList.map((item, index) => {
              if (item.alreadyExists) {
                return (
                  <p key={`${item.file.name}-exists-${index}`} className='text-sm text-default-500'>
                    {t('TorrentAlreadyInList', {
                      defaultValue: 'Already in list: {{name}}',
                      name: item.title || item.file.name,
                    })}
                  </p>
                )
              }
              return (
                <div
                  key={`${item.file.name}-${index}`}
                  className={`grid gap-3 border-b border-default-200 pb-4 ${
                    item.poster ? 'sm:grid-cols-[72px_1fr_auto]' : 'sm:grid-cols-[1fr_auto]'
                  }`}
                >
                  {item.poster ? (
                    <img
                      src={item.poster}
                      alt=''
                      className='hidden h-[108px] w-[72px] rounded-lg object-cover sm:block'
                    />
                  ) : null}
                  <div className='space-y-3'>
                    <p className='text-sm text-default-500'>
                      {index + 1}. {item.file.name}
                    </p>
                    <TextField value={item.title} onChange={value => handleUpdate(index, { title: value })}>
                      <Label>{t('AddDialog.TitleBlank', { defaultValue: 'Title' })}</Label>
                      <Input />
                    </TextField>
                    <TextField
                      value={item.poster}
                      onChange={value => handleUpdate(index, { poster: value, isPosterOk: Boolean(value) })}
                    >
                      <Label>{t('Poster', { defaultValue: 'Poster URL' })}</Label>
                      <Input />
                    </TextField>
                    <Select
                      selectedKey={item.category || 'none'}
                      onSelectionChange={key => handleUpdate(index, { category: key === 'none' ? '' : String(key) })}
                    >
                      <Label>{t('AddDialog.CategoryHelperText', { defaultValue: 'Category' })}</Label>
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
                  </div>
                  <Button
                    isIconOnly
                    variant='ghost'
                    aria-label={t('Delete', { defaultValue: 'Delete' })}
                    onPress={() => handleRemove(index)}
                    className='min-h-11 min-w-11'
                  >
                    <Trash2 className='size-4' />
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={onClose} isDisabled={saving} variant='secondary' className={footerButtonClassName}>
          {t('Cancel')}
        </Button>
        <Button
          variant='primary'
          onPress={() => void handleSaveAll()}
          isDisabled={saving || enriching || visibleFiles.length === 0}
          className={footerButtonClassName}
        >
          {saving ? (
            <Spinner size='sm' color='current' />
          ) : (
            `${t('Add', { defaultValue: 'Add' })} (${visibleFiles.length})`
          )}
        </Button>
      </Modal.Footer>
    </AppDialog>
  )
}

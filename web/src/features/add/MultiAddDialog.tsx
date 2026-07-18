import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { MultiAddFileState, TorrentStat } from 'shared/api/types'
import { torrentUploadHost } from 'shared/api/hosts'
import { getTorrents } from 'shared/api/torrents'
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

const touchTargetSx = { minHeight: 44, minWidth: 44 }

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

  const { data: existingTorrents = [] } = useQuery({
    queryKey: ['torrents'],
    queryFn: getTorrents,
    staleTime: 5000,
  })

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
            const existing = (existingTorrents as TorrentStat[]).find(
              tor => tor.hash?.toLowerCase() === infoHash.toLowerCase(),
            )
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
        visibleFiles.map(item => {
          const data = new FormData()
          data.append('save', 'true')
          data.append('file', item.file)
          if (item.title) data.append('title', item.title)
          if (item.category) data.append('category', item.category)
          if (item.poster) data.append('poster', item.poster)
          return axios.post(torrentUploadHost(), data)
        }),
      )
      await queryClient.invalidateQueries({ queryKey: ['torrents'] })
      toast?.showToast({
        message: t('TorrentAdded', { defaultValue: 'Torrent added' }),
        severity: 'success',
      })
      onClose()
    } catch {
      toast?.showToast({ message: t('Error', { defaultValue: 'Error' }), severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const footerButtonSx = isMobile ? { minHeight: 44, px: 2.5 } : undefined

  return (
    <AppDialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>
        {t('AddNewTorrent', { defaultValue: 'Add torrent' })} ({visibleFiles.length}
        {skippedCount > 0 ? ` · ${skippedCount} ${t('AlreadyExists', { defaultValue: 'exist' })}` : ''})
      </DialogTitle>
      <DialogContent>
        {enriching ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2} sx={{ pt: 1 }}>
            {fileList.map((item, index) => {
              if (item.alreadyExists) {
                return (
                  <Typography key={`${item.file.name}-exists-${index}`} variant='body2' color='text.secondary'>
                    {t('TorrentAlreadyInList', {
                      defaultValue: 'Already in list: {{name}}',
                      name: item.title || item.file.name,
                    })}
                  </Typography>
                )
              }
              return (
                <Box
                  key={`${item.file.name}-${index}`}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr auto', sm: item.poster ? '72px 1fr auto' : '1fr auto' },
                    gap: 1.5,
                    alignItems: 'start',
                    borderBottom: 1,
                    borderColor: 'divider',
                    pb: 2,
                  }}
                >
                  {item.poster ? (
                    <Box
                      component='img'
                      src={item.poster}
                      alt=''
                      sx={{
                        width: 72,
                        height: 108,
                        objectFit: 'cover',
                        borderRadius: 1,
                        display: { xs: 'none', sm: 'block' },
                      }}
                    />
                  ) : null}
                  <Stack spacing={1.5}>
                    <Typography variant='subtitle2' color='text.secondary'>
                      {index + 1}. {item.file.name}
                    </Typography>
                    <TextField
                      fullWidth
                      size='small'
                      label={t('AddDialog.TitleBlank', { defaultValue: 'Title' })}
                      value={item.title}
                      onChange={e => handleUpdate(index, { title: e.target.value })}
                    />
                    <TextField
                      fullWidth
                      size='small'
                      label={t('Poster', { defaultValue: 'Poster URL' })}
                      value={item.poster}
                      onChange={e =>
                        handleUpdate(index, { poster: e.target.value, isPosterOk: Boolean(e.target.value) })
                      }
                    />
                    <FormControl fullWidth size='small'>
                      <InputLabel>{t('AddDialog.CategoryHelperText', { defaultValue: 'Category' })}</InputLabel>
                      <Select
                        label={t('AddDialog.CategoryHelperText', { defaultValue: 'Category' })}
                        value={item.category}
                        onChange={e => handleUpdate(index, { category: e.target.value })}
                      >
                        <MenuItem value=''>
                          <em>—</em>
                        </MenuItem>
                        {TORRENT_CATEGORIES.map(cat => (
                          <MenuItem key={cat.key} value={cat.key}>
                            {t(cat.name)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <IconButton
                    aria-label={t('Delete', { defaultValue: 'Delete' })}
                    onClick={() => handleRemove(index)}
                    sx={touchTargetSx}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )
            })}
          </Stack>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={saving} sx={footerButtonSx}>
          {t('Cancel')}
        </Button>
        <Button
          variant='contained'
          onClick={() => void handleSaveAll()}
          disabled={saving || enriching || visibleFiles.length === 0}
          sx={footerButtonSx}
        >
          {saving ? (
            <CircularProgress size={20} color='inherit' />
          ) : (
            `${t('Add', { defaultValue: 'Add' })} (${visibleFiles.length})`
          )}
        </Button>
      </DialogActions>
    </AppDialog>
  )
}

import { useCallback, useState } from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { MultiAddFileState } from 'shared/api/types'
import { torrentUploadHost } from 'shared/api/hosts'
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
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const toast = useOptionalAppToast()
  const isMobile = useMediaQuery(queryMax('mobile'))

  useSyncModalOpen(open)

  const [fileList, setFileList] = useState<MultiAddFileState[]>(() => createInitialState(files))
  const [saving, setSaving] = useState(false)

  const handleUpdate = useCallback((index: number, updates: Partial<MultiAddFileState>) => {
    setFileList(prev => prev.map((item, i) => (i === index ? { ...item, ...updates } : item)))
  }, [])

  const handleRemove = useCallback(
    (index: number) => {
      setFileList(prev => {
        const next = prev.filter((_, i) => i !== index)
        if (next.length === 0) onClose()
        return next
      })
    },
    [onClose],
  )

  const handleSaveAll = async () => {
    if (!fileList.length) return
    setSaving(true)
    try {
      await Promise.all(
        fileList.map(item => {
          const data = new FormData()
          data.append('save', 'true')
          data.append('file', item.file)
          if (item.title) data.append('title', item.title)
          if (item.category) data.append('category', item.category)
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
        {t('AddNewTorrent', { defaultValue: 'Add torrent' })} ({fileList.length})
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {fileList.map((item, index) => (
            <Box
              key={`${item.file.name}-${index}`}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr auto', sm: '1fr auto' },
                gap: 1,
                alignItems: 'start',
                borderBottom: 1,
                borderColor: 'divider',
                pb: 2,
              }}
            >
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
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={saving} sx={footerButtonSx}>
          {t('Cancel')}
        </Button>
        <Button
          variant='contained'
          onClick={() => void handleSaveAll()}
          disabled={saving || fileList.length === 0}
          sx={footerButtonSx}
        >
          {saving ? (
            <CircularProgress size={20} color='inherit' />
          ) : (
            `${t('Add', { defaultValue: 'Add' })} (${fileList.length})`
          )}
        </Button>
      </DialogActions>
    </AppDialog>
  )
}

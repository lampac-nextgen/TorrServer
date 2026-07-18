import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { torrentsHost } from 'shared/api/hosts'
import { checkTorrentSource } from 'shared/lib/torrentHelpers'
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
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const toast = useOptionalAppToast()
  const isMobile = useMediaQuery(queryMax('mobile'))

  const [source, setSource] = useState(initialSource || '')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [saving, setSaving] = useState(false)
  const [multiFiles, setMultiFiles] = useState<File[] | null>(null)

  useSyncModalOpen(open && !multiFiles)

  useEffect(() => {
    if (open && initialSource) setSource(initialSource)
  }, [open, initialSource])

  const resetForm = () => {
    setSource('')
    setTitle('')
    setCategory('')
  }

  const handleFiles = useCallback((files: File[]) => {
    if (!files.length) return
    if (files.length === 1) {
      setMultiFiles(files)
      return
    }
    setMultiFiles(files)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFiles,
    accept: { 'application/x-bittorrent': ['.torrent'] },
    multiple: true,
    noClick: false,
    disabled: saving,
  })

  const handleAdd = async () => {
    const trimmed = source.trim()
    if (!trimmed) return
    if (!checkTorrentSource(trimmed)) {
      toast?.showToast({
        message: t('AddDialog.InvalidSource', { defaultValue: 'Invalid magnet, hash, or torrent link' }),
        severity: 'error',
      })
      return
    }

    setSaving(true)
    try {
      await axios.post(torrentsHost(), {
        action: 'add',
        link: trimmed,
        title: title || undefined,
        category: category || undefined,
        poster: '',
        save_to_db: true,
      })
      await queryClient.invalidateQueries({ queryKey: ['torrents'] })
      toast?.showToast({ message: t('TorrentAdded', { defaultValue: 'Torrent added' }), severity: 'success' })
      resetForm()
      onClose()
    } catch {
      toast?.showToast({ message: t('Error', { defaultValue: 'Error' }), severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const footerButtonSx = isMobile ? { minHeight: 44, px: 2.5 } : undefined

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
    <AppDialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{t('AddTorrent', { defaultValue: 'Add torrent' })}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={2}
            label={t('MagnetOrHash', { defaultValue: 'Magnet link or hash' })}
            value={source}
            onChange={e => setSource(e.target.value)}
            disabled={saving}
          />

          <TextField
            fullWidth
            label={t('AddDialog.TitleBlank', { defaultValue: 'Title (optional)' })}
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={saving}
          />

          <FormControl fullWidth disabled={saving}>
            <InputLabel>{t('AddDialog.CategoryHelperText', { defaultValue: 'Category' })}</InputLabel>
            <Select
              label={t('AddDialog.CategoryHelperText', { defaultValue: 'Category' })}
              value={category}
              onChange={e => setCategory(e.target.value)}
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

          <Box
            {...getRootProps()}
            sx={{
              border: 2,
              borderStyle: 'dashed',
              borderColor: isDragActive ? 'primary.main' : 'divider',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              minHeight: 44,
              display: 'grid',
              placeItems: 'center',
              gap: 1,
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon color='action' />
            <Typography variant='body2' color='text.secondary'>
              {t('AddDialog.AppendFile.ClickOrDrag', { defaultValue: 'Click or drag .torrent files here' })}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={saving} sx={footerButtonSx}>
          {t('Cancel')}
        </Button>
        <Button
          variant='contained'
          onClick={() => void handleAdd()}
          disabled={saving || !source.trim()}
          sx={footerButtonSx}
        >
          {saving ? <CircularProgress size={20} color='inherit' /> : t('Add', { defaultValue: 'Add' })}
        </Button>
      </DialogActions>
    </AppDialog>
  )
}

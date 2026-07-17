import { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react'
import Button from '@mui/material/Button'
import { torrentsHost } from 'utils/Hosts'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import debounce from 'lodash/debounce'
import useChangeLanguage from 'utils/useChangeLanguage'
import { useMediaQuery } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import usePreviousState from 'utils/usePreviousState'
import { useQuery } from '@tanstack/react-query'
import { getTorrents } from 'utils/Utils'
import parseTorrent from 'parse-torrent'
import ptt from 'parse-torrent-title'
import { DialogFooter } from 'style/DialogStyles'
import { StyledDialog, StyledHeader, dialogPaperSx } from 'style/CustomMaterialUiStyles'
import { LAYOUT_DIALOG_FULLSCREEN_MEDIA } from 'style/materialUISetup'
import useOnStandaloneAppOutsideClick from 'utils/useOnStandaloneAppOutsideClick'
import { buttonLoadingIcon } from 'utils/buttonLoading'

import {
  checkImageURL,
  getMoviePosters,
  checkTorrentSource,
  parseTorrentTitle,
  shortenTitleForPosterSearch,
} from './helpers'
import { Content } from './style'
import RightSideComponent from './RightSideComponent'
import LeftSideComponent from './LeftSideComponent'

const MultiAddDialog = lazy(() => import('./MultiAddDialog'))

export interface AddDialogProps {
  handleClose: () => void
  hash?: string | null
  title?: string
  name?: string
  poster?: string
  category?: string
}

export default function AddDialog({
  handleClose,
  hash: originalHash,
  title: originalTitle,
  name: originalName,
  poster: originalPoster,
  category: originalCategory,
}: AddDialogProps) {
  const { t } = useTranslation()
  const isEditMode = !!originalHash
  const [torrentSource, setTorrentSource] = useState(originalHash || '')
  const [title, setTitle] = useState(originalTitle || '')
  const [category, setCategory] = useState(originalCategory || '')
  const [originalTorrentTitle, setOriginalTorrentTitle] = useState('')
  const [parsedTitle, setParsedTitle] = useState('')
  const [posterUrl, setPosterUrl] = useState(originalPoster || '')
  const [isPosterUrlCorrect, setIsPosterUrlCorrect] = useState(false)
  const [isTorrentSourceCorrect, setIsTorrentSourceCorrect] = useState(false)
  const [isHashAlreadyExists, setIsHashAlreadyExists] = useState(false)
  const [posterList, setPosterList] = useState<string[] | undefined>()
  const [isUserInteractedWithPoster, setIsUserInteractedWithPoster] = useState(isEditMode)
  const [currentLang] = useChangeLanguage()
  const [posterSearchLanguage, setPosterSearchLanguage] = useState(currentLang === 'ru' ? 'ru' : 'en')
  const [isSaving, setIsSaving] = useState(false)
  const [skipDebounce, setSkipDebounce] = useState(false)
  const [isCustomTitleEnabled, setIsCustomTitleEnabled] = useState(false)
  const [currentSourceHash, setCurrentSourceHash] = useState<string | undefined>()
  const editModePosterSearchedRef = useRef(false)

  // When files are dropped/selected, switch to MultiAddDialog
  const [multiFiles, setMultiFiles] = useState<File[] | null>(null)

  const ref = useOnStandaloneAppOutsideClick(handleClose)

  const { data: torrents } = useQuery({
    queryKey: ['torrents'],
    queryFn: getTorrents,
    retry: 1,
    // Share App list cache; avoid a second 1s poll while the dialog is open.
    staleTime: 1000,
  })

  useEffect(() => {
    parseTorrent.remote(torrentSource, (_, parsed) => setCurrentSourceHash(parsed?.infoHash))
  }, [torrentSource])

  useEffect(() => {
    if (!currentSourceHash || !torrents) return

    const allHashes = torrents.map(({ hash }) => hash)
    setIsHashAlreadyExists(allHashes.includes(currentSourceHash))
  }, [currentSourceHash, torrents])

  useEffect(() => {
    if (!isSaving || !torrents) return

    const allHashes = torrents.map(({ hash }) => hash)
    allHashes.includes(currentSourceHash || '') && handleClose()
    const linkRegex = /^(http(s?)):\/\/.*/i
    torrentSource.match(linkRegex) !== null && handleClose()
  }, [isSaving, torrents, torrentSource, currentSourceHash, handleClose])

  const fullScreen = useMediaQuery(LAYOUT_DIALOG_FULLSCREEN_MEDIA)

  const updateTitleFromSource = useCallback(() => {
    parseTorrentTitle(torrentSource, ({ parsedTitle: nextParsedTitle, originalName: nextOriginalName }) => {
      if (!nextOriginalName) return

      setSkipDebounce(true)
      setTitle('')
      setIsCustomTitleEnabled(false)
      setOriginalTorrentTitle(nextOriginalName)
      setParsedTitle(nextParsedTitle || '')
    })
  }, [torrentSource])

  const removePoster = useCallback(() => {
    setIsPosterUrlCorrect(false)
    setPosterUrl('')
  }, [])

  useEffect(() => {
    if (!torrentSource) {
      setTitle('')
      setOriginalTorrentTitle('')
      setParsedTitle('')
      setIsCustomTitleEnabled(false)
      setPosterList(undefined)
      removePoster()
      setIsUserInteractedWithPoster(false)
    }
  }, [torrentSource, removePoster])

  // Edit mode: init original/parsed title from name so poster can be searched
  useEffect(() => {
    if (!originalHash || (!originalName && !originalTitle)) return
    const source = originalName || originalTitle || ''
    setOriginalTorrentTitle(source)
    try {
      const parsed = ptt.parse(source)
      setParsedTitle(parsed?.title || '')
    } catch {
      setParsedTitle('')
    }
    editModePosterSearchedRef.current = false
  }, [originalHash, originalName, originalTitle])

  useEffect(() => {
    if (originalHash) {
      checkImageURL(posterUrl).then(correctImage => {
        correctImage ? setIsPosterUrlCorrect(true) : removePoster()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const posterSearch = useMemo(
    () =>
      (movieName: string, language: string, { shouldRefreshMainPoster = false } = {}) => {
        if (!movieName) {
          setPosterList(undefined)
          removePoster()
          return
        }
        const query = shortenTitleForPosterSearch(String(movieName).trim())

        getMoviePosters(query || movieName, language).then(urlList => {
          if (urlList) {
            setPosterList(urlList)
            if (!shouldRefreshMainPoster && isUserInteractedWithPoster) return

            const [firstPoster] = urlList
            checkImageURL(firstPoster).then(correctImage => {
              if (correctImage) {
                setIsPosterUrlCorrect(true)
                setPosterUrl(firstPoster)
              } else removePoster()
            })
          } else {
            setPosterList(undefined)
            if (isUserInteractedWithPoster) return

            removePoster()
          }
        })
      },
    [isUserInteractedWithPoster, removePoster],
  )

  const delayedPosterSearch = useMemo(() => debounce(posterSearch, 700), [posterSearch])

  const prevTorrentSourceState = usePreviousState(torrentSource)

  useEffect(() => {
    const isCorrectSource = checkTorrentSource(torrentSource)
    if (!isCorrectSource) {
      setIsTorrentSourceCorrect(false)
      return
    }

    setIsTorrentSourceCorrect(true)

    const torrentSourceChanged = torrentSource !== prevTorrentSourceState
    if (!torrentSourceChanged) return

    updateTitleFromSource()
  }, [prevTorrentSourceState, torrentSource, updateTitleFromSource])

  // Edit mode: auto-search poster once when we have title and no poster
  useEffect(() => {
    if (
      !originalHash ||
      editModePosterSearchedRef.current ||
      originalPoster ||
      !(parsedTitle || originalTitle || title)
    ) {
      return
    }
    const searchTitle = parsedTitle || title || originalTitle || ''
    if (!shortenTitleForPosterSearch(searchTitle)) return
    editModePosterSearchedRef.current = true
    posterSearch(searchTitle, posterSearchLanguage, { shouldRefreshMainPoster: true })
  }, [originalHash, originalPoster, parsedTitle, originalTitle, title, posterSearchLanguage, posterSearch])

  const prevTitleState = usePreviousState(title)

  useEffect(() => {
    const titleChanged = title !== prevTitleState
    if (!titleChanged && !parsedTitle) return

    if (skipDebounce) {
      posterSearch(title || parsedTitle, posterSearchLanguage)
      setSkipDebounce(false)
    } else if (!title) {
      delayedPosterSearch.cancel()

      if (parsedTitle) {
        posterSearch(parsedTitle, posterSearchLanguage)
      } else {
        !isUserInteractedWithPoster && removePoster()
      }
    } else {
      delayedPosterSearch(title, posterSearchLanguage)
    }
  }, [
    title,
    parsedTitle,
    prevTitleState,
    delayedPosterSearch,
    posterSearch,
    posterSearchLanguage,
    skipDebounce,
    isUserInteractedWithPoster,
    removePoster,
  ])

  const handleSetSelectedFile = useCallback((fileOrFiles: File | File[] | null) => {
    if (!fileOrFiles) return
    const nextFiles = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]
    setMultiFiles(nextFiles)
  }, [])

  const handleSave = () => {
    setIsSaving(true)

    if (isEditMode) {
      axios
        .post(torrentsHost(), {
          action: 'set',
          hash: originalHash,
          title: title || originalName,
          poster: posterUrl,
          category,
        })
        .finally(handleClose)
    } else {
      // link save
      axios
        .post(torrentsHost(), {
          action: 'add',
          link: torrentSource,
          title,
          category,
          poster: posterUrl,
          save_to_db: true,
        })
        .catch(handleClose)
    }
  }

  if (multiFiles) {
    return (
      <Suspense fallback={<CircularProgress />}>
        <MultiAddDialog files={multiFiles} handleClose={handleClose} />
      </Suspense>
    )
  }

  return (
    <StyledDialog
      open
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth='md'
      slotProps={{ paper: { ref, sx: dialogPaperSx } }}
    >
      <StyledHeader>{t(isEditMode ? 'EditTorrent' : 'AddNewTorrent')}</StyledHeader>

      <Content $isEditMode={isEditMode}>
        {!isEditMode && (
          <LeftSideComponent
            setIsUserInteractedWithPoster={setIsUserInteractedWithPoster}
            setSelectedFile={handleSetSelectedFile}
            torrentSource={torrentSource}
            setTorrentSource={setTorrentSource}
          />
        )}
        <RightSideComponent
          originalTorrentTitle={originalTorrentTitle}
          setTitle={setTitle}
          setCategory={setCategory}
          setPosterUrl={setPosterUrl}
          setIsPosterUrlCorrect={setIsPosterUrlCorrect}
          setIsUserInteractedWithPoster={setIsUserInteractedWithPoster}
          setPosterList={setPosterList}
          isTorrentSourceCorrect={isTorrentSourceCorrect}
          isHashAlreadyExists={isHashAlreadyExists}
          title={title}
          category={category}
          parsedTitle={parsedTitle}
          posterUrl={posterUrl}
          isPosterUrlCorrect={isPosterUrlCorrect}
          posterList={posterList}
          currentLang={currentLang}
          posterSearchLanguage={posterSearchLanguage}
          setPosterSearchLanguage={setPosterSearchLanguage}
          posterSearch={posterSearch}
          removePoster={removePoster}
          updateTitleFromSource={updateTitleFromSource}
          torrentSource={torrentSource}
          isCustomTitleEnabled={isCustomTitleEnabled}
          setIsCustomTitleEnabled={setIsCustomTitleEnabled}
          isEditMode={isEditMode}
        />
      </Content>

      <DialogFooter>
        <Button onClick={handleClose} color='secondary' variant='outlined'>
          {t('Cancel')}
        </Button>

        <Button
          variant='contained'
          disabled={!torrentSource || (isHashAlreadyExists && !isEditMode) || !isTorrentSourceCorrect || isSaving}
          onClick={handleSave}
          color='secondary'
          startIcon={buttonLoadingIcon(isSaving)}
        >
          {t(isEditMode ? 'Save' : 'Add')}
        </Button>
      </DialogFooter>
    </StyledDialog>
  )
}

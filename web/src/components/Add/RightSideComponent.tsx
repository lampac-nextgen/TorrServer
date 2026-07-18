import { useTranslation } from 'react-i18next'
import { alphaCss } from 'shared/theme/color'
import { NoImageIcon } from 'icons'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  useTheme,
  type SelectChangeEvent,
} from '@mui/material'
import { HighlightOff as HighlightOffIcon } from '@mui/icons-material'
import { TORRENT_CATEGORIES } from 'components/categories'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import {
  ClearPosterButton,
  UpdatePosterButton,
  PosterLanguageSwitch,
  RightSide,
  Poster,
  PosterSuggestions,
  PosterSuggestionsItem,
  PosterWrapper,
  RightSideContainer,
} from './style'
import { checkImageURL } from './helpers'

export interface RightSideComponentProps {
  setTitle: Dispatch<SetStateAction<string>>
  setCategory: Dispatch<SetStateAction<string>>
  setPosterUrl: Dispatch<SetStateAction<string>>
  setIsPosterUrlCorrect: Dispatch<SetStateAction<boolean>>
  setIsUserInteractedWithPoster: Dispatch<SetStateAction<boolean>>
  setPosterList: Dispatch<SetStateAction<string[] | undefined>>
  isTorrentSourceCorrect: boolean
  isHashAlreadyExists: boolean
  title: string
  category: string
  parsedTitle: string
  posterUrl: string
  isPosterUrlCorrect: boolean
  posterList?: string[]
  currentLang: string
  posterSearchLanguage: string
  setPosterSearchLanguage: Dispatch<SetStateAction<string>>
  posterSearch: (
    searchTitle: string,
    language: string,
    opts?: { shouldRefreshMainPoster?: boolean },
  ) => void | Promise<void>
  removePoster: () => void
  torrentSource: string
  originalTorrentTitle: string
  updateTitleFromSource: () => void
  isCustomTitleEnabled: boolean
  setIsCustomTitleEnabled: Dispatch<SetStateAction<boolean>>
  isEditMode: boolean
}

export default function RightSideComponent({
  setTitle,
  setCategory,
  setPosterUrl,
  setIsPosterUrlCorrect,
  setIsUserInteractedWithPoster,
  setPosterList,
  isTorrentSourceCorrect,
  isHashAlreadyExists,
  title,
  category,
  parsedTitle,
  posterUrl,
  isPosterUrlCorrect,
  posterList,
  currentLang,
  posterSearchLanguage,
  setPosterSearchLanguage,
  posterSearch,
  removePoster,
  torrentSource,
  originalTorrentTitle,
  updateTitleFromSource,
  isCustomTitleEnabled,
  setIsCustomTitleEnabled,
  isEditMode,
}: RightSideComponentProps) {
  const { t } = useTranslation()
  const primary = useTheme().palette.primary.main

  const handleTitleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setTitle(value)
  const handleCategoryChange = ({ target: { value } }: SelectChangeEvent) => setCategory(value)
  const handlePosterUrlChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPosterUrl(value)
    checkImageURL(value).then(setIsPosterUrlCorrect)
    setIsUserInteractedWithPoster(!!value)
    setPosterList(undefined)
  }
  const userChangesPosterUrl = (url: string) => {
    setPosterUrl(url)
    checkImageURL(url).then(setIsPosterUrlCorrect)
    setIsUserInteractedWithPoster(true)
  }
  const catIndex = TORRENT_CATEGORIES.findIndex(e => e.key === category)

  return (
    <RightSide>
      <RightSideContainer $isHidden={!isTorrentSourceCorrect || (isHashAlreadyExists && !isEditMode)}>
        {originalTorrentTitle ? (
          <>
            <TextField
              value={originalTorrentTitle}
              margin='dense'
              label={t('AddDialog.OriginalTorrentTitle')}
              style={{ marginTop: '1em' }}
              type='text'
              variant='outlined'
              fullWidth
              disabled={isCustomTitleEnabled}
              slotProps={{ input: { readOnly: true } }}
            />
            <TextField
              onChange={handleTitleChange}
              onFocus={() => setIsCustomTitleEnabled(true)}
              onBlur={({ target: { value } }) => !value && setIsCustomTitleEnabled(false)}
              value={title}
              margin='dense'
              label={t('AddDialog.CustomTorrentTitle')}
              type='text'
              variant='outlined'
              fullWidth
              helperText={t('AddDialog.CustomTorrentTitleHelperText')}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        style={{ padding: '1px', marginRight: '-6px' }}
                        onClick={() => {
                          setTitle('')
                          setIsCustomTitleEnabled(!isCustomTitleEnabled)
                          updateTitleFromSource()
                          setIsUserInteractedWithPoster(false)
                        }}
                      >
                      <HighlightOffIcon style={{ color: isCustomTitleEnabled ? primary : alphaCss('#ccc', 0.25) }} />
                    </IconButton>
                  </InputAdornment>
                ),
                },
              }}
            />
          </>
        ) : (
          <TextField
            onChange={handleTitleChange}
            value={title}
            margin='dense'
            label={t('AddDialog.TitleBlank')}
            style={{ marginTop: '1em' }}
            type='text'
            variant='outlined'
            fullWidth
            helperText={t('AddDialog.TitleBlankHelperText')}
          />
        )}
        <TextField
          onChange={handlePosterUrlChange}
          value={posterUrl}
          margin='dense'
          label={t('AddDialog.AddPosterLinkInput')}
          type='url'
          variant='outlined'
          fullWidth
        />
        <FormControl fullWidth>
          <FormHelperText style={{ padding: '0.2em 1.2em 0.5em 1.2em' }}>
            {t('AddDialog.CategoryHelperText')}
          </FormHelperText>
          <Select
            labelId='torrent-category-select-label'
            id='torrent-category-select'
            value={category}
            margin='dense'
            onChange={handleCategoryChange}
            variant='outlined'
            fullWidth
            defaultValue=''
            IconComponent={
              category.length > 1
                ? () => (
                    <IconButton
                      size='small'
                      style={{ padding: '1px', marginLeft: '6px', marginRight: '8px' }}
                      onClick={() => {
                        setCategory('')
                      }}
                    >
                      <HighlightOffIcon style={{ color: primary }} />
                    </IconButton>
                  )
                : undefined
            }
          >
            {category.length > 1 && catIndex < 0 ? (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ) : (
              ''
            )}

            {TORRENT_CATEGORIES.map(cat => (
              <MenuItem key={cat.key} value={cat.key}>
                {t(cat.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <PosterWrapper>
          <Poster $poster={isPosterUrlCorrect}>
            {isPosterUrlCorrect ? <img src={posterUrl} alt='poster' /> : <NoImageIcon />}
          </Poster>

          <PosterSuggestions>
            {posterList
              ?.filter(url => url !== posterUrl)
              .slice(0, 12)
              .map(url => (
                <PosterSuggestionsItem onClick={() => userChangesPosterUrl(url)} key={url}>
                  <img src={url} alt='poster' />
                </PosterSuggestionsItem>
              ))}
          </PosterSuggestions>

          {currentLang !== 'en' && (
            <PosterLanguageSwitch $showbutton={isPosterUrlCorrect}>
              <ToggleButton
                value={posterSearchLanguage}
                selected
                size='small'
                color='secondary'
                onClick={() => {
                  const newLanguage = posterSearchLanguage === 'en' ? 'ru' : 'en'
                  setPosterSearchLanguage(newLanguage)
                  posterSearch(isCustomTitleEnabled ? title : originalTorrentTitle ? parsedTitle : title, newLanguage, {
                    shouldRefreshMainPoster: true,
                  })
                }}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: 'none',
                  fontWeight: 600,
                }}
              >
                {posterSearchLanguage === 'en' ? 'EN' : 'RU'}
              </ToggleButton>
            </PosterLanguageSwitch>
          )}

          <ClearPosterButton
            $showbutton={isPosterUrlCorrect}
            onClick={() => {
              removePoster()
              setIsUserInteractedWithPoster(true)
            }}
            color='primary'
            variant='contained'
            size='small'
          >
            {t('Clear')}
          </ClearPosterButton>

          <UpdatePosterButton
            onClick={() => {
              const fixedTitle = isCustomTitleEnabled ? title : originalTorrentTitle ? parsedTitle : title
              posterSearch(fixedTitle, posterSearchLanguage)
            }}
            color='primary'
            variant='contained'
            size='small'
          >
            {t('Update')}
          </UpdatePosterButton>
        </PosterWrapper>
      </RightSideContainer>

      <RightSideContainer
        $isError={!!torrentSource && (!isTorrentSourceCorrect || isHashAlreadyExists)}
        $notificationMessage={
          !torrentSource
            ? t('AddDialog.AddTorrentSourceNotification')
            : !isTorrentSourceCorrect
              ? t('AddDialog.WrongTorrentSource')
              : isHashAlreadyExists
                ? t('AddDialog.HashExists')
                : undefined
        }
        $isHidden={isEditMode || (isTorrentSourceCorrect && !isHashAlreadyExists)}
      />
    </RightSide>
  )
}

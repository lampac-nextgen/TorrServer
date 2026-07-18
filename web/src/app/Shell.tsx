import { lazy, Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  Brightness4 as Brightness4Icon,
  Brightness5 as Brightness5Icon,
  BrightnessAuto as BrightnessAutoIcon,
  Sort as SortIcon,
  SortByAlpha as SortByAlphaIcon,
} from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { echoHost } from 'shared/api/hosts'
import { getTorrents } from 'shared/api/torrents'
import useChangeLanguage from 'shared/lib/useChangeLanguage'
import useLaunchHandler from 'shared/lib/useLaunchHandler'
import { queryMax } from 'shared/theme/breakpoints'
import { THEME_MODES, useThemePreference } from 'shared/theme/useThemePreference'
import { TorrentsPage } from 'features/torrents'

import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

const AddDialog = lazy(() => import('features/add/AddDialog'))
const MultiAddDialog = lazy(() => import('features/add/MultiAddDialog'))
const SearchDialog = lazy(() => import('features/search/SearchDialog'))
const SettingsDialog = lazy(() => import('features/settings/SettingsDialog'))
const AboutDialog = lazy(() => import('features/about/AboutDialog'))
const CloseServerDialog = lazy(() => import('features/system/CloseServerDialog'))
const RemoveAllDialog = lazy(() => import('features/system/RemoveAllDialog'))
const CategoriesDrawer = lazy(() => import('features/categories/CategoriesDrawer'))

const LANG_CYCLE = ['en', 'ru', 'ua', 'zh', 'bg', 'fr', 'ro'] as const

const SIDEBAR_WIDTH = 260

export default function Shell() {
  const { t } = useTranslation()
  const isMobile = useMediaQuery(queryMax('mobile'))

  const [, currentThemeMode, updateThemeMode] = useThemePreference()
  const [currentLang, changeLang] = useChangeLanguage()
  const { launchSource, setLaunchSource, launchFiles, setLaunchFiles } = useLaunchHandler()

  const [torrServerVersion, setTorrServerVersion] = useState('')
  const [sortABC, setSortABC] = useState(false)
  const [globalCategoryFilter, setGlobalCategoryFilter] = useState('all')
  const [listPollMs, setListPollMs] = useState(1000)

  const [addOpen, setAddOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [closeServerOpen, setCloseServerOpen] = useState(false)
  const [removeAllOpen, setRemoveAllOpen] = useState(false)

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ['torrents'],
    queryFn: getTorrents,
    retry: 1,
    refetchInterval: listPollMs,
  })

  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    if (isError) setIsOffline(true)
    if (isSuccess) setIsOffline(false)
  }, [isError, isSuccess])

  useEffect(() => {
    const syncPoll = () => setListPollMs(document.hidden ? 5000 : 1000)
    syncPoll()
    document.addEventListener('visibilitychange', syncPoll)
    return () => document.removeEventListener('visibilitychange', syncPoll)
  }, [])

  useEffect(() => {
    axios.get(echoHost()).then(({ data }) => setTorrServerVersion(String(data)))
  }, [])

  useEffect(() => {
    if (launchSource || launchFiles) setAddOpen(true)
  }, [launchSource, launchFiles])

  const cycleLanguage = () => {
    const idx = LANG_CYCLE.indexOf(currentLang as (typeof LANG_CYCLE)[number])
    const next = LANG_CYCLE[(idx + 1) % LANG_CYCLE.length]
    changeLang(next)
  }

  const cycleTheme = () => {
    if (currentThemeMode === THEME_MODES.LIGHT) updateThemeMode(THEME_MODES.DARK)
    else if (currentThemeMode === THEME_MODES.DARK) updateThemeMode(THEME_MODES.AUTO)
    else updateThemeMode(THEME_MODES.LIGHT)
  }

  const closeAdd = () => {
    setAddOpen(false)
    setLaunchSource(null)
  }

  const navProps = {
    isOffline,
    isLoading,
    onAdd: () => setAddOpen(true),
    onSearch: () => setSearchOpen(true),
    onCategories: () => setCategoriesOpen(true),
    onSettings: () => setSettingsOpen(true),
    onAbout: () => setAboutOpen(true),
    onCloseServer: () => setCloseServerOpen(true),
    onRemoveAll: () => setRemoveAllOpen(true),
  }

  return (
    <Box
      sx={{
        display: 'grid',
        height: '100%',
        overflow: 'hidden',
        gridTemplateRows: isMobile
          ? 'calc(60px + env(safe-area-inset-top, 0px)) 1fr'
          : 'calc(60px + env(safe-area-inset-top, 0px)) 1fr',
        gridTemplateColumns: isMobile ? '1fr' : `${SIDEBAR_WIDTH}px 1fr`,
        gridTemplateAreas: isMobile ? '"header" "content"' : '"header header" "sidebar content"',
      }}
    >
      <AppBar
        position='static'
        color='primary'
        sx={{
          gridArea: 'header',
          pt: 'env(safe-area-inset-top, 0px)',
          minHeight: 'calc(60px + env(safe-area-inset-top, 0px))',
        }}
      >
        <Toolbar sx={{ minHeight: 60, gap: 1 }}>
          <Typography variant='h6' noWrap sx={{ flex: 1, minWidth: 0 }}>
            TorrServer {torrServerVersion}
          </Typography>

          <Tooltip
            title={
              sortABC
                ? t('SortByDate', { defaultValue: 'Sort by date' })
                : t('SortByName', { defaultValue: 'Sort by name' })
            }
          >
            <IconButton
              color='inherit'
              aria-label={
                sortABC
                  ? t('SortByDate', { defaultValue: 'Sort by date' })
                  : t('SortByName', { defaultValue: 'Sort by name' })
              }
              onClick={() => setSortABC(v => !v)}
            >
              {sortABC ? <SortByAlphaIcon /> : <SortIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={t('Theme', { defaultValue: 'Theme' })}>
            <IconButton color='inherit' aria-label={t('Theme', { defaultValue: 'Theme' })} onClick={cycleTheme}>
              {currentThemeMode === THEME_MODES.LIGHT ? (
                <Brightness5Icon />
              ) : currentThemeMode === THEME_MODES.DARK ? (
                <Brightness4Icon />
              ) : (
                <BrightnessAutoIcon />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title={t('Language', { defaultValue: 'Language' })}>
            <IconButton
              color='inherit'
              aria-label={t('Language', { defaultValue: 'Language' })}
              onClick={cycleLanguage}
            >
              <Typography component='span' variant='button' sx={{ fontSize: '0.75rem', minWidth: 24 }}>
                {currentLang.toUpperCase()}
              </Typography>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {!isMobile && (
        <Drawer
          variant='permanent'
          sx={{
            gridArea: 'sidebar',
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              position: 'relative',
              borderRight: 1,
              borderColor: 'divider',
              pt: 0,
            },
          }}
        >
          <Sidebar {...navProps} />
        </Drawer>
      )}

      <Box
        component='main'
        sx={{
          gridArea: 'content',
          minHeight: 0,
          minWidth: 0,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          pb: isMobile ? 'calc(90px + env(safe-area-inset-bottom, 0px))' : 0,
        }}
      >
        <TorrentsPage sortABC={sortABC} sortCategory={globalCategoryFilter} />
      </Box>

      {isMobile && <BottomNav {...navProps} />}

      <Suspense fallback={null}>
        <AddDialog open={addOpen && !launchFiles} onClose={closeAdd} initialSource={launchSource} />
        {launchFiles ? (
          <MultiAddDialog
            files={launchFiles}
            open
            onClose={() => {
              setLaunchFiles(null)
              setAddOpen(false)
            }}
          />
        ) : null}
        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
        <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
        <CloseServerDialog open={closeServerOpen} onClose={() => setCloseServerOpen(false)} />
        <RemoveAllDialog open={removeAllOpen} onClose={() => setRemoveAllOpen(false)} />
        <CategoriesDrawer
          open={categoriesOpen}
          onClose={() => setCategoriesOpen(false)}
          selectedCategory={globalCategoryFilter}
          onSelectCategory={setGlobalCategoryFilter}
        />
      </Suspense>
    </Box>
  )
}

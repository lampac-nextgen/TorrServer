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
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Sort as SortIcon,
  SortByAlpha as SortByAlphaIcon,
} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { echoHost } from 'shared/api/hosts'
import useChangeLanguage from 'shared/lib/useChangeLanguage'
import useLaunchHandler from 'shared/lib/useLaunchHandler'
import { detectApplePlatform, isStandaloneApp } from 'shared/lib/platform'
import { useLocalJsonPref } from 'shared/hooks/useLocalPref'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'
import { queryMax } from 'shared/theme/breakpoints'
import { getThemeColors } from 'shared/theme/colors'
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
const PWAInstallationGuide = lazy(() => import('features/pwa/PWAInstallationGuide'))

const LANG_CYCLE = ['en', 'ru', 'ua', 'zh', 'bg', 'fr', 'ro'] as const

const SIDEBAR_OPEN = 260
const SIDEBAR_COLLAPSED = 60

export default function Shell() {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(queryMax('mobile'))

  const [, currentThemeMode, updateThemeMode] = useThemePreference()
  const [currentLang, changeLang] = useChangeLanguage()
  const { launchSource, setLaunchSource, launchFiles, setLaunchFiles } = useLaunchHandler()
  const [sidebarOpen, setSidebarOpen] = useLocalJsonPref('sidebarOpen', true)

  const [torrServerVersion, setTorrServerVersion] = useState('')
  const [sortABC, setSortABC] = useState(false)
  const [globalCategoryFilter, setGlobalCategoryFilter] = useState('all')

  const [addOpen, setAddOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [closeServerOpen, setCloseServerOpen] = useState(false)
  const [removeAllOpen, setRemoveAllOpen] = useState(false)

  const { isLoading, isError } = useTorrentsQuery()
  const isOffline = isError
  const sidebarWidth = sidebarOpen ? SIDEBAR_OPEN : SIDEBAR_COLLAPSED
  const mode = theme.palette.mode === 'dark' ? 'dark' : 'light'
  const sidebarBg = getThemeColors(mode).app.sidebarBGColor

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
        gridTemplateRows: 'calc(60px + env(safe-area-inset-top, 0px)) 1fr',
        gridTemplateColumns: isMobile ? '1fr' : `${sidebarWidth}px 1fr`,
        gridTemplateAreas: isMobile ? '"header" "content"' : '"header header" "sidebar content"',
        transition: theme.transitions.create('grid-template-columns', {
          duration: theme.transitions.duration.shorter,
        }),
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
          {!isMobile ? (
            <Tooltip title={sidebarOpen ? t('CollapseSidebar', { defaultValue: 'Collapse sidebar' }) : t('ExpandSidebar', { defaultValue: 'Expand sidebar' })}>
              <IconButton
                color='inherit'
                edge='start'
                aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
            </Tooltip>
          ) : null}

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
            width: sidebarWidth,
            flexShrink: 0,
            transition: theme.transitions.create('width', {
              duration: theme.transitions.duration.shorter,
            }),
            '& .MuiDrawer-paper': {
              width: sidebarWidth,
              boxSizing: 'border-box',
              position: 'relative',
              borderRight: 0,
              bgcolor: sidebarBg,
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            },
          }}
        >
          <Sidebar {...navProps} collapsed={!sidebarOpen} />
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
          bgcolor: 'background.default',
          pb: isMobile ? 'calc(90px + env(safe-area-inset-bottom, 0px))' : 0,
        }}
      >
        <TorrentsPage sortABC={sortABC} sortCategory={globalCategoryFilter} onAdd={() => setAddOpen(true)} />
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
        {detectApplePlatform().isIOS && !isStandaloneApp ? <PWAInstallationGuide /> : null}
      </Suspense>
    </Box>
  )
}

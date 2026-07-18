import CssBaseline from '@mui/material/CssBaseline'
import CircularProgress from '@mui/material/CircularProgress'
import { createContext, lazy, Suspense, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Brightness4 as Brightness4Icon,
  Brightness5 as Brightness5Icon,
  BrightnessAuto as BrightnessAutoIcon,
  Sort as SortIcon,
  SortByAlpha as SortByAlphaIcon,
} from '@mui/icons-material'
import { echoHost } from 'utils/Hosts'
import axios from 'axios'
import TorrentList from 'components/TorrentList'
import useChangeLanguage from 'utils/useChangeLanguage'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { detectApplePlatform, getTorrents, isStandaloneApp } from 'utils/Utils'
import GlobalStyle from 'style/GlobalStyle'
import { AppSnackbarProvider } from 'components/Feedback/AppSnackbar'
import { THEME_MODES, useMaterialUITheme } from 'style/materialUISetup'
import getStyledComponentsTheme from 'style/getStyledComponentsTheme'
import useLaunchHandler from 'utils/useLaunchHandler'
import { useTranslation } from 'react-i18next'

import { AppWrapper, AppHeader, HeaderToggle, StyledIconButton } from './style'
import Sidebar from './Sidebar'
import MobileBottomNav from './MobileBottomNav'
import { PWAInstallationGuide } from './PWAInstallationGuide'

const SearchDialog = lazy(() => import('components/Search/SearchDialog'))
const AddDialog = lazy(() => import('components/Add/AddDialog'))
const MultiAddDialog = lazy(() => import('components/Add/MultiAddDialog'))

interface DarkModeContextValue {
  isDarkMode: boolean
}

export const DarkModeContext = createContext<DarkModeContextValue>({ isDarkMode: false })

export default function App() {
  const { t } = useTranslation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
  const [torrServerVersion, setTorrServerVersion] = useState('')
  const [listPollMs, setListPollMs] = useState(1000)

  const [isDarkMode, currentThemeMode, updateThemeMode, muiTheme] = useMaterialUITheme()
  const [currentLang, changeLang] = useChangeLanguage()
  const [isOffline, setIsOffline] = useState(false)
  const [globalCategoryFilter, setGlobalFilterCategory] = useState('all')
  const {
    data: torrents,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['torrents'],
    queryFn: getTorrents,
    retry: 1,
    refetchInterval: listPollMs,
  })

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

  const [sortABC, setSortABC] = useState(false)
  const handleClickSortABC = () => setSortABC(true)
  const handleClickSortDate = () => setSortABC(false)

  const { launchSource, setLaunchSource, launchFiles, setLaunchFiles } = useLaunchHandler()

  useEffect(() => {
    axios.get(echoHost()).then(({ data }) => setTorrServerVersion(data))
  }, [])

  return (
    <>
      <GlobalStyle />

      <DarkModeContext.Provider value={{ isDarkMode }}>
        <MuiThemeProvider theme={muiTheme}>
          <StyledComponentsThemeProvider
            theme={getStyledComponentsTheme(isDarkMode ? THEME_MODES.DARK : THEME_MODES.LIGHT)}
          >
            <CssBaseline />
            <AppSnackbarProvider>
              <>
                <AppWrapper $isDrawerOpen={isDrawerOpen}>
                  <AppHeader>
                    <Tooltip title={t('Menu', { defaultValue: 'Menu' })}>
                      <StyledIconButton
                        edge='start'
                        color='inherit'
                        aria-label={t('Menu', { defaultValue: 'Menu' })}
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                      >
                        {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
                      </StyledIconButton>
                    </Tooltip>

                    <Typography variant='h6' noWrap sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      TorrServer {torrServerVersion}
                    </Typography>

                    <div
                      style={{
                        justifySelf: 'end',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '6px',
                        flexShrink: 0,
                      }}
                    >
                      <Tooltip
                        title={
                          sortABC
                            ? t('SortByDate', { defaultValue: 'Sort by date' })
                            : t('SortByName', { defaultValue: 'Sort by name' })
                        }
                      >
                        <HeaderToggle
                          color='inherit'
                          aria-label={
                            sortABC
                              ? t('SortByDate', { defaultValue: 'Sort by date' })
                              : t('SortByName', { defaultValue: 'Sort by name' })
                          }
                          onClick={() => (sortABC === true ? handleClickSortDate() : handleClickSortABC())}
                        >
                          {sortABC === true ? <SortByAlphaIcon /> : <SortIcon />}
                        </HeaderToggle>
                      </Tooltip>

                      <Tooltip title={t('Theme', { defaultValue: 'Theme' })}>
                        <HeaderToggle
                          color='inherit'
                          aria-label={t('Theme', { defaultValue: 'Theme' })}
                          onClick={() => {
                            if (currentThemeMode === THEME_MODES.LIGHT) updateThemeMode(THEME_MODES.DARK)
                            if (currentThemeMode === THEME_MODES.DARK) updateThemeMode(THEME_MODES.AUTO)
                            if (currentThemeMode === THEME_MODES.AUTO) updateThemeMode(THEME_MODES.LIGHT)
                          }}
                        >
                          {currentThemeMode === THEME_MODES.LIGHT ? (
                            <Brightness5Icon />
                          ) : currentThemeMode === THEME_MODES.DARK ? (
                            <Brightness4Icon />
                          ) : (
                            <BrightnessAutoIcon />
                          )}
                        </HeaderToggle>
                      </Tooltip>

                      <Tooltip title={t('Language', { defaultValue: 'Language' })}>
                        <HeaderToggle
                          color='inherit'
                          aria-label={t('Language', { defaultValue: 'Language' })}
                          onClick={() =>
                            currentLang === 'en'
                              ? changeLang('ru')
                              : currentLang === 'ru'
                                ? changeLang('ua')
                                : currentLang === 'ua'
                                  ? changeLang('zh')
                                  : currentLang === 'zh'
                                    ? changeLang('bg')
                                    : currentLang === 'bg'
                                      ? changeLang('fr')
                                      : currentLang === 'fr'
                                        ? changeLang('ro')
                                        : changeLang('en')
                          }
                        >
                          {currentLang.toUpperCase()}
                        </HeaderToggle>
                      </Tooltip>
                    </div>
                  </AppHeader>

                  <Sidebar
                    isOffline={isOffline}
                    isLoading={isLoading}
                    isDrawerOpen={isDrawerOpen}
                    setGlobalFilterCategory={setGlobalFilterCategory}
                  />

                  <TorrentList
                    isOffline={isOffline}
                    torrents={torrents}
                    isLoading={isLoading}
                    sortABC={sortABC}
                    sortCategory={globalCategoryFilter}
                  />

                  <Suspense
                    fallback={
                      <div style={{ display: 'grid', placeItems: 'center', padding: 24 }}>
                        <CircularProgress size={32} />
                      </div>
                    }
                  >
                    {isSearchDialogOpen && <SearchDialog handleClose={() => setIsSearchDialogOpen(false)} />}
                    {launchSource && <AddDialog hash={launchSource} handleClose={() => setLaunchSource(null)} />}
                    {launchFiles && <MultiAddDialog files={launchFiles} handleClose={() => setLaunchFiles(null)} />}
                  </Suspense>

                  {detectApplePlatform().isIOS && !isStandaloneApp && <PWAInstallationGuide />}
                </AppWrapper>

                {/* Outside overflow:hidden shell — iOS fixed bottom chrome (master PWA pattern) */}
                <MobileBottomNav
                  isOffline={isOffline}
                  isLoading={isLoading}
                  setGlobalFilterCategory={setGlobalFilterCategory}
                  onOpenSearch={() => setIsSearchDialogOpen(true)}
                />
              </>
            </AppSnackbarProvider>
          </StyledComponentsThemeProvider>
        </MuiThemeProvider>
      </DarkModeContext.Provider>
    </>
  )
}

import { lazy, Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Tooltip, useMediaQuery } from '@heroui/react'
import {
  ChevronLeft,
  Menu,
  Moon,
  SortAsc,
  SortDesc,
  Sun,
  SunMoon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { echoHost } from 'shared/api/hosts'
import useChangeLanguage from 'shared/lib/useChangeLanguage'
import useLaunchHandler from 'shared/lib/useLaunchHandler'
import { detectApplePlatform, isStandaloneApp } from 'shared/lib/platform'
import { useLocalJsonPref } from 'shared/hooks/useLocalPref'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'
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
const PWAInstallationGuide = lazy(() => import('features/pwa/PWAInstallationGuide'))

const LANG_CYCLE = ['en', 'ru', 'ua', 'zh', 'bg', 'fr', 'ro'] as const

const SIDEBAR_OPEN = 260
const SIDEBAR_COLLAPSED = 60

export default function Shell() {
  const { t } = useTranslation()
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

  const themeIcon =
    currentThemeMode === THEME_MODES.LIGHT ? (
      <Sun size={20} />
    ) : currentThemeMode === THEME_MODES.DARK ? (
      <Moon size={20} />
    ) : (
      <SunMoon size={20} />
    )

  return (
    <div
      className='grid h-full overflow-hidden bg-[var(--background,#0a0f0d)]'
      style={{
        gridTemplateRows: 'calc(60px + env(safe-area-inset-top, 0px)) 1fr',
        gridTemplateColumns: isMobile ? '1fr' : `${sidebarWidth}px 1fr`,
        gridTemplateAreas: isMobile ? '"header" "content"' : '"header header" "sidebar content"',
        transition: 'grid-template-columns 200ms ease',
      }}
    >
      <header
        className='flex items-center gap-2 bg-[#0d6b4f] px-2 pt-[env(safe-area-inset-top,0px)] text-white dark:bg-[#0e1613]'
        style={{
          gridArea: 'header',
          minHeight: 'calc(60px + env(safe-area-inset-top, 0px))',
        }}
      >
        {!isMobile ? (
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                variant='ghost'
                isIconOnly
                className='text-white hover:bg-white/10'
                aria-label={
                  sidebarOpen
                    ? t('CollapseSidebar', { defaultValue: 'Collapse sidebar' })
                    : t('ExpandSidebar', { defaultValue: 'Expand sidebar' })
                }
                onPress={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <ChevronLeft size={22} /> : <Menu size={22} />}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              {sidebarOpen
                ? t('CollapseSidebar', { defaultValue: 'Collapse sidebar' })
                : t('ExpandSidebar', { defaultValue: 'Expand sidebar' })}
            </Tooltip.Content>
          </Tooltip>
        ) : null}

        <h1 className='min-w-0 flex-1 truncate text-lg font-semibold'>
          TorrServer {torrServerVersion}
        </h1>

        <Tooltip>
          <Tooltip.Trigger>
            <Button
              variant='ghost'
              isIconOnly
              className='text-white hover:bg-white/10'
              aria-label={
                sortABC
                  ? t('SortByDate', { defaultValue: 'Sort by date' })
                  : t('SortByName', { defaultValue: 'Sort by name' })
              }
              onPress={() => setSortABC(v => !v)}
            >
              {sortABC ? <SortAsc size={20} /> : <SortDesc size={20} />}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            {sortABC
              ? t('SortByDate', { defaultValue: 'Sort by date' })
              : t('SortByName', { defaultValue: 'Sort by name' })}
          </Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <Button
              variant='ghost'
              isIconOnly
              className='text-white hover:bg-white/10'
              aria-label={t('Theme', { defaultValue: 'Theme' })}
              onPress={cycleTheme}
            >
              {themeIcon}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('Theme', { defaultValue: 'Theme' })}</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <Button
              variant='ghost'
              className='min-w-10 px-2 text-xs font-semibold text-white hover:bg-white/10'
              aria-label={t('Language', { defaultValue: 'Language' })}
              onPress={cycleLanguage}
            >
              {currentLang.toUpperCase()}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('Language', { defaultValue: 'Language' })}</Tooltip.Content>
        </Tooltip>
      </header>

      {!isMobile ? (
        <aside
          className='min-h-0 overflow-hidden'
          style={{
            gridArea: 'sidebar',
            width: sidebarWidth,
            transition: 'width 200ms ease',
          }}
        >
          <Sidebar {...navProps} collapsed={!sidebarOpen} />
        </aside>
      ) : null}

      <main
        className='min-h-0 min-w-0 overflow-auto bg-[var(--background,#0a0f0d)] [-webkit-overflow-scrolling:touch]'
        style={{
          gridArea: 'content',
          paddingBottom: isMobile ? 'calc(90px + env(safe-area-inset-bottom, 0px))' : 0,
        }}
      >
        <TorrentsPage sortABC={sortABC} sortCategory={globalCategoryFilter} onAdd={() => setAddOpen(true)} />
      </main>

      {isMobile ? <BottomNav {...navProps} /> : null}

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
    </div>
  )
}

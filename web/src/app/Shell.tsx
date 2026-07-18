import { lazy, type ReactNode, Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Tooltip, useMediaQuery } from '@heroui/react'
import { ChevronLeft, Menu, Moon, SortAsc, SortDesc, Sun, SunMoon, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { echoHost } from 'shared/api/hosts'
import useChangeLanguage from 'shared/lib/useChangeLanguage'
import useLaunchHandler from 'shared/lib/useLaunchHandler'
import { detectApplePlatform, isStandaloneApp } from 'shared/lib/platform'
import { useLocalJsonPref } from 'shared/hooks/useLocalPref'
import { useTorrentsQuery } from 'shared/hooks/useTorrentsQuery'
import { OPEN_SETTINGS_EVENT, type SettingsDeepLinkTab } from 'shared/lib/settingsEvents'
import { queryMax } from 'shared/theme/breakpoints'
import { THEME_MODES, useThemePreference } from 'shared/theme/useThemePreference'
import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import { TorrentsPage } from 'features/torrents'
import { iconBtn } from 'shared/ui/controlClasses'

import BottomNav from './BottomNav'
import Sidebar from './Sidebar'

const AddDialog = lazy(() => import('features/add/AddDialog'))
const MultiAddDialog = lazy(() => import('features/add/MultiAddDialog'))
const SearchDialog = lazy(() => import('features/search/SearchDialog'))
const SettingsDialog = lazy(() => import('features/settings/SettingsDialog'))
const AboutDialog = lazy(() => import('features/about/AboutDialog'))
const CloseServerDialog = lazy(() => import('features/system/CloseServerDialog'))
const RemoveAllDialog = lazy(() => import('features/system/RemoveAllDialog'))
const CategoriesDrawer = lazy(() => import('features/categories/CategoriesDrawer'))
const PWAInstallationGuide = lazy(() => import('features/pwa/PWAInstallationGuide'))
const AndroidInstallBanner = lazy(() => import('features/pwa/AndroidInstallBanner'))

const LANG_CYCLE = ['en', 'ru', 'ua', 'zh', 'bg', 'fr', 'ro'] as const

const SIDEBAR_OPEN_PX = 260
const SIDEBAR_COLLAPSED_PX = 60
const HEADER_HEIGHT = 'calc(60px + env(safe-area-inset-top, 0px))'

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
  const [settingsInitialTab, setSettingsInitialTab] = useState<SettingsDeepLinkTab | undefined>()
  const [aboutOpen, setAboutOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [closeServerOpen, setCloseServerOpen] = useState(false)
  const [removeAllOpen, setRemoveAllOpen] = useState(false)

  const { isLoading, isError } = useTorrentsQuery()
  const isOffline = isError
  const sidebarWidth = sidebarOpen ? SIDEBAR_OPEN_PX : SIDEBAR_COLLAPSED_PX

  useEffect(() => {
    axios.get(echoHost()).then(({ data }) => setTorrServerVersion(String(data)))
  }, [])

  useEffect(() => {
    if (launchSource || launchFiles) setAddOpen(true)
  }, [launchSource, launchFiles])

  useEffect(() => {
    const openWithTab = (event: Event) => {
      setSettingsInitialTab((event as CustomEvent<SettingsDeepLinkTab>).detail)
      setSettingsOpen(true)
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, openWithTab)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openWithTab)
  }, [])

  const cycleLanguage = () => {
    const idx = LANG_CYCLE.indexOf(currentLang as (typeof LANG_CYCLE)[number])
    changeLang(LANG_CYCLE[(idx + 1) % LANG_CYCLE.length])
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

  const isCategoryFilterActive = globalCategoryFilter !== 'all'
  const categoryFilterLabel =
    globalCategoryFilter === 'all'
      ? null
      : globalCategoryFilter === ''
        ? t('Uncategorized')
        : t(TORRENT_CATEGORIES.find(category => category.key === globalCategoryFilter)?.name ?? globalCategoryFilter)

  const navProps = {
    isOffline,
    isLoading,
    isCategoryFilterActive,
    onAdd: () => setAddOpen(true),
    onSearch: () => setSearchOpen(true),
    onCategories: () => setCategoriesOpen(true),
    onSettings: () => setSettingsOpen(true),
    onAbout: () => setAboutOpen(true),
    onCloseServer: () => setCloseServerOpen(true),
    onRemoveAll: () => setRemoveAllOpen(true),
  }

  const ThemeIcon =
    currentThemeMode === THEME_MODES.LIGHT ? Sun : currentThemeMode === THEME_MODES.DARK ? Moon : SunMoon
  const themeModeLabel =
    currentThemeMode === THEME_MODES.LIGHT
      ? t('ThemeLight', { defaultValue: 'Light' })
      : currentThemeMode === THEME_MODES.DARK
        ? t('ThemeDark', { defaultValue: 'Dark' })
        : t('ThemeAuto', { defaultValue: 'Auto' })
  const SortIcon = sortABC ? SortAsc : SortDesc

  return (
    <div
      className='grid h-full overflow-hidden bg-background'
      style={{
        gridTemplateRows: `${HEADER_HEIGHT} 1fr`,
        gridTemplateColumns: isMobile ? '1fr' : `${sidebarWidth}px 1fr`,
        gridTemplateAreas: isMobile ? '"header" "content"' : '"header header" "sidebar content"',
        transition: 'grid-template-columns 200ms ease',
      }}
    >
      <header
        className='flex items-center gap-2 bg-app-header px-2 pt-[env(safe-area-inset-top,0px)] text-app-header-foreground'
        style={{ gridArea: 'header', minHeight: HEADER_HEIGHT }}
      >
        {!isMobile ? (
          <HeaderIconButton
            label={
              sidebarOpen
                ? t('CollapseSidebar', { defaultValue: 'Collapse sidebar' })
                : t('ExpandSidebar', { defaultValue: 'Expand sidebar' })
            }
            onPress={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <ChevronLeft size={22} /> : <Menu size={22} />}
          </HeaderIconButton>
        ) : null}

        <h1 className='flex min-w-0 flex-1 items-center gap-2 truncate text-lg font-semibold'>
          <span className='truncate'>
            TorrServer <span className='font-normal text-app-header-foreground/70'>{torrServerVersion}</span>
          </span>
          {categoryFilterLabel ? (
            <button
              type='button'
              onClick={() => setGlobalCategoryFilter('all')}
              className='inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium hover-fine:bg-white/25'
              aria-label={t('ClearCategoryFilter', { defaultValue: 'Clear category filter' })}
            >
              <span className='max-w-[9rem] truncate'>{categoryFilterLabel}</span>
              <X size={13} strokeWidth={2.5} aria-hidden />
            </button>
          ) : null}
        </h1>

        <HeaderIconButton
          label={
            sortABC
              ? t('SortByDate', { defaultValue: 'Sort by date' })
              : t('SortByName', { defaultValue: 'Sort by name' })
          }
          onPress={() => setSortABC(v => !v)}
        >
          <SortIcon size={20} />
        </HeaderIconButton>

        <HeaderIconButton label={`${t('Theme', { defaultValue: 'Theme' })}: ${themeModeLabel}`} onPress={cycleTheme}>
          <ThemeIcon size={20} />
        </HeaderIconButton>

        <Tooltip>
          <Tooltip.Trigger>
            <Button
              variant='ghost'
              className={`${iconBtn} px-2 text-xs font-semibold text-app-header-foreground hover-fine:bg-white/10`}
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
          style={{ gridArea: 'sidebar', width: sidebarWidth, transition: 'width 200ms ease' }}
        >
          <Sidebar {...navProps} collapsed={!sidebarOpen} />
        </aside>
      ) : null}

      <main
        className='min-h-0 min-w-0 overflow-auto bg-background [-webkit-overflow-scrolling:touch]'
        style={{
          gridArea: 'content',
          paddingBottom: isMobile ? 'calc(90px + env(safe-area-inset-bottom, 0px))' : 0,
        }}
      >
        <TorrentsPage
          sortABC={sortABC}
          sortCategory={globalCategoryFilter}
          onAdd={() => setAddOpen(true)}
          onClearCategory={() => setGlobalCategoryFilter('all')}
        />
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
        <SettingsDialog
          open={settingsOpen}
          onClose={() => {
            setSettingsOpen(false)
            setSettingsInitialTab(undefined)
          }}
          initialTab={settingsInitialTab}
        />
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
        {!detectApplePlatform().isIOS && !isStandaloneApp ? <AndroidInstallBanner /> : null}
      </Suspense>
    </div>
  )
}

function HeaderIconButton({ label, onPress, children }: { label: string; onPress: () => void; children: ReactNode }) {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Button
          variant='ghost'
          isIconOnly
          className={`${iconBtn} text-app-header-foreground hover-fine:bg-white/10`}
          aria-label={label}
          onPress={onPress}
        >
          {children}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  )
}

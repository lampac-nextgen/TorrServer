import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Check, Maximize2, Moon, Palette, Search, Sun, SunMoon } from 'lucide-react'
import { Input, Label, TextField, ToggleButton, ToggleButtonGroup } from '@heroui/react'
import { useTranslation } from 'react-i18next'

import { DIALOGS_FULLSCREEN_PREF } from 'shared/hooks/useDialogFullScreen'
import { useLocalBoolPref } from 'shared/hooks/useLocalPref'
import { groupedPalettes } from 'shared/theme/paletteGroups'
import { swatchBackground, THEME_PALETTE_SWATCHES } from 'shared/theme/paletteSwatches'
import { THEME_MODES, THEME_PALETTE_IDS, useThemePreference, type ThemePalette } from 'shared/theme/useThemePreference'
import { iconMenu } from 'shared/ui/iconProps'

import { SettingSwitch } from './SettingSwitch'
import SettingsSection from './SettingsSection'

const ALL_GROUPS = groupedPalettes()

function groupLabelKey(group: string): string {
  return `ThemePaletteGroup${group.charAt(0).toUpperCase()}${group.slice(1)}`
}

function paletteLabelKey(id: ThemePalette): string {
  return `ThemePalette${id.charAt(0).toUpperCase()}${id.slice(1)}`
}

/** Client appearance — brightness + named palette; persists in localStorage immediately. */
export default function AppearanceSettingsPanel() {
  const { t } = useTranslation()
  const { preference, setPreference, palette, setPalette } = useThemePreference()
  const [dialogsFullScreen, setDialogsFullScreen] = useLocalBoolPref(DIALOGS_FULLSCREEN_PREF, false)
  const [query, setQuery] = useState('')

  const labels = useMemo(
    () => Object.fromEntries(THEME_PALETTE_IDS.map(id => [id, t(paletteLabelKey(id))])) as Record<ThemePalette, string>,
    [t],
  )

  const all = ALL_GROUPS
  const total = all.reduce((n, g) => n + g.ids.length, 0)
  const groups = useMemo(() => {
    const q = query.trim().toLocaleLowerCase()
    if (!q) return all
    return all
      .map(g => ({
        ...g,
        ids: g.ids.filter(id => labels[id].toLocaleLowerCase().includes(q) || id.includes(q)),
      }))
      .filter(g => g.ids.length > 0)
  }, [all, labels, query])
  const shown = groups.reduce((n, g) => n + g.ids.length, 0)
  const visibleIds = groups.flatMap(g => g.ids)
  // Roving tabindex: the selected option (or the first one when it is filtered out) is the single tab stop.
  const tabStopId = visibleIds.includes(palette) ? palette : visibleIds[0]
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView?.({ block: 'nearest' })
  }, [])

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const options = [...(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [])]
    const at = options.indexOf(document.activeElement as HTMLButtonElement)
    if (at < 0) return
    const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = -1
    if (event.key in step) next = Math.min(options.length - 1, Math.max(0, at + step[event.key]))
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = options.length - 1
    if (next < 0) return
    event.preventDefault()
    options[next].focus()
  }

  return (
    <div className='space-y-6'>
      <SettingsSection
        icon={<Palette />}
        title={t('SettingsDialog.SectionAppearance')}
        description={t('SettingsDialog.AppearanceInstantHint')}
      >
        <div>
          <Label className='mb-2 block text-sm'>{t('Theme')}</Label>
          <ToggleButtonGroup
            selectionMode='single'
            selectedKeys={[preference]}
            className='flex flex-wrap gap-1'
            aria-label={t('Theme')}
          >
            <ToggleButton
              id={THEME_MODES.LIGHT}
              onPress={() => setPreference(THEME_MODES.LIGHT)}
              className='min-h-11 gap-2'
            >
              <Sun {...iconMenu} aria-hidden />
              {t('ThemeLight')}
            </ToggleButton>
            <ToggleButton
              id={THEME_MODES.DARK}
              onPress={() => setPreference(THEME_MODES.DARK)}
              className='min-h-11 gap-2'
            >
              <Moon {...iconMenu} aria-hidden />
              {t('ThemeDark')}
            </ToggleButton>
            <ToggleButton
              id={THEME_MODES.AUTO}
              onPress={() => setPreference(THEME_MODES.AUTO)}
              className='min-h-11 gap-2'
            >
              <SunMoon {...iconMenu} aria-hidden />
              {t('ThemeAuto')}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div>
          <div className='mb-2 flex flex-wrap items-end justify-between gap-2'>
            <Label className='text-sm'>{t('ThemePalette')}</Label>
            <p className='text-xs text-muted'>
              {labels[palette]}
              {shown !== total ? ` · ${shown}/${total}` : null}
            </p>
          </div>

          <div className='relative mb-3'>
            <Search
              size={16}
              strokeWidth={1.75}
              className='pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-muted'
              aria-hidden
            />
            <TextField value={query} onChange={setQuery} aria-label={t('SettingsDialog.ThemePaletteSearch')}>
              <Input type='search' placeholder={t('SettingsDialog.ThemePaletteSearch')} className='min-h-11 pl-9' />
            </TextField>
          </div>

          {shown === 0 ? (
            <p className='py-6 text-center text-sm text-muted'>{t('SettingsDialog.ThemePaletteEmpty')}</p>
          ) : (
            <div
              ref={listRef}
              className='space-y-4'
              role='listbox'
              aria-label={t('ThemePalette')}
              onKeyDown={onListKeyDown}
            >
              {groups.map(g => (
                <div key={g.group} role='group' aria-label={t(groupLabelKey(g.group))}>
                  <p className='mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted'>
                    {t(groupLabelKey(g.group))}
                  </p>
                  <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
                    {g.ids.map(id => {
                      const selected = id === palette
                      const swatch = THEME_PALETTE_SWATCHES[id]
                      return (
                        <button
                          key={id}
                          type='button'
                          role='option'
                          aria-selected={selected}
                          tabIndex={id === tabStopId ? 0 : -1}
                          onClick={() => setPalette(id)}
                          className={`flex min-h-11 items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors ${
                            selected
                              ? 'border-accent bg-accent/10 ring-1 ring-accent/40'
                              : 'border-border bg-surface hover-fine:border-accent/40 hover-fine:bg-surface-tertiary'
                          }`}
                        >
                          <span
                            className='relative size-8 shrink-0 overflow-hidden rounded-md border border-black/10 shadow-sm'
                            aria-hidden
                            style={{
                              background: swatchBackground(swatch),
                            }}
                          >
                            {selected ? (
                              <span className='absolute inset-0 grid place-items-center bg-black/25'>
                                <Check size={14} strokeWidth={2.5} className='text-white' />
                              </span>
                            ) : null}
                          </span>
                          <span className='min-w-0 flex-1 truncate text-sm font-medium text-foreground'>
                            {labels[id]}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SettingsSection>

      <SettingsSection
        icon={<Maximize2 />}
        title={t('SettingsDialog.SectionDialogs')}
        description={t('SettingsDialog.DialogsInstantHint')}
      >
        <SettingSwitch
          id={DIALOGS_FULLSCREEN_PREF}
          label={t('SettingsDialog.DialogsFullScreen')}
          helper={t('SettingsDialog.DialogsFullScreenHint')}
          checked={dialogsFullScreen}
          onChange={(_id, checked) => setDialogsFullScreen(checked)}
        />
      </SettingsSection>
    </div>
  )
}

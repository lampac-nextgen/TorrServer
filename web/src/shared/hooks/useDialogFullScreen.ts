import { useMediaQuery } from '@heroui/react'

import { useLocalBoolPref } from 'shared/hooks/useLocalPref'
import { MEDIA_TABLET_LANDSCAPE, queryMax } from 'shared/theme/breakpoints'

/** localStorage key — also used by Appearance settings switch. */
export const DIALOGS_FULLSCREEN_PREF = 'dialogsFullScreen'

/** Pure policy used by {@link useDialogFullScreen} (and unit tests). */
export function resolveDialogFullScreen(input: { narrow: boolean; tabletLandscape: boolean; force: boolean }): boolean {
  return input.narrow || input.tabletLandscape || input.force
}

/**
 * Sheet dialogs go fullscreen when:
 * - viewport ≤ dialog breakpoint (960px), or
 * - tablet landscape (touch iPad-class devices), or
 * - Appearance → Dialogs fullscreen is on (forces wide monitors too).
 *
 * VideoPlayer keeps its own media query (cinema frame on desktop).
 */
export function useDialogFullScreen(): boolean {
  const narrow = useMediaQuery(queryMax('dialog'))
  const tabletLandscape = useMediaQuery(MEDIA_TABLET_LANDSCAPE)
  const [force] = useLocalBoolPref(DIALOGS_FULLSCREEN_PREF, false)
  return resolveDialogFullScreen({ narrow, tabletLandscape, force })
}

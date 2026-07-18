import { useMediaQuery } from '@heroui/react'

import { useLocalBoolPref } from 'shared/hooks/useLocalPref'
import { queryMax } from 'shared/theme/breakpoints'

/** localStorage key — also used by Appearance settings switch. */
export const DIALOGS_FULLSCREEN_PREF = 'dialogsFullScreen'

/**
 * Sheet dialogs go fullscreen on the dialog breakpoint (≤960px) or when the user
 * opts in via Appearance → Dialogs fullscreen. VideoPlayer keeps its own media query.
 */
export function useDialogFullScreen(): boolean {
  const narrow = useMediaQuery(queryMax('dialog'))
  const [force] = useLocalBoolPref(DIALOGS_FULLSCREEN_PREF, false)
  return narrow || force
}

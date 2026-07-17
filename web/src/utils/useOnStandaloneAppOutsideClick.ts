import { useEffect, useRef, type RefObject } from 'react'
import { isStandaloneApp } from 'utils/Utils'

/**
 * Close standalone dialogs when tapping outside the paper (e.g. PWA footer).
 * Listener is deferred so the opening click cannot immediately close the dialog.
 */
export default function useOnStandaloneAppOutsideClick<T extends HTMLElement = HTMLDivElement>(
  onClickOutside?: () => void,
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const callbackRef = useRef(onClickOutside)
  callbackRef.current = onClickOutside

  useEffect(() => {
    if (!isStandaloneApp) return

    const handlePointerOutside = (event: Event) => {
      const target = event.target as HTMLElement | null
      if (!ref.current || !target) return
      if (ref.current.contains(target)) return

      // Portaled MUI menus / selects rendered outside the dialog paper
      if (
        target.closest('[role="listbox"]') ||
        target.closest('[role="menu"]') ||
        target.closest('.MuiMenu-root') ||
        target.closest('.MuiPopover-root') ||
        target.closest('.MuiAutocomplete-popper')
      ) {
        return
      }

      // Nested dialog (e.g. video player) — do not close the parent from its chrome
      const nestedModal = target.closest('.MuiModal-root')
      if (nestedModal && ref.current && !nestedModal.contains(ref.current)) {
        return
      }

      callbackRef.current?.()
    }

    // Defer past the click that opened the dialog (capture-phase race).
    const timer = window.setTimeout(() => {
      document.addEventListener('pointerdown', handlePointerOutside, true)
    }, 120)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('pointerdown', handlePointerOutside, true)
    }
  }, [])

  return ref
}

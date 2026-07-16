import { useEffect, useRef, type RefObject } from 'react'
import { isStandaloneApp } from 'utils/Utils'

export default function useOnStandaloneAppOutsideClick<T extends HTMLElement = HTMLElement>(
  onClickOutside?: () => void,
): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!isStandaloneApp) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!ref.current || !target || ref.current.contains(target)) return

      const path = (event as MouseEvent & { path?: EventTarget[] }).path
      const composed = typeof event.composedPath === 'function' ? event.composedPath() : []
      const eventPath = (path || composed || []) as Array<Element | null>

      const isWithinMuiMenu =
        target.closest('[role="listbox"]') ||
        target.closest('[role="menu"]') ||
        target.closest('.MuiMenu-root') ||
        target.closest('.MuiPopover-root') ||
        target.closest('.MuiPaper-root[role="presentation"]') ||
        target.closest('.MuiSelect-root') ||
        target.closest('[class*="MuiMenu"]') ||
        target.closest('[class*="MuiPopover"]') ||
        target.closest('[class*="MuiSelect-menu"]') ||
        target.closest('[class*="MuiMenuItem"]') ||
        eventPath.some(
          el =>
            !!el &&
            (el.classList?.contains('MuiMenu-root') ||
              el.classList?.contains('MuiPopover-root') ||
              el.classList?.contains('MuiPaper-root') ||
              el.classList?.contains('MuiMenuItem-root') ||
              el.getAttribute?.('role') === 'listbox' ||
              el.getAttribute?.('role') === 'menu'),
        )

      if (!isWithinMuiMenu) {
        onClickOutside?.()
      }
    }

    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return ref
}

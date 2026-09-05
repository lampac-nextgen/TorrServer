import { createContext, useContext, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type LibraryHeaderSlotValue = {
  host: HTMLElement | null
  setHost: (node: HTMLElement | null) => void
}

const LibraryHeaderSlotContext = createContext<LibraryHeaderSlotValue | null>(null)

/** Hosts a DOM node in the app header so TorrentsPage can portal library chrome into it. */
export function LibraryHeaderSlotProvider({ children }: { children: ReactNode }) {
  const [host, setHost] = useState<HTMLElement | null>(null)
  return <LibraryHeaderSlotContext.Provider value={{ host, setHost }}>{children}</LibraryHeaderSlotContext.Provider>
}

/** Mount point inside the green header — search, select, collections, continue. */
export function LibraryHeaderSlotHost({ className }: { className?: string }) {
  const ctx = useContext(LibraryHeaderSlotContext)
  return <div ref={ctx?.setHost} className={className} />
}

/** Renders `children` into {@link LibraryHeaderSlotHost}. */
export function LibraryHeaderPortal({ children }: { children: ReactNode }) {
  const ctx = useContext(LibraryHeaderSlotContext)
  if (!ctx?.host) return null
  return createPortal(children, ctx.host)
}

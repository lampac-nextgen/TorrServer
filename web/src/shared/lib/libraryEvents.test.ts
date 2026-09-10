import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('libraryEvents', () => {
  beforeEach(() => {
    vi.resetModules()
    const listeners = new Map<string, Set<EventListener>>()
    vi.stubGlobal('window', {
      addEventListener: (type: string, listener: EventListener) => {
        if (!listeners.has(type)) listeners.set(type, new Set())
        listeners.get(type)!.add(listener)
      },
      removeEventListener: (type: string, listener: EventListener) => {
        listeners.get(type)?.delete(listener)
      },
      dispatchEvent: (event: Event) => {
        listeners.get(event.type)?.forEach(listener => listener(event))
        return true
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('dispatches import, export, and playlist events on window', async () => {
    const {
      OPEN_IMPORT_LIBRARY_EVENT,
      OPEN_EXPORT_LIBRARY_EVENT,
      DOWNLOAD_ALL_PLAYLISTS_EVENT,
      requestOpenImportLibrary,
      requestOpenExportLibrary,
      requestDownloadAllPlaylists,
    } = await import('./libraryEvents')

    const onImport = vi.fn()
    const onExport = vi.fn()
    const onPlaylists = vi.fn()
    window.addEventListener(OPEN_IMPORT_LIBRARY_EVENT, onImport)
    window.addEventListener(OPEN_EXPORT_LIBRARY_EVENT, onExport)
    window.addEventListener(DOWNLOAD_ALL_PLAYLISTS_EVENT, onPlaylists)

    requestOpenImportLibrary()
    requestOpenExportLibrary()
    requestDownloadAllPlaylists()

    expect(onImport).toHaveBeenCalledTimes(1)
    expect(onExport).toHaveBeenCalledTimes(1)
    expect(onPlaylists).toHaveBeenCalledTimes(1)

    window.removeEventListener(OPEN_IMPORT_LIBRARY_EVENT, onImport)
    window.removeEventListener(OPEN_EXPORT_LIBRARY_EVENT, onExport)
    window.removeEventListener(DOWNLOAD_ALL_PLAYLISTS_EVENT, onPlaylists)
  })
})

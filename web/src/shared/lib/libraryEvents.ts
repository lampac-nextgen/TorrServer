/**
 * Lets far-away chrome (sidebar, bottom-nav More, Settings, command palette) ask
 * TorrentsPage to open library import/export or download the filtered M3U — without
 * lifting dialog state through Shell.
 */
export const OPEN_IMPORT_LIBRARY_EVENT = 'torrserver:open-import-library'
export const OPEN_EXPORT_LIBRARY_EVENT = 'torrserver:open-export-library'
export const DOWNLOAD_ALL_PLAYLISTS_EVENT = 'torrserver:download-all-playlists'

const dispatchSafe = (type: string): void => {
  try {
    window.dispatchEvent(new Event(type))
  } catch {
    // ignore (SSR / non-browser)
  }
}

export const requestOpenImportLibrary = (): void => {
  dispatchSafe(OPEN_IMPORT_LIBRARY_EVENT)
}

export const requestOpenExportLibrary = (): void => {
  dispatchSafe(OPEN_EXPORT_LIBRARY_EVENT)
}

export const requestDownloadAllPlaylists = (): void => {
  dispatchSafe(DOWNLOAD_ALL_PLAYLISTS_EVENT)
}

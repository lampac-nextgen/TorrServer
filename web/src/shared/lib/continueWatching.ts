const CONTINUE_KEY = 'torrserver.continueWatching'
const CONTINUE_LIMIT = 12

export interface ContinueWatchEntry {
  hash: string
  fileIndex: number
  title: string
  fileName: string
  timecode: number
  updatedAt: number
}

function readAll(): ContinueWatchEntry[] {
  try {
    const raw = localStorage.getItem(CONTINUE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ContinueWatchEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(entries: ContinueWatchEntry[]) {
  try {
    localStorage.setItem(CONTINUE_KEY, JSON.stringify(entries.slice(0, CONTINUE_LIMIT)))
  } catch {
    // quota / private mode — ignore
  }
}

export function rememberContinueWatching(entry: Omit<ContinueWatchEntry, 'updatedAt'>): void {
  if (!entry.hash || entry.fileIndex == null || entry.timecode < 15) return
  const next: ContinueWatchEntry = { ...entry, updatedAt: Date.now() }
  const rest = readAll().filter(item => !(item.hash === next.hash && item.fileIndex === next.fileIndex))
  writeAll([next, ...rest])
}

export function listContinueWatching(knownHashes?: Set<string>): ContinueWatchEntry[] {
  const entries = readAll()
  if (!knownHashes) return entries
  const filtered = entries.filter(item => knownHashes.has(item.hash))
  if (filtered.length !== entries.length) writeAll(filtered)
  return filtered
}

export function removeContinueWatching(hash: string, fileIndex?: number): void {
  writeAll(
    readAll().filter(item => (fileIndex == null ? item.hash !== hash : !(item.hash === hash && item.fileIndex === fileIndex))),
  )
}

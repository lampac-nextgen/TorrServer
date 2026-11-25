/** Below this many playable files the filter row is clutter, not help. */
export const FILE_FILTER_MIN_FILES = 8

/** Files whose path contains every whitespace-separated token, case-insensitive. Empty query keeps all. */
export function filterFilesByQuery<T extends { path: string }>(files: T[], query: string): T[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return files
  return files.filter(file => {
    const haystack = file.path.replace(/\\/g, '/').toLowerCase()
    return tokens.every(token => haystack.includes(token))
  })
}

/** Files not in the viewed list. */
export function filterUnviewed<T extends { id: number }>(files: T[], viewed: readonly number[] | undefined): T[] {
  if (!viewed || viewed.length === 0) return files
  const seen = new Set(viewed)
  return files.filter(file => !seen.has(file.id))
}

import type { PlayableFile } from 'shared/api/types'

export interface DirectoryNode {
  id: string
  label: string
  children: Map<string, DirectoryNode>
  files: PlayableFile[]
}

/** Nested folders from torrent paths. A single path segment stays on the root. */
export function buildDirectoryTree(files: PlayableFile[]): DirectoryNode {
  const root: DirectoryNode = { id: 'root', label: '/', children: new Map(), files: [] }
  for (const file of files) {
    const segments = file.path.replace(/\\/g, '/').split('/').filter(Boolean)
    if (segments.length <= 1) {
      root.files.push(file)
      continue
    }
    let node = root
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i]
      const id = `${node.id}/${segment}`
      if (!node.children.has(segment)) {
        node.children.set(segment, { id, label: segment, children: new Map(), files: [] })
      }
      node = node.children.get(segment)!
    }
    node.files.push(file)
  }
  return root
}

export function collectFilesRecursively(node: DirectoryNode): PlayableFile[] {
  const collected = [...node.files]
  for (const child of node.children.values()) collected.push(...collectFilesRecursively(child))
  return collected
}

export function findNodeById(node: DirectoryNode, id: string): DirectoryNode | null {
  if (node.id === id) return node
  for (const child of node.children.values()) {
    const found = findNodeById(child, id)
    if (found) return found
  }
  return null
}

/** One release folder is not worth a sidebar. */
export function directoryTreeIsUseful(tree: DirectoryNode): boolean {
  return (
    tree.children.size > 1 ||
    [...tree.children.values()].some(child => child.children.size > 0 || child.files.length === 0)
  )
}

export function flattenFolders(node: DirectoryNode, depth = 0): { id: string; label: string; depth: number }[] {
  const rows: { id: string; label: string; depth: number }[] = []
  for (const child of node.children.values()) {
    rows.push({ id: child.id, label: child.label, depth })
    rows.push(...flattenFolders(child, depth + 1))
  }
  return rows
}

/** Files shown for a folder id. Root and a useless tree return the full list. */
export function filesInSelectedFolder(files: PlayableFile[], tree: DirectoryNode, folderId: string): PlayableFile[] {
  if (!directoryTreeIsUseful(tree) || folderId === 'root') return files
  const node = findNodeById(tree, folderId)
  return node ? collectFilesRecursively(node) : files
}

export interface DirectorySummary {
  /** Total bytes of every file below the folder. */
  size: number
  /** Number of files below the folder, nested folders included. */
  fileCount: number
}

/** One pass over the tree: size and file count for every folder id (root included). */
export function summarizeTree(root: DirectoryNode): Map<string, DirectorySummary> {
  const summaries = new Map<string, DirectorySummary>()
  const visit = (node: DirectoryNode): DirectorySummary => {
    const total: DirectorySummary = { size: 0, fileCount: node.files.length }
    for (const file of node.files) total.size += file.length
    for (const child of node.children.values()) {
      const sub = visit(child)
      total.size += sub.size
      total.fileCount += sub.fileCount
    }
    summaries.set(node.id, total)
    return total
  }
  visit(root)
  return summaries
}

/** Every folder id below the root, for "Expand all". */
export function collectFolderIds(root: DirectoryNode): string[] {
  const ids: string[] = []
  const visit = (node: DirectoryNode) => {
    for (const child of node.children.values()) {
      ids.push(child.id)
      visit(child)
    }
  }
  visit(root)
  return ids
}

/** Path of a folder inside the torrent, from its tree id (`root/A/B` → `A/B`). */
export function folderPath(id: string): string {
  return id.replace(/^root\/?/, '')
}

export interface TreeRow {
  key: string
  /** Torrent file id, files only (matches the viewed list). */
  fileId?: number
  kind: 'folder' | 'file'
  depth: number
  label: string
  /** Full path inside the torrent. */
  path: string
  size: number
  fileCount: number
  expanded?: boolean
}

const byName = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })

/** Flat list of the rows that are visible for an expanded set. Collapsed children are not walked. */
export function visibleTreeRows(
  root: DirectoryNode,
  expanded: ReadonlySet<string>,
  summaries: ReadonlyMap<string, DirectorySummary>,
): TreeRow[] {
  const rows: TreeRow[] = []
  const walk = (node: DirectoryNode, depth: number) => {
    const folders = [...node.children.values()].sort((a, b) => byName(a.label, b.label))
    for (const folder of folders) {
      const isOpen = expanded.has(folder.id)
      const summary = summaries.get(folder.id) ?? { size: 0, fileCount: 0 }
      rows.push({
        key: folder.id,
        kind: 'folder',
        depth,
        label: folder.label,
        path: folderPath(folder.id),
        size: summary.size,
        fileCount: summary.fileCount,
        expanded: isOpen,
      })
      if (isOpen) walk(folder, depth + 1)
    }
    const files = [...node.files].sort((a, b) => byName(a.path, b.path))
    for (const file of files) {
      const normalized = file.path.replace(/\\/g, '/')
      rows.push({
        key: `file:${file.id}`,
        fileId: file.id,
        kind: 'file',
        depth,
        label: normalized.split('/').pop() || normalized,
        path: normalized,
        size: file.length,
        fileCount: 1,
      })
    }
  }
  walk(root, 0)
  return rows
}

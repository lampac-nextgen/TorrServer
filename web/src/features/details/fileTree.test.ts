import { describe, expect, it } from 'vitest'

import {
  buildDirectoryTree,
  collectFolderIds,
  directoryTreeIsUseful,
  filesInSelectedFolder,
  flattenFolders,
  folderPath,
  summarizeTree,
  visibleTreeRows,
} from './fileTree'

describe('file tree', () => {
  it('filters a 1200-file pack by nested folder and keeps special names', () => {
    const files = Array.from({ length: 1200 }, (_, i) => ({
      id: i + 1,
      path: `Show/Season ${(i % 12) + 1}/episode ${i} [1080p].mkv`,
      length: 1000 + i,
    }))
    files.push(
      { id: 2000, path: 'loose.mkv', length: 3 },
      { id: 2001, path: String.raw`Show\Season 1\фильм (2020) #1.mkv`, length: 4 },
    )
    const tree = buildDirectoryTree(files)
    expect(directoryTreeIsUseful(tree)).toBe(true)
    expect(flattenFolders(tree).some(folder => folder.label === 'Season 1' && folder.depth === 1)).toBe(true)

    const season1 = filesInSelectedFolder(files, tree, 'root/Show/Season 1')
    expect(season1).toHaveLength(101)
    expect(season1.every(file => file.path.replace(/\\/g, '/').includes('/Season 1/'))).toBe(true)
    expect(season1.some(file => file.path.includes('фильм'))).toBe(true)

    expect(filesInSelectedFolder(files, tree, 'root')).toHaveLength(files.length)
    expect(filesInSelectedFolder(files, tree, 'root/missing')).toBe(files)
  })

  it('hides the sidebar for a single release folder', () => {
    const files = [
      { id: 1, path: 'Movie/video.mkv', length: 1 },
      { id: 2, path: 'Movie/subs.srt', length: 2 },
    ]
    const tree = buildDirectoryTree(files)
    expect(directoryTreeIsUseful(tree)).toBe(false)
    expect(filesInSelectedFolder(files, tree, 'root/Movie')).toBe(files)
  })
})

describe('tree summaries and rows', () => {
  const files = [
    { id: 1, path: 'Show/S1/b.mkv', length: 100 },
    { id: 2, path: 'Show/S1/a.mkv', length: 50 },
    { id: 3, path: 'Show/readme.nfo', length: 5 },
    { id: 4, path: 'loose.txt', length: 1 },
  ]

  it('sums size and file count per folder, nested included', () => {
    const tree = buildDirectoryTree(files)
    const sums = summarizeTree(tree)
    expect(sums.get('root')).toEqual({ size: 156, fileCount: 4 })
    expect(sums.get('root/Show')).toEqual({ size: 155, fileCount: 3 })
    expect(sums.get('root/Show/S1')).toEqual({ size: 150, fileCount: 2 })
    expect(collectFolderIds(tree)).toEqual(['root/Show', 'root/Show/S1'])
    expect(folderPath('root/Show/S1')).toBe('Show/S1')
  })

  it('walks only expanded folders, folders before files, natural order', () => {
    const tree = buildDirectoryTree(files)
    const sums = summarizeTree(tree)
    const collapsed = visibleTreeRows(tree, new Set(), sums)
    expect(collapsed.map(r => r.label)).toEqual(['Show', 'loose.txt'])

    const open = visibleTreeRows(tree, new Set(['root/Show', 'root/Show/S1']), sums)
    expect(open.map(r => `${r.depth}:${r.label}`)).toEqual([
      '0:Show',
      '1:S1',
      '2:a.mkv',
      '2:b.mkv',
      '1:readme.nfo',
      '0:loose.txt',
    ])
    expect(open[0]).toMatchObject({ kind: 'folder', size: 155, fileCount: 3, expanded: true, path: 'Show' })
    expect(open[2]).toMatchObject({ kind: 'file', path: 'Show/S1/a.mkv', size: 50 })
  })
})

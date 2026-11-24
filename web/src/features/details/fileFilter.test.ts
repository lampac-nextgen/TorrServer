import { describe, expect, it } from 'vitest'

import { filterFilesByQuery, filterUnviewed } from './fileFilter'

const files = [
  { id: 1, path: 'Show/S01/Show.S01E01.1080p.mkv' },
  { id: 2, path: 'Show/S01/Show.S01E02.1080p.mkv' },
  { id: 3, path: 'Show\\S02\\Show.S02E01.720p.mkv' },
]

describe('filterFilesByQuery', () => {
  it('keeps everything for an empty or blank query', () => {
    expect(filterFilesByQuery(files, '')).toBe(files)
    expect(filterFilesByQuery(files, '   ')).toBe(files)
  })

  it('matches case-insensitively and requires every token', () => {
    expect(filterFilesByQuery(files, 'S01E02').map(f => f.id)).toEqual([2])
    expect(filterFilesByQuery(files, 'show 1080P').map(f => f.id)).toEqual([1, 2])
    expect(filterFilesByQuery(files, 's02 720').map(f => f.id)).toEqual([3])
    expect(filterFilesByQuery(files, 'nope')).toEqual([])
  })

  it('matches folder names and backslash paths', () => {
    expect(filterFilesByQuery(files, 'S02/Show').map(f => f.id)).toEqual([3])
  })
})

describe('filterUnviewed', () => {
  it('drops viewed ids and keeps all when nothing is viewed', () => {
    expect(filterUnviewed(files, [1, 3]).map(f => f.id)).toEqual([2])
    expect(filterUnviewed(files, [])).toBe(files)
    expect(filterUnviewed(files, undefined)).toBe(files)
  })
})

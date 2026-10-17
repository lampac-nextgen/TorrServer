import { describe, expect, it } from 'vitest'

import { parseLibraryImportText } from './libraryImport'

describe('parseLibraryImportText', () => {
  it('parses export JSON with torrs_hash and metadata', () => {
    const items = parseLibraryImportText(
      JSON.stringify([
        {
          hash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          title: 'Show A',
          category: 'movie',
          poster: 'https://example.com/a.jpg',
          torrs_hash: 'torrs://packedtoken',
        },
        {
          hash: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          title: 'Show B',
        },
      ]),
    )

    expect(items).toHaveLength(2)
    expect(items[0]).toMatchObject({
      link: 'torrs://packedtoken',
      title: 'Show A',
      category: 'movie',
      poster: 'https://example.com/a.jpg',
      hashHint: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    })
    expect(items[1].link).toContain('magnet:?xt=urn:btih:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
    expect(items[1].title).toBe('Show B')
  })

  it('parses magnets and torrs lines, skipping blanks and comments', () => {
    const items = parseLibraryImportText(`
# header
magnet:?xt=urn:btih:cccccccccccccccccccccccccccccccccccccccc&dn=C
torrs://token-d
web+torrs://token-e

aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
`)

    expect(items).toHaveLength(4)
    expect(items[0].link.startsWith('magnet:')).toBe(true)
    expect(items[1].link).toBe('torrs://token-d')
    expect(items[2].link).toBe('torrs://token-e')
    expect(items[3].link).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  })

  it('rewrites bare-infohash web+torrs export lines to magnets', () => {
    const hash = 'e3e497e1efd8db8df93822cad554e13740f51997'
    const items = parseLibraryImportText(`web+torrs://${hash}\ntorrs://${hash.toUpperCase()}`)
    expect(items).toHaveLength(1)
    expect(items[0].link).toBe(`magnet:?xt=urn:btih:${hash}&dn=${hash}`)
    expect(items[0].hashHint).toBe(hash)
  })

  it('dedupes by hash hint', () => {
    const hash = 'dddddddddddddddddddddddddddddddddddddddd'
    const items = parseLibraryImportText(
      [`magnet:?xt=urn:btih:${hash}&dn=One`, `magnet:?xt=urn:btih:${hash}&dn=Two`].join('\n'),
    )
    expect(items).toHaveLength(1)
  })
})

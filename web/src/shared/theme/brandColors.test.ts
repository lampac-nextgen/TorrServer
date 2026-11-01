import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

import data from './palettes.json'

const ROOT = resolve(__dirname, '../../..')
const read = (p: string) => readFileSync(resolve(ROOT, p), 'utf8')
const brand = data.palettes.find(p => p.id === data.default)!

describe('static brand colors follow the default palette', () => {
  it('web manifest uses the dark header and background', () => {
    const m = JSON.parse(read('public/site.webmanifest')) as Record<string, string>
    expect(m.theme_color).toBe(brand.dark['app-header'])
    expect(m.background_color).toBe(brand.dark.background)
  })

  it('browserconfig tile uses the dark header', () => {
    expect(read('public/browserconfig.xml')).toContain(`<TileColor>${brand.dark['app-header']}</TileColor>`)
  })

  it('index.html theme-color fallbacks match the default palette headers', () => {
    const html = read('index.html')
    expect(html).toContain(`content="${brand.light['app-header']}" media="(prefers-color-scheme: light)"`)
    expect(html).toContain(`content="${brand.dark['app-header']}" media="(prefers-color-scheme: dark)"`)
  })
})

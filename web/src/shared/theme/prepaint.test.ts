import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const read = (p: string) => readFileSync(resolve(__dirname, p), 'utf8')

describe('pre-paint theme script in index.html', () => {
  const html = read('../../../index.html')
  const store = read('./useThemePreference.ts')
  const key = (name: string) => store.match(new RegExp(`${name}\\s*=\\s*'([^']+)'`))?.[1]

  it('reads the same localStorage keys as the theme store', () => {
    expect(key('STORAGE_KEY')).toBeTruthy()
    expect(key('STORAGE_KEY_PALETTE')).toBeTruthy()
    expect(html).toContain(`localStorage.getItem('${key('STORAGE_KEY')}')`)
    expect(html).toContain(`localStorage.getItem('${key('STORAGE_KEY_PALETTE')}')`)
  })

  it('runs before the stylesheet-dependent app bundle and is a classic (blocking) script', () => {
    const inline = html.indexOf('ts-color-scheme')
    const bundle = html.indexOf('src="/src/index.tsx"')
    expect(inline).toBeGreaterThan(-1)
    expect(inline).toBeLessThan(bundle)
    expect(html.slice(html.lastIndexOf('<script', inline), inline)).not.toContain('type="module"')
  })
})

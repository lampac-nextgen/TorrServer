import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

import brand from './brand-colors.json'
import data from './palettes.json'

const PUBLIC = resolve(__dirname, '../../../public')
const manifest = JSON.parse(readFileSync(resolve(PUBLIC, 'site.webmanifest'), 'utf8')) as {
  icons: { src: string; sizes: string; purpose: string }[]
}
const byId = Object.fromEntries(data.palettes.map(p => [p.id, p]))

/** Width/height from a PNG header. */
function pngSize(file: string): [number, number] {
  const buf = readFileSync(file)
  return [buf.readUInt32BE(16), buf.readUInt32BE(20)]
}

describe('PWA icons', () => {
  it('declares icons that exist with the declared size', () => {
    for (const icon of manifest.icons) {
      const file = resolve(PUBLIC, icon.src)
      expect(existsSync(file), icon.src).toBe(true)
      const [w, h] = pngSize(file)
      expect(`${w}x${h}`, icon.src).toBe(icon.sizes)
    }
  })

  it('keeps maskable icons separate from the transparent "any" icons', () => {
    const any = new Set(manifest.icons.filter(i => i.purpose === 'any').map(i => i.src))
    for (const icon of manifest.icons.filter(i => i.purpose === 'maskable'))
      expect(any.has(icon.src), icon.src).toBe(false)
  })

  it('ships an opaque apple-touch-icon (colour type without alpha)', () => {
    const file = resolve(PUBLIC, 'apple-touch-icon.png')
    expect(pngSize(file)).toEqual([180, 180])
    // IHDR colour type at byte 25: 2 = RGB, 6 = RGBA (generated icons are flattened, sharp writes RGB).
    expect([2, 3]).toContain(readFileSync(file)[25])
    expect(readFileSync(resolve(PUBLIC, '../index.html'), 'utf8')).toContain('href="./apple-touch-icon.png"')
  })
})

describe('brand logos', () => {
  for (const name of ['dark', 'light']) {
    it(`logo-${name}.svg is outlined and small`, () => {
      const file = resolve(PUBLIC, `brand/logo-${name}.svg`)
      const svg = readFileSync(file, 'utf8')
      expect(svg).not.toContain('<text')
      expect(svg).not.toContain('font-family')
      expect(statSync(file).size).toBeLessThan(20_000)
    })
  }
})

describe('brand colors in palettes', () => {
  it('uses the icon colors as the dark accents of the brand palettes', () => {
    expect(byId.nextgen.dark.accent).toBe(brand.sky)
    expect(byId.nextgen.dark['accent-secondary']).toBe(brand.amber)
    expect(byId.neon.dark.accent).toBe(brand.cyan)
    expect(byId.amber.dark.accent).toBe(brand.amber)
  })
})

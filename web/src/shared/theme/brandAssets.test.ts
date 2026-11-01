import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

import sharp from 'sharp'

import brand from './brand-colors.json'
import data from './palettes.json'

const PUBLIC = resolve(__dirname, '../../../public')
const manifest = JSON.parse(readFileSync(resolve(PUBLIC, 'site.webmanifest'), 'utf8')) as {
  icons: { src: string; sizes: string; purpose: string }[]
}
const byId = Object.fromEntries(data.palettes.map(p => [p.id, p]))
const brandDark = byId[data.default].dark.background

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

describe('iOS splash screens', () => {
  const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const oklab = ([r, g, b]: number[]) => {
    const [R, G, B] = [lin(r), lin(g), lin(b)]
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B)
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B)
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
    return [
      0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    ]
  }

  it('use a background close to the default palette dark background', async () => {
    const bg = oklab([1, 3, 5].map(i => parseInt(brandDark.slice(i, i + 2), 16)))
    const files = readdirSync(PUBLIC).filter(f => f.startsWith('apple-splash-'))
    expect(files.length).toBeGreaterThan(20)
    for (const f of files) {
      const { data, info } = await sharp(resolve(PUBLIC, f)).raw().toBuffer({ resolveWithObject: true })
      const at = (x: number, y: number) =>
        oklab([...data.subarray((y * info.width + x) * info.channels).subarray(0, 3)])
      for (const [x, y] of [
        [2, 2],
        [info.width - 3, 2],
        [2, info.height - 3],
        [info.width - 3, info.height - 3],
      ]) {
        const c = at(x, y)
        expect(Math.hypot(c[0] - bg[0], c[1] - bg[1], c[2] - bg[2]), `${f} corner`).toBeLessThan(0.05)
      }
    }
  })
})

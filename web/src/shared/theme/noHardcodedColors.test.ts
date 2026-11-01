import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const SRC = resolve(__dirname, '../..')
const HEX = /#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?\b/g

/** Brand colors of third-party marks that must not follow the palette. */
const ALLOWED: Record<string, string[]> = {
  'features/pwa/PWAInstallationGuide.tsx': ['#005FF2'],
}

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (name === 'locales') continue
      walk(p, out)
    } else if (
      /\.(ts|tsx|css)$/.test(name) &&
      !/\.test\.tsx?$/.test(name) &&
      !/^palettes\.|^paletteSwatches\./.test(name)
    ) {
      out.push(p)
    }
  }
  return out
}

describe('palette colors come from tokens', () => {
  it('has no hex literals outside the palette source (use CSS variables / Tailwind color tokens)', () => {
    const offenders: string[] = []
    for (const file of walk(SRC)) {
      const rel = relative(SRC, file)
      const allowed = ALLOWED[rel] ?? []
      readFileSync(file, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          for (const hex of line.match(HEX) ?? []) {
            if (!allowed.includes(hex)) offenders.push(`${rel}:${i + 1} ${hex}`)
          }
        })
    }
    expect(offenders).toEqual([])
  })
})

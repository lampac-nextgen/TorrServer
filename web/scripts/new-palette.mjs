// Usage: node scripts/new-palette.mjs <id> [--from <palette>] [--group <group>]
// Scaffolds a palette: copies the tokens of an existing one (default: the default palette) into
// palettes.json, registers the id in THEME_PALETTES, adds the label to every locale (English text:
// translate it) and regenerates the CSS. Then tune the colours and run `yarn test`.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const here = rel => fileURLToPath(new URL(rel, import.meta.url))
const args = process.argv.slice(2)
const flag = name => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}
const id = args.find((a, i) => !a.startsWith('--') && args[i - 1]?.startsWith('--') !== true)

const GROUPS = ['brand', 'neutral', 'warm', 'cool', 'green', 'vivid', 'accessible']
const LOCALES = ['en', 'ru', 'ua', 'bg', 'fr', 'ro', 'zh']

function fail(message) {
  console.error(message)
  process.exit(1)
}

if (!id || !/^[a-z]+$/.test(id))
  fail('Usage: node scripts/new-palette.mjs <id> [--from <palette>] [--group <group>]\n  <id>: lowercase letters only')
const group = flag('--group') ?? 'vivid'
if (!GROUPS.includes(group)) fail(`--group must be one of: ${GROUPS.join(', ')}`)

const jsonPath = here('../src/shared/theme/palettes.json')
const data = JSON.parse(readFileSync(jsonPath, 'utf8'))
if (data.palettes.some(p => p.id === id)) fail(`palette "${id}" already exists`)
const from = data.palettes.find(p => p.id === (flag('--from') ?? data.default))
if (!from) fail(`unknown --from palette "${flag('--from')}"`)

const name = id.charAt(0).toUpperCase() + id.slice(1)
data.palettes.push({
  id,
  note: `${name} — TODO describe (copied from ${from.id}).`,
  group,
  light: { ...from.light },
  dark: { ...from.dark },
})
writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n')

const storePath = here('../src/shared/theme/useThemePreference.ts')
const store = readFileSync(storePath, 'utf8')
const start = store.indexOf('export const THEME_PALETTES = {')
const end = store.indexOf('} as const', start)
if (start < 0 || end < 0) fail('could not find THEME_PALETTES in useThemePreference.ts')
writeFileSync(storePath, `${store.slice(0, end)}  ${id.toUpperCase()}: '${id}',\n${store.slice(end)}`)

for (const locale of LOCALES) {
  const file = here(`../src/locales/${locale}/translation.json`)
  const text = readFileSync(file, 'utf8')
  const anchor = '  "ThemePaletteNextgen"'
  if (!text.includes(anchor)) fail(`locale ${locale}: anchor key not found`)
  writeFileSync(file, text.replace(anchor, `  "ThemePalette${name}": "${name}",\n${anchor}`))
}

const { spawnSync } = await import('node:child_process')
const gen = spawnSync(process.execPath, [here('./gen-palettes.mjs')], { stdio: 'inherit' })
if (gen.status !== 0) fail('gen-palettes failed')

console.log(`
Palette "${id}" scaffolded from "${from.id}" in group "${group}".
Next:
  1. Edit its light/dark tokens in src/shared/theme/palettes.json and rewrite the "note", then yarn gen:palettes
  2. Translate ThemePalette${name} in ru, ua, bg, fr, ro, zh (English placeholder for now)
  3. yarn test            # contrast, sync and group rules
  4. yarn test:e2e:palettes   (or PALETTES=${id})`)

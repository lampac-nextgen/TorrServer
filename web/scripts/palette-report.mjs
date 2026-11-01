// Usage: node scripts/palette-report.mjs [--threshold 0.06] [--all]   (--all includes hidden palettes)
// Compares every palette with every other one (OKLab distance over accent, header and background
// in both modes) and prints near-duplicates plus the accent-hue coverage, to guide curation.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const data = JSON.parse(
  readFileSync(fileURLToPath(new URL('../src/shared/theme/palettes.json', import.meta.url)), 'utf8'),
)
if (!process.argv.includes('--all')) data.palettes = data.palettes.filter(p => !p.hidden) // hidden = already curated away
const threshold = Number(process.argv[process.argv.indexOf('--threshold') + 1]) || 0.06

const lin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
function oklab(hex) {
  const [r, g, b] = [1, 3, 5].map(i => lin(parseInt(hex.slice(i, i + 2), 16) / 255))
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
const parts = p => ['light', 'dark'].flatMap(m => ['accent', 'app-header', 'background'].map(k => oklab(p[m][k])))
const vec = new Map(data.palettes.map(p => [p.id, parts(p)]))
const between = (a, b) => {
  const [x, y] = [vec.get(a), vec.get(b)]
  return x.reduce((n, v, i) => n + dist(v, y[i]), 0) / x.length
}

const ids = data.palettes.map(p => p.id)
const pairs = []
for (let i = 0; i < ids.length; i++)
  for (let j = i + 1; j < ids.length; j++) pairs.push([between(ids[i], ids[j]), ids[i], ids[j]])
pairs.sort((a, b) => a[0] - b[0])

// Clusters: connected components under the threshold.
const parent = Object.fromEntries(ids.map(id => [id, id]))
const find = x => (parent[x] === x ? x : (parent[x] = find(parent[x])))
for (const [d, a, b] of pairs) if (d < threshold) parent[find(a)] = find(b)
const clusters = new Map()
for (const id of ids) clusters.set(find(id), [...(clusters.get(find(id)) ?? []), id])

console.log(`${ids.length} palettes, threshold ${threshold}\n\nClosest pairs:`)
for (const [d, a, b] of pairs.slice(0, 20)) console.log(`  ${d.toFixed(3)}  ${a} ~ ${b}`)
console.log('\nClusters (size > 1):')
for (const c of [...clusters.values()].filter(c => c.length > 1).sort((a, b) => b.length - a.length))
  console.log(`  ${c.join(', ')}`)

// Accent hue coverage (light-mode accent, OKLCH hue) in 30-degree buckets.
const buckets = Array.from({ length: 12 }, () => [])
const neutral = []
for (const p of data.palettes) {
  const [, a, b] = oklab(p.light.accent)
  if (Math.hypot(a, b) < 0.03) neutral.push(p.id)
  else buckets[Math.floor((((Math.atan2(b, a) * 180) / Math.PI + 360) % 360) / 30)].push(p.id)
}
console.log('\nAccent hue coverage (OKLCH, 30° buckets):')
buckets.forEach((ids, i) =>
  console.log(
    `  ${String(i * 30).padStart(3)}–${String(i * 30 + 30).padEnd(3)}  ${String(ids.length).padStart(2)}  ${ids.join(', ')}`,
  ),
)
console.log(`  neutral  ${String(neutral.length).padStart(2)}  ${neutral.join(', ')}`)

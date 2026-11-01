// Streaming over HTTP: bytes, Range, HEAD, playlists, URL encoding.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import fs from 'node:fs'
import path from 'node:path'

import { enc, sha, waitReady, type FileStat } from '../fixtures/server'
import { openDetails } from '../fixtures/helpers'
import { expect, requireBinaries, test, useServer } from '../fixtures/test'

requireBinaries()

test.describe('stream endpoints', () => {
  const s = useServer({ seed: true }, ['show'])
  let files: FileStat[]
  test.beforeAll(async () => {
    files = (await waitReady(s.srv, s.srv.seed.show.hash)).file_stats
  })

  test('every file streams byte-identical with encoded names', async () => {
    const { srv } = s
    const entry = srv.seed.show
    for (const f of files) {
      const rel = f.path.replace(/^Show\//, '')
      const want = entry.files.find(x => x.path === rel)
      expect(want, `manifest has ${rel}`).toBeTruthy()
      const base = path.posix.basename(f.path)
      const q = new URLSearchParams({ link: entry.hash, index: String(f.id) })
      const r = await fetch(`${srv.base}/stream/${enc(base)}?${q}&play`)
      expect(r.status, base).toBe(200)
      const buf = Buffer.from(await r.arrayBuffer())
      expect(buf.length, `${base} length`).toBe(want!.size)
      expect(sha(buf), `${base} bytes`).toBe(want!.sha256)
    }
  })

  test('Range requests: 206, Content-Range, suffix and open-ended', async () => {
    const { srv } = s
    const f = files.find(x => x.path.endsWith('episode1.mkv'))!
    const entry = srv.seed.show.files.find(x => x.path.endsWith('episode1.mkv'))!
    const full = fs.readFileSync(path.join(srv.seedDir, 'content/show/Show', entry.path))
    const url = `${srv.base}/stream/episode1.mkv?link=${srv.seed.show.hash}&index=${f.id}&play`
    const cases: [string, number, number][] = [
      ['bytes=0-99', 0, 99],
      ['bytes=1000-', 1000, full.length - 1],
      ['bytes=-500', full.length - 500, full.length - 1],
      [`bytes=${full.length - 1}-${full.length + 100}`, full.length - 1, full.length - 1],
    ]
    for (const [range, from, to] of cases) {
      const r = await fetch(url, { headers: { Range: range } })
      expect(r.status, range).toBe(206)
      expect(r.headers.get('content-range'), range).toBe(`bytes ${from}-${to}/${full.length}`)
      expect(Buffer.from(await r.arrayBuffer()).equals(full.subarray(from, to + 1)), range).toBe(true)
    }
    const bad = await fetch(url, { headers: { Range: `bytes=${full.length + 10}-` } })
    expect(bad.status).toBe(416)
  })

  test('HEAD reports length and accepts ranges without a body', async () => {
    const { srv } = s
    const f = files.find(x => x.path.endsWith('episode1.mkv'))!
    const r = await fetch(`${srv.base}/stream/episode1.mkv?link=${srv.seed.show.hash}&index=${f.id}&play`, {
      method: 'HEAD',
    })
    expect(r.status).toBe(200)
    expect(r.headers.get('content-length')).toBe('1048576')
    expect(r.headers.get('accept-ranges')).toBe('bytes')
  })

  test('preload route without a filename answers', async () => {
    const { srv } = s
    const r = await fetch(`${srv.base}/stream?link=${srv.seed.show.hash}&index=${files[1].id}&preload`)
    expect(r.status, `preload ${r.status}`).toBeLessThan(500)
    expect(r.status).not.toBe(404)
    await r.arrayBuffer()
  })

  test('failure paths write a status, never an empty 200', async () => {
    const { srv } = s
    const h = srv.seed.show.hash
    const cases: [string, number[]][] = [
      [`/stream/x.mkv?link=${h}&index=999&play`, [404, 400]],
      [`/stream/x.mkv?link=${h}&index=0&play`, [404, 400]],
      [`/stream/x.mkv?link=${h}&index=abc&play`, [400, 404]],
      [`/stream/x.mkv?link=zzzz&index=1&play`, [400, 404]],
      [`/stream/x.mkv?index=1&play`, [400, 404]],
    ]
    for (const [p, ok] of cases) {
      const r = await fetch(srv.base + p)
      const body = await r.arrayBuffer()
      expect(ok, `${p} -> ${r.status}`).toContain(r.status)
      expect(r.status === 200 && body.byteLength === 0, `${p} empty 200`).toBe(false)
    }
  })

  // B1 (fixed): unknown torrent is 404, malformed hash is 400, not 500.
  test('play with unknown or malformed hash is a 4xx', async () => {
    for (const p of [`/play/${'0'.repeat(40)}/1`, '/play/nothex/1']) {
      const r = await fetch(s.srv.base + p)
      await r.arrayBuffer()
      expect(r.status, `${p} -> ${r.status}`).toBeGreaterThanOrEqual(400)
      expect(r.status, `${p} -> ${r.status}`).toBeLessThan(500)
    }
  })

  test('m3u playlists are well formed and filenames are header-safe', async () => {
    const { srv } = s
    const r = await fetch(
      `${srv.base}/stream/${enc('Show [1080p] "x".m3u')}?link=${srv.seed.show.hash}&m3u&fn=file.m3u`,
    )
    expect(r.status).toBe(200)
    expect(r.headers.get('content-disposition') || '').not.toMatch(/[\r\n]/)
    const body = await r.text()
    expect(body).toMatch(/^#EXTM3U/)
    const urls = body.split('\n').filter(l => l.startsWith('http'))
    expect(urls.length, 'playlist lists videos').toBeGreaterThanOrEqual(3)
    for (const u of urls) expect((await fetch(u, { method: 'HEAD' })).status, u).toBe(200)
    const all = await srv.api('/playlistall/all.m3u')
    expect(all.status).toBe(200)
    expect(await all.text()).toMatch(/^#EXTM3U/)
  })
})

test.describe('xss torrent metadata', () => {
  const s = useServer({ seed: true }, ['xss'])

  test('markup in names survives JSON and streams by encoded path', async () => {
    const { srv } = s
    const t = await waitReady(srv, srv.seed.xss.hash)
    for (const f of t.file_stats) {
      const base = path.posix.basename(f.path)
      const r = await fetch(`${srv.base}/stream/${enc(base)}?link=${srv.seed.xss.hash}&index=${f.id}&play`, {
        headers: { Range: 'bytes=0-3' },
      })
      expect(r.status, base).toBe(206)
      expect(r.headers.get('content-type') || '', `content-type for ${base}`).not.toMatch(/text\/html/)
      await r.arrayBuffer()
    }
  })
})

test.describe('stream URLs built by the UI', () => {
  const s = useServer({ seed: true }, ['show'])
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] })

  test('Copy URL puts a working, correctly encoded stream URL on the clipboard', async ({ page }) => {
    const { srv } = s
    await page.goto(srv.base)
    await openDetails(page, 'Show')
    const copies = page.locator('.ts-details-modal').locator('button[aria-label="Copy URL"]')
    await expect(copies).toHaveCount(3)
    const want = new Set(srv.seed.show.files.map(f => f.sha256))
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => navigator.clipboard.writeText(''))
      await copies.nth(i).click()
      await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toMatch(/^http/)
      const url = await page.evaluate(() => navigator.clipboard.readText())
      const u = new URL(url)
      expect(u.searchParams.has('play'), url).toBe(true)
      expect(u.pathname, `filename is one path segment: ${u.pathname}`).toMatch(/^\/stream\/[^/]+$/)
      expect(u.searchParams.get('link')).toBe(srv.seed.show.hash)
      const r = await fetch(url)
      expect(r.status, url).toBe(200)
      const buf = Buffer.from(await r.arrayBuffer())
      expect(want.has(sha(buf)), `bytes of ${url} match no seeded file`).toBe(true)
    }
  })
})

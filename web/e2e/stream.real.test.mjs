// Streaming over HTTP: bytes, Range, HEAD, playlists, URL encoding.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import { test, before, after, describe } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { skip, sha, enc, startServer, addSeeded, waitReady } from './real-server.mjs'
import { useBrowser, openPage, openDetails } from './real-browser.mjs'

useBrowser()

describe('stream endpoints', { skip }, () => {
  let srv
  let show
  before(async () => {
    srv = await startServer({ seed: true })
    await addSeeded(srv, 'show')
    show = await waitReady(srv, srv.seed.show.hash)
  })
  after(() => srv?.stop())

  test('every file streams byte-identical with encoded names', async () => {
    const entry = srv.seed.show
    for (const f of show.file_stats) {
      const rel = f.path.replace(/^Show\//, '')
      const want = entry.files.find(x => x.path === rel)
      assert.ok(want, `manifest has ${rel}`)
      const base = path.posix.basename(f.path)
      const q = new URLSearchParams({ link: entry.hash, index: String(f.id) })
      const r = await fetch(`${srv.base}/stream/${enc(base)}?${q}&play`)
      assert.equal(r.status, 200, base)
      const buf = Buffer.from(await r.arrayBuffer())
      assert.equal(buf.length, want.size, `${base} length`)
      assert.equal(sha(buf), want.sha256, `${base} bytes`)
    }
  })

  test('Range requests: 206, Content-Range, suffix and open-ended', async () => {
    const f = show.file_stats.find(x => x.path.endsWith('episode1.mkv'))
    const entry = srv.seed.show.files.find(x => x.path.endsWith('episode1.mkv'))
    const full = fs.readFileSync(path.join(srv.seedDir, 'content/show/Show', entry.path))
    const url = `${srv.base}/stream/episode1.mkv?link=${entry.sha256 && srv.seed.show.hash}&index=${f.id}&play`
    for (const [range, from, to] of [
      ['bytes=0-99', 0, 99],
      ['bytes=1000-', 1000, full.length - 1],
      ['bytes=-500', full.length - 500, full.length - 1],
      [`bytes=${full.length - 1}-${full.length + 100}`, full.length - 1, full.length - 1],
    ]) {
      const r = await fetch(url, { headers: { Range: range } })
      assert.equal(r.status, 206, range)
      assert.equal(r.headers.get('content-range'), `bytes ${from}-${to}/${full.length}`, range)
      assert.deepEqual(Buffer.from(await r.arrayBuffer()), full.subarray(from, to + 1), range)
    }
    const bad = await fetch(url, { headers: { Range: `bytes=${full.length + 10}-` } })
    assert.equal(bad.status, 416)
  })

  test('HEAD reports length and accepts ranges without a body', async () => {
    const f = show.file_stats.find(x => x.path.endsWith('episode1.mkv'))
    const r = await fetch(`${srv.base}/stream/episode1.mkv?link=${srv.seed.show.hash}&index=${f.id}&play`, {
      method: 'HEAD',
    })
    assert.equal(r.status, 200)
    assert.equal(r.headers.get('content-length'), '1048576')
    assert.equal(r.headers.get('accept-ranges'), 'bytes')
  })

  test('preload route without a filename answers', async () => {
    const f = show.file_stats[1]
    const r = await fetch(`${srv.base}/stream?link=${srv.seed.show.hash}&index=${f.id}&preload`)
    assert.ok(r.status < 500, `preload ${r.status}`)
    assert.notEqual(r.status, 404)
    await r.arrayBuffer()
  })

  test('failure paths write a status, never an empty 200', async () => {
    const cases = [
      [`/stream/x.mkv?link=${srv.seed.show.hash}&index=999&play`, [404, 400]],
      [`/stream/x.mkv?link=${srv.seed.show.hash}&index=0&play`, [404, 400]],
      [`/stream/x.mkv?link=${srv.seed.show.hash}&index=abc&play`, [400, 404]],
      [`/stream/x.mkv?link=zzzz&index=1&play`, [400, 404]],
      [`/stream/x.mkv?index=1&play`, [400, 404]],
    ]
    for (const [p, ok] of cases) {
      const r = await fetch(srv.base + p)
      const body = await r.arrayBuffer()
      assert.ok(ok.includes(r.status), `${p} -> ${r.status}`)
      assert.ok(!(r.status === 200 && body.byteLength === 0), `${p} empty 200`)
    }
  })

  // B1 (fixed): unknown torrent is 404, malformed hash is 400, not 500.
  test('play with unknown or malformed hash is a 4xx', async () => {
    for (const p of [`/play/${'0'.repeat(40)}/1`, '/play/nothex/1']) {
      const r = await fetch(srv.base + p)
      await r.arrayBuffer()
      assert.ok(r.status >= 400 && r.status < 500, `${p} -> ${r.status}`)
    }
  })

  test('m3u playlists are well formed and filenames are header-safe', async () => {
    const r = await fetch(
      `${srv.base}/stream/${enc('Show [1080p] "x".m3u')}?link=${srv.seed.show.hash}&m3u&fn=file.m3u`,
    )
    assert.equal(r.status, 200)
    const cd = r.headers.get('content-disposition') || ''
    assert.ok(!/[\r\n]/.test(cd))
    const body = await r.text()
    assert.match(body, /^#EXTM3U/)
    const urls = body.split('\n').filter(l => l.startsWith('http'))
    assert.ok(urls.length >= 3, 'playlist lists videos')
    for (const u of urls) {
      const head = await fetch(u, { method: 'HEAD' })
      assert.equal(head.status, 200, u)
    }
    const all = await srv.api('/playlistall/all.m3u')
    assert.equal(all.status, 200)
    assert.match(await all.text(), /^#EXTM3U/)
  })
})

describe('xss torrent metadata', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ seed: true })
    await addSeeded(srv, 'xss')
    await waitReady(srv, srv.seed.xss.hash)
  })
  after(() => srv?.stop())

  test('markup in names survives JSON and streams by encoded path', async () => {
    const t = await waitReady(srv, srv.seed.xss.hash)
    for (const f of t.file_stats) {
      const base = path.posix.basename(f.path)
      const r = await fetch(`${srv.base}/stream/${enc(base)}?link=${srv.seed.xss.hash}&index=${f.id}&play`, {
        headers: { Range: 'bytes=0-3' },
      })
      assert.equal(r.status, 206, base)
      assert.ok(!/text\/html/.test(r.headers.get('content-type') || ''), `content-type for ${base}`)
      await r.arrayBuffer()
    }
  })
})

describe('stream URLs built by the UI', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ seed: true })
    await addSeeded(srv, 'show')
    await waitReady(srv, srv.seed.show.hash)
  })
  after(() => srv?.stop())

  test('Copy URL puts a working, correctly encoded stream URL on the clipboard', async () => {
    const { context, page } = await openPage(srv, { ctx: { permissions: ['clipboard-read', 'clipboard-write'] } })
    await page.goto(srv.base)
    await openDetails(page, 'Show')
    const copies = page.locator('.ts-details-modal').locator('button[aria-label="Copy URL"]')
    const n = await copies.count()
    assert.equal(n, 3)
    const want = new Set(srv.seed.show.files.map(f => f.sha256))
    for (let i = 0; i < n; i++) {
      await copies.nth(i).click()
      await page.waitForTimeout(200)
      const url = await page.evaluate(() => navigator.clipboard.readText())
      const u = new URL(url)
      assert.ok(u.searchParams.has('play'), url)
      assert.ok(/^\/stream\/[^/]+$/.test(u.pathname), `filename is one path segment: ${u.pathname}`)
      assert.equal(u.searchParams.get('link'), srv.seed.show.hash)
      const r = await fetch(url)
      assert.equal(r.status, 200, url)
      const buf = Buffer.from(await r.arrayBuffer())
      assert.ok(want.has(sha(buf)), `bytes of ${url} match no seeded file`)
    }
    await context.close()
  })
})

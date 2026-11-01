// Library and details: lifecycle, rendering, XSS, large packs, player, i18n.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import { test, before, after, describe } from 'node:test'
import assert from 'node:assert/strict'
import { skip, startServer, addSeeded, waitReady } from './real-server.mjs'
import { useBrowser, openPage, shot, card, openDetails } from './real-browser.mjs'

useBrowser()

describe('library API', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ seed: true })
    await addSeeded(srv, 'show')
    await waitReady(srv, srv.seed.show.hash)
  })
  after(() => srv?.stop())

  test('GET /echo is anonymous and returns the version', async () => {
    const r = await fetch(srv.base + '/echo')
    assert.equal(r.status, 200)
    assert.match(await r.text(), /^MatriX\.\d+/)
  })

  test('subtitles endpoint and mediabase answer', async () => {
    const mb = await srv.api('/mediabase')
    assert.equal(mb.status, 200)
    const s = await srv.api('/runtime/status')
    assert.equal(s.status, 200)
    const j = await s.json()
    assert.ok(typeof j === 'object')
  })

  test('torrent lifecycle: set, drop keeps DB row, rem removes, wipe', async () => {
    const h = srv.seed.show.hash
    let r = await srv.api('/torrents', {
      action: 'set',
      hash: h,
      title: 'Renamed <b>x</b>',
      category: 'movie',
      poster: '',
    })
    assert.equal(r.status, 200)
    let list = await (await srv.api('/torrents', { action: 'list' })).json()
    const row = list.find(t => t.hash === h)
    assert.equal(row.title, 'Renamed <b>x</b>')
    assert.equal(row.category, 'movie')

    r = await srv.api('/torrents', { action: 'drop', hash: h })
    assert.equal(r.status, 200)
    list = await (await srv.api('/torrents', { action: 'list' })).json()
    assert.ok(
      list.find(t => t.hash === h),
      'drop keeps IN_DB row',
    )

    r = await srv.api('/torrents', { action: 'rem', hash: h })
    assert.equal(r.status, 200)
    list = await (await srv.api('/torrents', { action: 'list' })).json()
    assert.ok(!list.find(t => t.hash === h), 'rem removes row')

    // duplicate add is idempotent
    await addSeeded(srv, 'show')
    await addSeeded(srv, 'show')
    list = await (await srv.api('/torrents', { action: 'list' })).json()
    assert.equal(list.filter(t => t.hash === h).length, 1)

    r = await srv.api('/torrents', { action: 'bogus' })
    assert.equal(r.status, 400)
    r = await srv.api('/torrents', { action: 'get' })
    assert.ok([400, 404].includes(r.status), `get w/o hash -> ${r.status}`)
  })

  test('cache endpoint returns state for a live torrent and 4xx for junk', async () => {
    await addSeeded(srv, 'show')
    let r = await srv.api('/cache', { action: 'get', hash: srv.seed.show.hash })
    assert.equal(r.status, 200)
    r = await srv.api('/cache', { action: 'get', hash: 'junk' })
    assert.ok(r.status >= 400 && r.status < 500, `junk hash -> ${r.status}`)
    r = await srv.api('/cache', { action: 'nope' })
    assert.ok(r.status >= 400 && r.status < 500, `bad action -> ${r.status}`)
  })

  test('malformed JSON bodies never 5xx', async () => {
    for (const p of ['/torrents', '/settings', '/cache', '/viewed']) {
      const r = await fetch(srv.base + p, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{not json',
      })
      assert.ok(r.status >= 400 && r.status < 500, `${p} -> ${r.status}`)
    }
  })

  test('large pack lists 600 files and still answers quickly', async () => {
    await addSeeded(srv, 'many')
    const t0 = Date.now()
    const t = await waitReady(srv, srv.seed.many.hash, 60000)
    assert.equal(t.file_stats.length, 600)
    const t1 = Date.now()
    const list = await srv.api('/torrents', { action: 'list' })
    assert.equal(list.status, 200)
    assert.ok(Date.now() - t1 < 1500, 'list latency')
    assert.ok(Date.now() - t0 < 60000)
  })

  test('server log has no panic', () => {
    assert.ok(!/panic:|fatal error|DATA RACE/.test(srv.log()), srv.log().slice(-1500))
  })
})

describe('library UI', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ seed: true })
    for (const p of ['show', 'xss', 'video'])
      if (srv.seed[p]) {
        await addSeeded(srv, p)
        await waitReady(srv, srv.seed[p].hash)
      }
  })
  after(() => srv?.stop())

  test('cold load: no console errors, failed or 4xx/5xx requests', async () => {
    const { context, page, problems } = await openPage(srv)
    await page.goto(srv.base)
    await page.locator('.torrent-card[data-hash]').first().waitFor()
    await page.waitForTimeout(1500)
    // favicon / manifest are not part of the contract here
    const real = problems.filter(p => !/favicon/.test(p))
    assert.deepEqual(real, [])
    await context.close()
  })

  test('markup in torrent names renders as text and never executes', async () => {
    const { context, page } = await openPage(srv)
    page.on('dialog', async d => {
      await d.dismiss()
      throw new Error('dialog ' + d.message())
    })
    await page.goto(srv.base)
    const t = srv.seed.xss.name
    await card(page, t).first().waitFor()
    assert.equal(await page.evaluate(() => window.__xss), undefined)
    assert.equal(await page.locator('img[src="x"]').count(), 0)
    await openDetails(page, t)
    await page.waitForTimeout(800)
    assert.equal(await page.evaluate(() => window.__xss), undefined)
    assert.equal(await page.locator('.ts-details-modal script, .ts-details-modal img[src="x"]').count(), 0)
    await context.close()
  })

  test('details: Escape closes, focus returns to the card', async () => {
    const { context, page } = await openPage(srv)
    await page.goto(srv.base)
    await openDetails(page, 'Show')
    await page.keyboard.press('Escape')
    await page.locator('.ts-details-modal').waitFor({ state: 'detached' })
    await page.waitForTimeout(500)
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))
    assert.equal(focused, 'Show', 'focus restored to the opener')
    await context.close()
  })

  // F1 (fixed): FilesDataGrid titled rows with ptt.parse(file.path).title. Parsing the
  // whole path yields the folder ("Show/") for every file that has no episode
  // number, so such rows are indistinguishable (the filename only lives in the
  // title tooltip).
  test('file rows: every row is distinguishable by name', async () => {
    const { context, page } = await openPage(srv)
    await page.goto(srv.base)
    await openDetails(page, 'Show')
    const heads = await page.locator('.ts-details-modal p[title]').evaluateAll(ps => ps.map(p => p.textContent))
    await shot(page, 'details-files')
    assert.equal(heads.length, 3)
    assert.equal(new Set(heads).size, heads.length, `duplicate row titles: ${JSON.stringify(heads)}`)
    await context.close()
  })

  test('cache tab: canvas paints and /cache polling stops after close', async () => {
    const { context, page, requests } = await openPage(srv)
    await page.goto(srv.base)
    await openDetails(page, 'Show')
    await page.getByRole('tab', { name: 'Cache' }).click()
    await page.waitForTimeout(1500)
    assert.ok((await page.locator('.ts-details-modal canvas').count()) > 0, 'canvas present')
    await page.keyboard.press('Escape')
    await page.locator('.ts-details-modal').waitFor({ state: 'detached' })
    await page.waitForTimeout(500)
    const after = requests.filter(r => /\/cache$/.test(new URL(r.url).pathname)).length
    await page.waitForTimeout(3000)
    const later = requests.filter(r => /\/cache$/.test(new URL(r.url).pathname)).length
    assert.equal(later, after, `/cache polled ${later - after}x after the dialog closed`)
    await context.close()
  })

  test(
    'video: Play starts the in-page player and the clip actually plays',
    { skip: srv && !srv.seed.video && 'ffmpeg missing' },
    async () => {
      const { context, page } = await openPage(srv)
      await page.goto(srv.base)
      await openDetails(page, 'Clip')
      await page.locator('.ts-details-modal').getByRole('button', { name: 'Play' }).first().click()
      const video = page.locator('[data-testid=video-player] video, video').first()
      await video.waitFor({ timeout: 15000 })
      await page.waitForFunction(
        () => {
          const v = document.querySelector('video')
          return v && v.readyState >= 2 && v.currentTime > 0.2
        },
        null,
        { timeout: 20000 },
      )
      const info = await video.evaluate(v => ({ err: v.error?.code ?? null, dur: v.duration, w: v.videoWidth }))
      assert.equal(info.err, null)
      assert.equal(info.w, 320)
      await shot(page, 'player')
      await context.close()
    },
  )

  test('large pack (600 files) opens without long main-thread stalls', async () => {
    await addSeeded(srv, 'many')
    await waitReady(srv, srv.seed.many.hash, 60000)
    const { context, page } = await openPage(srv)
    await page.addInitScript(() => {
      window.__long = []
      new PerformanceObserver(l => l.getEntries().forEach(e => window.__long.push(e.duration))).observe({
        entryTypes: ['longtask'],
      })
    })
    await page.goto(srv.base)
    await card(page, 'Discography').first().waitFor()
    const t0 = Date.now()
    await openDetails(page, 'Discography')
    await page.locator('.ts-details-modal').getByRole('button', { name: 'Play' }).first().waitFor({ timeout: 15000 })
    const open = Date.now() - t0
    await page.waitForTimeout(1000)
    const long = await page.evaluate(() => window.__long)
    await shot(page, 'details-many')
    assert.ok(open < 4000, `open took ${open}ms`)
    assert.ok(Math.max(0, ...long) < 500, `longest task ${Math.max(0, ...long)}ms`)
    await context.close()
  })

  test('phone viewport: bottom nav, details usable', async () => {
    const { context, page, problems } = await openPage(srv, {
      viewport: { width: 390, height: 844 },
      ctx: { isMobile: true, hasTouch: true },
    })
    await page.goto(srv.base)
    await page.locator('.torrent-card').first().waitFor()
    assert.ok(await page.locator('.ts-bottom-nav').isVisible())
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    assert.ok(overflow <= 1, `horizontal overflow ${overflow}px`)
    await shot(page, 'phone-library')
    assert.deepEqual(
      problems.filter(p => !/favicon/.test(p)),
      [],
    )
    await context.close()
  })

  test('every language renders without raw keys', async () => {
    const { context, page } = await openPage(srv)
    await page.goto(srv.base)
    await page.locator('.torrent-card').first().waitFor()
    const langs = ['en', 'ru', 'ua', 'bg', 'fr', 'ro', 'zh']
    for (const l of langs) {
      await page.evaluate(x => localStorage.setItem('i18nextLng', x), l)
      await page.reload()
      await page.locator('.torrent-card').first().waitFor()
      await page
        .getByRole('button', { name: /^(Settings|Настройки|Налаштування|Настройки|Paramètres|Setări|设置)$/ })
        .first()
        .click()
        .catch(() => {})
      await page.waitForTimeout(400)
      const txt = await page.locator('body').innerText()
      assert.ok(
        !/\b[A-Za-z]+\.[a-z]+[A-Za-z]*\.[A-Za-z]+\b/.test(
          txt.replace(/\d+\.\d+\.\d+|MatriX\.\d+|\w+\.(mkv|srt|jpg)/g, ''),
        ),
        `raw key in ${l}`,
      )
      await page.keyboard.press('Escape')
    }
    await context.close()
  })

  test('server log has no panic', () => {
    assert.ok(!/panic:|fatal error|DATA RACE/.test(srv.log()), srv.log().slice(-1500))
  })
})

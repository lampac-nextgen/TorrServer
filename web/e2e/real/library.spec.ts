// Library and details: lifecycle, rendering, XSS, large packs, player, i18n.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import { addSeeded, waitReady } from '../fixtures/server'
import { card, detailsModal, expectNoNestedInteractive, openDetails } from '../fixtures/helpers'
import { expect, expectCleanLog, requireBinaries, test, useServer } from '../fixtures/test'

requireBinaries()

interface Row {
  hash: string
  title: string
  category: string
}

test.describe('library API', () => {
  const s = useServer({ seed: true }, ['show'])
  const list = async () => (await (await s.srv.api('/torrents', { action: 'list' })).json()) as Row[]

  test('GET /echo is anonymous and returns the version', async () => {
    const r = await fetch(s.srv.base + '/echo')
    expect(r.status).toBe(200)
    expect(await r.text()).toMatch(/^(NextGen|MatriX)\.\d+/)
  })

  test('mediabase and runtime status answer', async () => {
    expect((await s.srv.api('/mediabase')).status).toBe(200)
    const st = await s.srv.api('/runtime/status')
    expect(st.status).toBe(200)
    expect(typeof (await st.json())).toBe('object')
  })

  test('torrent lifecycle: set, drop keeps DB row, rem removes, wipe', async () => {
    const { srv } = s
    const h = srv.seed.show.hash
    let r = await srv.api('/torrents', {
      action: 'set',
      hash: h,
      title: 'Renamed <b>x</b>',
      category: 'movie',
      poster: '',
    })
    expect(r.status).toBe(200)
    const row = (await list()).find(t => t.hash === h)
    expect(row?.title).toBe('Renamed <b>x</b>')
    expect(row?.category).toBe('movie')

    r = await srv.api('/torrents', { action: 'drop', hash: h })
    expect(r.status).toBe(200)
    expect(
      (await list()).find(t => t.hash === h),
      'drop keeps IN_DB row',
    ).toBeTruthy()

    r = await srv.api('/torrents', { action: 'rem', hash: h })
    expect(r.status).toBe(200)
    expect(
      (await list()).find(t => t.hash === h),
      'rem removes row',
    ).toBeUndefined()

    // duplicate add is idempotent
    await addSeeded(srv, 'show')
    await addSeeded(srv, 'show')
    expect((await list()).filter(t => t.hash === h)).toHaveLength(1)

    r = await srv.api('/torrents', { action: 'bogus' })
    expect(r.status).toBe(400)
    r = await srv.api('/torrents', { action: 'get' })
    expect([400, 404], `get w/o hash -> ${r.status}`).toContain(r.status)
  })

  test('cache endpoint returns state for a live torrent and 4xx for junk', async () => {
    const { srv } = s
    await addSeeded(srv, 'show')
    let r = await srv.api('/cache', { action: 'get', hash: srv.seed.show.hash })
    expect(r.status).toBe(200)
    r = await srv.api('/cache', { action: 'get', hash: 'junk' })
    expect(r.status, `junk hash -> ${r.status}`).toBeGreaterThanOrEqual(400)
    expect(r.status).toBeLessThan(500)
    r = await srv.api('/cache', { action: 'nope' })
    expect(r.status, `bad action -> ${r.status}`).toBeGreaterThanOrEqual(400)
    expect(r.status).toBeLessThan(500)
  })

  test('malformed JSON bodies never 5xx', async () => {
    for (const p of ['/torrents', '/settings', '/cache', '/viewed']) {
      const r = await fetch(s.srv.base + p, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{not json',
      })
      expect(r.status, `${p} -> ${r.status}`).toBeGreaterThanOrEqual(400)
      expect(r.status, `${p} -> ${r.status}`).toBeLessThan(500)
    }
  })

  test('large pack lists 600 files and still answers quickly', async () => {
    const { srv } = s
    await addSeeded(srv, 'many')
    const t = await waitReady(srv, srv.seed.many.hash, 60000)
    expect(t.file_stats).toHaveLength(600)
    const t1 = Date.now()
    const r = await srv.api('/torrents', { action: 'list' })
    expect(r.status).toBe(200)
    expect(Date.now() - t1, 'list latency').toBeLessThan(1500)
  })

  test('server log has no panic', () => expectCleanLog(s.srv))
})

test.describe('library UI', () => {
  const s = useServer({ seed: true }, ['show', 'xss', 'video'])

  test('cold load: no console errors, failed or 4xx/5xx requests', async ({ page, tracker }) => {
    await page.goto(s.srv.base)
    await expect(page.locator('.torrent-card[data-hash]').first()).toBeVisible()
    await page.waitForLoadState('networkidle')
    expect(tracker.problems).toEqual([])
    await expectNoNestedInteractive(page)
  })

  test('markup in torrent names renders as text and never executes', async ({ page }) => {
    page.on('dialog', async d => {
      await d.dismiss()
      throw new Error('dialog ' + d.message())
    })
    await page.goto(s.srv.base)
    const t = s.srv.seed.xss.name
    await expect(card(page, t).first()).toBeVisible()
    expect(await page.evaluate(() => (window as unknown as { __xss?: unknown }).__xss)).toBeUndefined()
    await expect(page.locator('img[src="x"]')).toHaveCount(0)
    await openDetails(page, t)
    await page.waitForLoadState('networkidle')
    expect(await page.evaluate(() => (window as unknown as { __xss?: unknown }).__xss)).toBeUndefined()
    await expect(page.locator('.ts-details-modal script, .ts-details-modal img[src="x"]')).toHaveCount(0)
  })

  test('details: Escape closes, focus returns to the card', async ({ page }) => {
    await page.goto(s.srv.base)
    await openDetails(page, 'Show')
    await page.keyboard.press('Escape')
    await expect(detailsModal(page)).toHaveCount(0)
    await expect
      .poll(
        () => page.evaluate(() => document.activeElement?.getAttribute('aria-label')),
        'focus restored to the opener',
      )
      .toBe('Show')
  })

  // F1 (fixed): FilesDataGrid titled rows with ptt.parse(file.path).title. Parsing the
  // whole path yields the folder ("Show/") for every file that has no episode
  // number, so such rows are indistinguishable (the filename only lives in the
  // title tooltip).
  test('file rows: every row is distinguishable by name', async ({ page }) => {
    await page.goto(s.srv.base)
    await openDetails(page, 'Show')
    await expect(detailsModal(page).locator('p[title]')).toHaveCount(3)
    const heads = await detailsModal(page)
      .locator('p[title]')
      .evaluateAll(ps => ps.map(p => p.textContent))
    expect(new Set(heads).size, `duplicate row titles: ${JSON.stringify(heads)}`).toBe(heads.length)
  })

  test('cache tab: canvas paints and /cache polling stops after close', async ({ page, tracker }) => {
    await page.goto(s.srv.base)
    await openDetails(page, 'Show')
    await page.getByRole('tab', { name: 'Cache' }).click()
    await expect(detailsModal(page).locator('canvas').first()).toBeAttached()
    await expect.poll(() => tracker.count('/cache'), 'cache polled while open').toBeGreaterThan(1)
    await page.keyboard.press('Escape')
    await expect(detailsModal(page)).toHaveCount(0)
    // Absence check: let any in-flight request land, then watch a quiet window.
    await page.waitForTimeout(500)
    const after = tracker.count('/cache')
    await page.waitForTimeout(3000)
    expect(tracker.count('/cache') - after, 'requests after the dialog closed').toBe(0)
  })

  test('video: Play starts the in-page player and the clip actually plays', async ({ page }) => {
    test.skip(!s.srv.seed.video, 'ffmpeg missing')
    await page.goto(s.srv.base)
    await openDetails(page, 'Clip')
    await detailsModal(page).getByRole('button', { name: 'Play' }).first().click()
    const video = page.locator('[data-testid=video-player] video, video').first()
    await expect(video).toBeVisible()
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState >= 2 && v.currentTime > 0.2), {
        timeout: 20_000,
      })
      .toBe(true)
    const info = await video.evaluate((v: HTMLVideoElement) => ({ err: v.error?.code ?? null, w: v.videoWidth }))
    expect(info.err).toBeNull()
    expect(info.w).toBe(320)
  })

  // F2 (fixed): FilesDataGrid mounts rows in pages of FILE_ROWS_PAGE; mounting all 600 at once
  // blocked the main thread for ~350ms on a laptop and 1.5-2s on a CI runner.
  test('large pack (600 files) opens without long main-thread stalls', async ({ page }) => {
    await addSeeded(s.srv, 'many')
    await waitReady(s.srv, s.srv.seed.many.hash, 60000)
    await page.addInitScript(() => {
      const w = window as unknown as { __long: number[] }
      w.__long = []
      new PerformanceObserver(l => l.getEntries().forEach(e => w.__long.push(e.duration))).observe({
        entryTypes: ['longtask'],
      })
    })
    await page.goto(s.srv.base)
    await expect(card(page, 'Discography').first()).toBeVisible()
    const t0 = Date.now()
    await openDetails(page, 'Discography')
    await expect(detailsModal(page).getByRole('button', { name: 'Play' }).first()).toBeVisible({ timeout: 15_000 })
    const open = Date.now() - t0
    // Observation window for long tasks that follow the first paint.
    await page.waitForTimeout(1000)
    const long = await page.evaluate(() => (window as unknown as { __long: number[] }).__long)
    // Wall-clock bound is generous: shared CI runners are 2-3x slower than a laptop (4.4s seen).
    expect(open, `open took ${open}ms`).toBeLessThan(10_000)
    expect(Math.max(0, ...long), 'longest task').toBeLessThan(500)
  })

  test.describe('phone', () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

    test('bottom nav, details usable', async ({ page, tracker }) => {
      await page.goto(s.srv.base)
      await expect(page.locator('.torrent-card').first()).toBeVisible()
      await expect(page.locator('.ts-bottom-nav')).toBeVisible()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow, `horizontal overflow ${overflow}px`).toBeLessThanOrEqual(1)
      expect(tracker.problems).toEqual([])
    })
  })

  test('every language renders without raw keys', async ({ page }) => {
    await page.goto(s.srv.base)
    await expect(page.locator('.torrent-card').first()).toBeVisible()
    for (const l of ['en', 'ru', 'ua', 'bg', 'fr', 'ro', 'zh']) {
      await page.evaluate(x => localStorage.setItem('i18nextLng', x), l)
      await page.reload()
      await expect(page.locator('.torrent-card').first()).toBeVisible()
      await page
        .getByRole('button', { name: /^(Settings|Настройки|Налаштування|Paramètres|Setări|设置)$/ })
        .first()
        .click({ timeout: 3000 })
        .catch(() => {})
      await expect(page.getByRole('dialog'))
        .toBeVisible({ timeout: 3000 })
        .catch(() => {})
      const txt = await page.locator('body').innerText()
      expect(txt.replace(/\d+\.\d+\.\d+|(NextGen|MatriX)\.\d+|\w+\.(mkv|srt|jpg)/g, ''), `raw key in ${l}`).not.toMatch(
        /\b[A-Za-z]+\.[a-z]+[A-Za-z]*\.[A-Za-z]+\b/,
      )
      await page.keyboard.press('Escape')
    }
  })

  test('server log has no panic', () => expectCleanLog(s.srv))
})

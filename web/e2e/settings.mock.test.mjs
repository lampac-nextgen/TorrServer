import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

import { HASH, installMocks } from './fixtures.mjs'
import { embedPagesRoot, serveEmbedDir } from './static-server.mjs'

let server
let origin
let browser

before(async () => {
  ; ({ server, origin } = await serveEmbedDir(embedPagesRoot()))
  browser = await chromium.launch({ headless: true })
})

after(async () => {
  await browser?.close()
  await new Promise(resolve => server?.close(resolve))
})

async function newPage(opts = {}) {
  const viewport = opts.viewport || { width: 1440, height: 900 }
  const context = await browser.newContext({
    locale: 'en-US',
    viewport,
    extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' },
  })
  const page = await context.newPage()
  await installMocks(page, { requireAuth: opts.requireAuth })
  return { context, page }
}

function settingsDialog(page) {
  return page.locator('.modal__dialog').filter({ has: page.getByRole('heading', { name: 'Settings' }) })
}

async function openSettings(page, { phone = false } = {}) {
  if (phone) {
    await page.locator('.ts-bottom-nav').getByRole('button', { name: 'More' }).click()
    await page.locator('.ts-sheet-modal').getByRole('button', { name: 'Settings' }).click()
  } else {
    await page.getByRole('button', { name: 'Settings' }).first().click()
  }
  await page.getByRole('heading', { name: 'Settings' }).waitFor({ timeout: 20_000 })
  await page.waitForTimeout(400)
}

async function assertNoHorizontalOverflow(locator, label) {
  const metrics = await locator.evaluate(el => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }))
  assert.ok(
    metrics.scrollWidth <= metrics.clientWidth + 1,
    `${label} overflows: scrollWidth=${metrics.scrollWidth} clientWidth=${metrics.clientWidth}`,
  )
}

async function assertBoxInViewport(page, locator, label) {
  const box = await locator.boundingBox()
  const vp = page.viewportSize()
  assert.ok(box, `${label}: bounding box missing`)
  assert.ok(vp, `${label}: viewport missing`)
  assert.ok(box.x >= -1, `${label}: left ${box.x}`)
  assert.ok(box.y >= -1, `${label}: top ${box.y}`)
  assert.ok(box.x + box.width <= vp.width + 1, `${label}: right ${box.x + box.width} > ${vp.width}`)
  assert.ok(box.y + box.height <= vp.height + 1, `${label}: bottom ${box.y + box.height} > ${vp.height}`)
}

async function assertDialogCentered(page, locator, { maxOff = 48 } = {}) {
  const box = await locator.boundingBox()
  const vp = page.viewportSize()
  assert.ok(box, 'dialog bounding box missing')
  assert.ok(vp, 'viewport missing')
  const cx = box.x + box.width / 2
  const cy = box.y + box.height / 2
  assert.ok(
    Math.abs(cx - vp.width / 2) <= maxOff,
    `dialog x-center ${cx.toFixed(1)} vs viewport ${vp.width / 2} (maxOff ${maxOff})`,
  )
  assert.ok(
    Math.abs(cy - vp.height / 2) <= maxOff,
    `dialog y-center ${cy.toFixed(1)} vs viewport ${vp.height / 2} (maxOff ${maxOff})`,
  )
}

test('mocked library shows torrent card and no Quick-VLC', { timeout: 45_000 }, async () => {
  const { context, page } = await newPage()
  try {
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' })
    await page.locator(`.torrent-card[data-hash="${HASH}"]`).waitFor({ timeout: 20_000 })
    const text = await page.locator('body').innerText()
    assert.equal(/quick\s*vlc/i.test(text), false)
  } finally {
    await context.close()
  }
})

test('mocked login form appears when torrents API returns 401', { timeout: 45_000 }, async () => {
  const { context, page } = await newPage({ requireAuth: true })
  try {
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' })
    await page.locator('input[name="username"]').waitFor({ timeout: 20_000 })
    await page.locator('input[name="username"]').fill('audit')
    await page.locator('input[name="password"]').fill('auditpass')
    await page.getByRole('button', { name: 'Sign in' }).click()
    await page.locator(`.torrent-card[data-hash="${HASH}"]`).waitFor({ timeout: 20_000 })
  } finally {
    await context.close()
  }
})

test('mocked Settings Access / Network / MCP / Torznab', { timeout: 60_000 }, async () => {
  const { context, page } = await newPage()
  try {
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' })
    await page.getByRole('button', { name: 'Settings' }).first().waitFor({ timeout: 20_000 })
    await page.getByRole('button', { name: 'Settings' }).first().click()
    await page.getByRole('heading', { name: 'Settings' }).waitFor()

    const tab = name => page.getByRole('tab', { name })
    const clickTab = async name => {
      await tab(name).first().click()
      await page.waitForTimeout(400)
    }

    await clickTab('Access')
    await page.getByLabel('IP whitelist').waitFor({ timeout: 15_000 })
    await page.getByLabel('IP blacklist').fill('203.0.113.8')
    await page.getByRole('button', { name: 'Save access lists' }).click()
    await page.getByText('Access lists saved and reloaded').waitFor({ timeout: 10_000 })

    await clickTab('Network')
    const trackersUrl = await page.getByLabel('Custom remote trackers list URL').inputValue()
    assert.equal(trackersUrl.includes('example.test'), true)

    await clickTab('Torznab')
    await page.getByText('JacRed').first().waitFor({ timeout: 10_000 })
    await page.getByText('https://jacred.stream', { exact: false }).waitFor()
    await page.getByText('2000').first().waitFor()

    await clickTab('Advanced')
    await page.getByText('MCP', { exact: true }).first().waitFor()
    await page.getByRole('button', { name: 'Copy MCP URL' }).waitFor()

    await clickTab('Application')
    await page.getByText('Prompt to open video in VLC').waitFor()
  } finally {
    await context.close()
  }
})

test('library header Select / Cancel are icon-only', { timeout: 45_000 }, async () => {
  const { context, page } = await newPage()
  try {
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' })
    await page.locator(`.torrent-card[data-hash="${HASH}"]`).waitFor({ timeout: 20_000 })
    const select = page.getByRole('button', { name: 'Select' })
    await select.waitFor()
    assert.equal((await select.innerText()).trim(), '')
    await select.click()
    const cancel = page.getByRole('button', { name: 'Cancel' })
    await cancel.waitFor()
    assert.equal((await cancel.innerText()).trim(), '')
    await cancel.click()
    await page.getByRole('button', { name: 'Select' }).waitFor()
  } finally {
    await context.close()
  }
})

test('phone chrome: bottom nav, header search, appearance overflow', { timeout: 45_000 }, async () => {
  const { context, page } = await newPage({ viewport: { width: 390, height: 844 } })
  try {
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' })
    await page.locator(`.torrent-card[data-hash="${HASH}"]`).waitFor({ timeout: 20_000 })
    await page.locator('.ts-bottom-nav').waitFor()
    assert.equal(await page.getByRole('button', { name: 'Collapse sidebar' }).count(), 0)
    assert.equal(await page.locator('header').getByText('MatriX.147').count(), 0)

    await assertNoHorizontalOverflow(page.locator('header'), 'header')
    await assertNoHorizontalOverflow(page.locator('.ts-bottom-nav'), 'bottom nav')

    const headerBtns = [
      ['filter', page.getByPlaceholder('Filter library')],
      ['select', page.locator('header [data-slot="button"][aria-label="Select"]')],
      ['collections', page.locator('header [data-slot="button"][aria-label="All"]')],
      ['sort', page.locator('header [data-slot="button"][aria-label="Sort by name"]')],
      ['appearance', page.locator('header [data-slot="button"][aria-label="More"]')],
    ]
    for (const [label, loc] of headerBtns) {
      await loc.waitFor()
      await assertBoxInViewport(page, loc, `header ${label}`)
    }

    const nav = page.locator('.ts-bottom-nav')
    for (const name of ['Add', 'Search', 'Category', 'More']) {
      const tab = nav.getByRole('button', { name })
      await tab.waitFor()
      await assertBoxInViewport(page, tab, `nav ${name}`)
    }
    assert.equal(await page.locator('header').getByLabel(/Theme:/).count(), 0)

    const vp = page.viewportSize()
    const cardBoxes = await page.locator('.torrent-card').evaluateAll(els =>
      els.map(el => {
        const r = el.getBoundingClientRect()
        return { x: Math.round(r.x), right: r.right }
      }),
    )
    assert.ok(cardBoxes.length >= 2, `expected several poster cards, got ${cardBoxes.length}`)
    for (const card of cardBoxes) {
      assert.ok(card.right <= vp.width + 1, `poster overflows viewport: right=${card.right} vp=${vp.width}`)
    }
    const columns = new Set(cardBoxes.map(card => card.x))
    assert.ok(columns.size <= 2, `phone library should be 2 columns, got ${columns.size}: ${[...columns]}`)

    await page.addStyleTag({ content: '.ts-bottom-nav { padding-bottom: 34px !important; }' })
    await assertBoxInViewport(page, nav.getByRole('button', { name: 'More' }), 'nav More with safe-area')

    await openSettings(page, { phone: true })
    const dialog = settingsDialog(page)
    await dialog.waitFor()
    const box = await dialog.boundingBox()
    assert.ok(box && vp)
    assert.ok(box.width >= vp.width * 0.9, `phone settings should be near-fullscreen, width=${box.width}`)
    await assertDialogCentered(page, dialog)
  } finally {
    await context.close()
  }
})

test('tablet chrome: sidebar, no bottom nav, settings centered', { timeout: 45_000 }, async () => {
  const { context, page } = await newPage({ viewport: { width: 768, height: 1024 } })
  try {
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' })
    await page.locator(`.torrent-card[data-hash="${HASH}"]`).waitFor({ timeout: 20_000 })
    assert.equal(await page.locator('.ts-bottom-nav').count(), 0)
    await page.getByLabel('Collapse sidebar').waitFor()
    await openSettings(page)
    const dialog = settingsDialog(page)
    await dialog.waitFor()
    await assertDialogCentered(page, dialog)
  } finally {
    await context.close()
  }
})

test('desktop chrome: appearance in header, settings is a centered card', { timeout: 45_000 }, async () => {
  const { context, page } = await newPage({ viewport: { width: 1440, height: 900 } })
  try {
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' })
    await page.locator(`.torrent-card[data-hash="${HASH}"]`).waitFor({ timeout: 20_000 })
    await page.locator('header').getByText('MatriX.147').waitFor()
    await page.getByLabel(/Theme:/).waitFor()
    await page.getByLabel(/Palette:/).waitFor()
    await page.getByLabel('Language').waitFor()
    await openSettings(page)
    const dialog = settingsDialog(page)
    await dialog.waitFor()
    const box = await dialog.boundingBox()
    const vp = page.viewportSize()
    assert.ok(box && vp)
    assert.ok(box.width < vp.width * 0.9, `desktop settings should be a card, width=${box.width}`)
    await assertDialogCentered(page, dialog)
  } finally {
    await context.close()
  }
})

test('mocked player download button and seek hotkeys', { timeout: 45_000 }, async () => {
  const { context, page } = await newPage()
  const mp4 = readFileSync(fileURLToPath(new URL('./silent.mp4', import.meta.url)))
  await page.route('**/stream/**', async route => {
    const range = route.request().headers().range
    const match = range && /bytes=(\d+)-(\d*)/.exec(range)
    if (match) {
      const start = Number(match[1])
      const end = match[2] ? Number(match[2]) : mp4.length - 1
      await route.fulfill({
        status: 206,
        contentType: 'video/mp4',
        headers: {
          'Accept-Ranges': 'bytes',
          'Content-Range': `bytes ${start}-${end}/${mp4.length}`,
          'Content-Length': String(end - start + 1),
        },
        body: mp4.subarray(start, end + 1),
      })
      return
    }
    await route.fulfill({
      status: 200,
      contentType: 'video/mp4',
      headers: { 'Accept-Ranges': 'bytes', 'Content-Length': String(mp4.length) },
      body: mp4,
    })
  })
  try {
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' })
    const card = page.locator(`.torrent-card[data-hash="${HASH}"]`)
    await card.waitFor({ timeout: 20_000 })
    await card.hover()
    await card.locator('button[aria-label="Play"]').click()

    const video = page.locator('media-controller video')
    await video.waitFor({ timeout: 20_000 })
    await page.waitForFunction(() => {
      const node = document.querySelector('media-controller video')
      return node instanceof HTMLVideoElement && node.readyState >= 1 && Number.isFinite(node.duration)
    })
    await page.locator('media-controller').hover()
    const download = page.getByRole('button', { name: 'Download' })
    await download.waitFor()

    const downloadPromise = page.waitForEvent('download')
    await download.click()
    const file = await downloadPromise
    assert.ok(file.suggestedFilename().length > 0)

    const before = await page.evaluate(() => {
      const node = document.querySelector('media-controller video')
      if (!(node instanceof HTMLVideoElement)) throw new Error('video missing')
      node.pause()
      const active = document.activeElement
      if (active instanceof HTMLElement) active.blur()
      node.currentTime = 1
      return {
        duration: node.duration,
        readyState: node.readyState,
        currentTime: node.currentTime,
        seekable: node.seekable.length ? node.seekable.end(0) : 0,
      }
    })
    assert.ok(before.duration > 12, `video not seekable: ${JSON.stringify(before)}`)
    await page.waitForFunction(() => {
      const node = document.querySelector('media-controller video')
      return node instanceof HTMLVideoElement && node.currentTime >= 0.5
    })
    await page.keyboard.press('ArrowRight')
    const afterSeek = await page.evaluate(() => {
      const node = document.querySelector('media-controller video')
      return node instanceof HTMLVideoElement ? node.currentTime : -1
    })
    assert.ok(Math.abs(afterSeek - 11) < 0.6, `expected ~11s after ArrowRight, got ${afterSeek}`)

    await page.keyboard.press(' ')
    const playing = await page.evaluate(() => {
      const node = document.querySelector('media-controller video')
      return node instanceof HTMLVideoElement ? !node.paused : false
    })
    assert.equal(playing, true)
  } finally {
    await context.close()
  }
})

import type { Locator, Page, Route } from '@playwright/test'
import { test as base, expect } from '@playwright/test'

import { embedPagesRoot, serveEmbedDir } from '../fixtures/static-server'
import { HASH, fixtureSettings, installMocks } from '../fixtures/mocks'

const test = base.extend<{ requireAuth: boolean; mockApi: void }, { origin: string }>({
  origin: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const { server, origin } = await serveEmbedDir(embedPagesRoot())
      await use(origin)
      await new Promise(resolve => server.close(resolve))
    },
    { scope: 'worker' },
  ],
  baseURL: async ({ origin }, use) => use(origin),
  requireAuth: [false, { option: true }],
  mockApi: [
    async ({ page, requireAuth }, use) => {
      await installMocks(page, { requireAuth })
      await use()
    },
    { auto: true },
  ],
})

const libraryCard = (page: Page) => page.locator(`.torrent-card[data-hash="${HASH}"]`)
const settingsDialog = (page: Page) =>
  page.locator('.modal__dialog').filter({ has: page.getByRole('heading', { name: 'Settings' }) })
const saveButton = (page: Page) => settingsDialog(page).getByRole('button', { name: 'Save', exact: true })

async function openSettings(page: Page, { phone = false } = {}) {
  if (phone) {
    await page.locator('.ts-bottom-nav').getByRole('button', { name: 'More' }).click()
    await page.locator('.ts-sheet-modal').getByRole('button', { name: 'Settings' }).click()
  } else {
    await page.getByRole('button', { name: 'Settings' }).first().click()
  }
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible({ timeout: 20_000 })
}

async function assertNoHorizontalOverflow(locator: Locator, label: string) {
  const m = await locator.evaluate(el => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }))
  expect(m.scrollWidth, `${label} overflows`).toBeLessThanOrEqual(m.clientWidth + 1)
}

async function assertBoxInViewport(page: Page, locator: Locator, label: string) {
  const box = await locator.boundingBox()
  const vp = page.viewportSize()
  expect(box, `${label}: bounding box`).toBeTruthy()
  expect(vp, `${label}: viewport`).toBeTruthy()
  expect(box!.x, `${label}: left`).toBeGreaterThanOrEqual(-1)
  expect(box!.y, `${label}: top`).toBeGreaterThanOrEqual(-1)
  expect(box!.x + box!.width, `${label}: right`).toBeLessThanOrEqual(vp!.width + 1)
  expect(box!.y + box!.height, `${label}: bottom`).toBeLessThanOrEqual(vp!.height + 1)
}

async function assertDialogCentered(page: Page, locator: Locator, maxOff = 48) {
  const box = (await locator.boundingBox())!
  const vp = page.viewportSize()!
  expect(Math.abs(box.x + box.width / 2 - vp.width / 2), 'dialog x-center').toBeLessThanOrEqual(maxOff)
  expect(Math.abs(box.y + box.height / 2 - vp.height / 2), 'dialog y-center').toBeLessThanOrEqual(maxOff)
}

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
})

test.describe('library', () => {
  test('shows torrent card and no Quick-VLC', async ({ page }) => {
    await expect(libraryCard(page)).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('body')).not.toContainText(/quick\s*vlc/i)
  })

  test('Select / Cancel are icon-only', async ({ page }) => {
    await expect(libraryCard(page)).toBeVisible({ timeout: 20_000 })
    const select = page.getByRole('button', { name: 'Select' })
    await expect(select).toHaveText('')
    await select.click()
    const cancel = page.getByRole('button', { name: 'Cancel' })
    await expect(cancel).toHaveText('')
    await cancel.click()
    await expect(page.getByRole('button', { name: 'Select' })).toBeVisible()
  })
})

test.describe('auth gate', () => {
  test.use({ requireAuth: true })

  test('login form appears when torrents API returns 401', async ({ page }) => {
    await expect(page.locator('input[name="username"]')).toBeVisible({ timeout: 20_000 })
    await page.locator('input[name="username"]').fill('audit')
    await page.locator('input[name="password"]').fill('auditpass')
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(libraryCard(page)).toBeVisible({ timeout: 20_000 })
  })
})

test('Settings Access / Network / MCP / Torznab', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Settings' }).first()).toBeVisible({ timeout: 20_000 })
  await page.getByRole('button', { name: 'Settings' }).first().click()
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()

  const clickTab = async (name: string) => {
    const tab = page.getByRole('tab', { name }).first()
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
  }

  await clickTab('Access')
  await expect(page.getByLabel('IP whitelist')).toBeVisible()
  await page.getByLabel('IP blacklist').fill('203.0.113.8')
  await page.getByRole('button', { name: 'Save access lists' }).click()
  await expect(page.getByText('Access lists saved and reloaded')).toBeVisible()

  await clickTab('Network')
  await expect(page.getByLabel('Custom remote trackers list URL')).toHaveValue(/example\.test/)

  await clickTab('Torznab')
  await expect(page.getByText('JacRed').first()).toBeVisible()
  await expect(page.getByText('https://jacred.stream')).toBeVisible()
  await expect(page.getByText('2000').first()).toBeVisible()

  await clickTab('Advanced')
  await expect(page.getByText('MCP', { exact: true }).first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Copy MCP URL' })).toBeVisible()

  await clickTab('Application')
  await expect(page.getByText('Prompt to open video in VLC')).toBeVisible()
})

test.describe('phone', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('chrome: bottom nav, header search, appearance overflow', async ({ page }) => {
    await expect(libraryCard(page)).toBeVisible({ timeout: 20_000 })
    const nav = page.locator('.ts-bottom-nav')
    await expect(nav).toBeVisible()
    await expect(page.getByRole('button', { name: 'Collapse sidebar' })).toHaveCount(0)
    await expect(page.locator('header').getByText('MatriX.144')).toHaveCount(0)

    await assertNoHorizontalOverflow(page.locator('header'), 'header')
    await assertNoHorizontalOverflow(nav, 'bottom nav')

    const headerBtns: [string, Locator][] = [
      ['filter', page.getByPlaceholder('Filter library')],
      ['select', page.locator('header [data-slot="button"][aria-label="Select"]')],
      ['collections', page.locator('header [data-slot="button"][aria-label="All"]')],
      ['sort', page.locator('header [data-slot="button"][aria-label="Sort by name"]')],
      ['appearance', page.locator('header [data-slot="button"][aria-label="More"]')],
    ]
    for (const [label, loc] of headerBtns) {
      await expect(loc).toBeVisible()
      await assertBoxInViewport(page, loc, `header ${label}`)
    }

    for (const name of ['Add', 'Search', 'Category', 'More']) {
      const tab = nav.getByRole('button', { name })
      await expect(tab).toBeVisible()
      await assertBoxInViewport(page, tab, `nav ${name}`)
    }
    await expect(page.locator('header').getByLabel(/Theme:/)).toHaveCount(0)

    const vp = page.viewportSize()!
    const cardBoxes = await page.locator('.torrent-card').evaluateAll(els =>
      els.map(el => {
        const r = el.getBoundingClientRect()
        return { x: Math.round(r.x), right: r.right }
      }),
    )
    expect(cardBoxes.length, 'several poster cards').toBeGreaterThanOrEqual(2)
    for (const c of cardBoxes) expect(c.right, 'poster overflows viewport').toBeLessThanOrEqual(vp.width + 1)
    const columns = new Set(cardBoxes.map(c => c.x))
    expect(columns.size, `phone library should be 2 columns: ${[...columns]}`).toBeLessThanOrEqual(2)

    await page.addStyleTag({ content: '.ts-bottom-nav { padding-bottom: 34px !important; }' })
    await assertBoxInViewport(page, nav.getByRole('button', { name: 'More' }), 'nav More with safe-area')

    await openSettings(page, { phone: true })
    const dialog = settingsDialog(page)
    await expect(dialog).toBeVisible()
    const box = (await dialog.boundingBox())!
    expect(box.width, 'phone settings should be near-fullscreen').toBeGreaterThanOrEqual(vp.width * 0.9)
    await assertDialogCentered(page, dialog)
  })
})

// Dialogs go fullscreen up to the 960px `dialog` breakpoint (useDialogFullScreen), so a 768px tablet gets a sheet.
test.describe('tablet', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test('chrome: sidebar, no bottom nav, settings is a fullscreen sheet', async ({ page }) => {
    await expect(libraryCard(page)).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('.ts-bottom-nav')).toHaveCount(0)
    await expect(page.getByLabel('Collapse sidebar')).toBeVisible()
    await openSettings(page)
    const dialog = settingsDialog(page)
    await expect(dialog).toBeVisible()
    const box = (await dialog.boundingBox())!
    const vp = page.viewportSize()!
    expect(box.width, 'sheet width').toBeGreaterThanOrEqual(vp.width * 0.98)
    expect(box.height, 'sheet height').toBeGreaterThanOrEqual(vp.height * 0.98)
    await assertDialogCentered(page, dialog)
  })
})

test.describe('desktop', () => {
  test('chrome: appearance in header, settings is a centered card', async ({ page }) => {
    await expect(libraryCard(page)).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('header').getByText('MatriX.144')).toBeVisible()
    await expect(page.getByLabel(/Theme:/)).toBeVisible()
    await expect(page.getByLabel(/Palette:/)).toBeVisible()
    await expect(page.getByLabel('Language')).toBeVisible()
    await openSettings(page)
    const dialog = settingsDialog(page)
    await expect(dialog).toBeVisible()
    const box = (await dialog.boundingBox())!
    expect(box.width, 'desktop settings should be a card').toBeLessThan(page.viewportSize()!.width * 0.9)
    await assertDialogCentered(page, dialog)
  })
})

test.describe('settings save', () => {
  const jsonBody = (status: number, body: unknown) => ({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  })

  /** Override the default `/settings` mock. `handler(body)` returns a fulfill() object. */
  async function mockSettings(page: Page, handler: (body: Record<string, unknown>) => ReturnType<typeof jsonBody>) {
    const posts: Record<string, unknown>[] = []
    await page.route('**/settings', async (route: Route) => {
      const body = route.request().postDataJSON() || {}
      posts.push(body)
      await route.fulfill(handler(body))
    })
    return posts
  }

  test('Save stays disabled when GET /settings fails and nothing is POSTed', async ({ page }) => {
    const posts = await mockSettings(page, body =>
      body.action === 'get' ? jsonBody(500, { error: 'boom' }) : jsonBody(200, {}),
    )
    const failed = page.waitForResponse(r => r.url().endsWith('/settings') && r.status() === 500)
    await openSettings(page)
    await failed
    await expect(saveButton(page)).toBeVisible()
    await expect(saveButton(page)).toBeDisabled()
    expect(posts.some(p => p.action === 'set')).toBe(false)
  })

  test('Save is enabled after load and posts CacheSize as whole bytes', async ({ page }) => {
    const posts = await mockSettings(page, body =>
      body.action === 'get' ? jsonBody(200, fixtureSettings) : jsonBody(200, {}),
    )
    await openSettings(page)
    await expect(saveButton(page)).toBeEnabled()
    await saveButton(page).click()
    await expect(settingsDialog(page)).toBeHidden()
    const set = posts.find(p => p.action === 'set') as { sets: Record<string, unknown> } | undefined
    expect(set, 'a set request was sent').toBeTruthy()
    expect(set!.sets.CacheSize).toBe(64 * 1024 * 1024)
    expect(Number.isInteger(set!.sets.ReaderReadAHead)).toBe(true)
  })

  test('a 403 on save shows read-only and keeps the dialog open', async ({ page }) => {
    await mockSettings(page, body =>
      body.action === 'get' ? jsonBody(200, fixtureSettings) : jsonBody(403, { error: 'Read-only mode' }),
    )
    await openSettings(page)
    await expect(saveButton(page)).toBeEnabled()
    await saveButton(page).click()
    await expect(page.getByText('Server is read-only. Settings were not saved.')).toBeVisible()
    await expect(settingsDialog(page)).toBeVisible()
  })
})

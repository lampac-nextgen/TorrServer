// Details modal on an iPhone 16 Pro Max: geometry guards and the Files / Stats / Cache views.
import { devices } from '@playwright/test'

import { expect, test } from '../fixtures/mock-test'
import { fixtureDragon, fixtureDragonCache } from '../fixtures/mocks'
import { detailsModal, expectNoNestedInteractive } from '../fixtures/helpers'

// Chromium emulation of the phone (the project only installs Chromium), so drop the WebKit default.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { defaultBrowserType: _browser, ...iPhone } = devices['iPhone 16 Pro Max']

test.use({
  ...iPhone,
  locale: 'en-US',
  mockOptions: { library: [fixtureDragon], torrent: fixtureDragon, cache: fixtureDragonCache },
})

test('details modal fits the viewport and the cache snake fills its panel', async ({ page }, testInfo) => {
  const attach = async (name: string) =>
    testInfo.attach(name, { body: await page.screenshot(), contentType: 'image/png' })

  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: fixtureDragon.title, exact: true }).first().click()
  const details = detailsModal(page)
  await expect(details).toBeVisible()
  await expectNoNestedInteractive(page)

  // Geometry is only stable once the HeroUI enter transform has settled.
  await expect
    .poll(() => details.evaluate(el => getComputedStyle(el).transform), 'enter animation settled')
    .toBe('none')
  const g = await details.evaluate(el => {
    const r = el.getBoundingClientRect()
    return { x: r.x, y: r.y, w: r.width, h: r.height, vw: window.innerWidth, vh: window.innerHeight }
  })
  expect(Math.max(0, Math.abs(g.x), g.w - g.vw), 'horizontal overflow').toBeLessThanOrEqual(2)
  expect(Math.max(0, Math.abs(g.y), g.h - g.vh), 'vertical overflow').toBeLessThanOrEqual(2)

  const tabs = page.locator('.ts-details-tabs [role="tab"]')
  for (const [i, id] of ['files', 'stats', 'cache'].entries()) {
    await tabs.nth(i).click()
    await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true')
    await attach(`details-${id}`)
  }

  // Regression guard for the 1-row collapse of the cache snake.
  const snake = page.locator('.ts-details-cache-snake')
  await expect(snake).toBeVisible()
  const { snakeH, panelH } = await snake.evaluate(el => ({
    snakeH: el.getBoundingClientRect().height,
    panelH: el.closest('[role="tabpanel"]')?.getBoundingClientRect().height ?? 0,
  }))
  if (panelH > 120) expect(snakeH, 'cache snake height vs panel').toBeGreaterThanOrEqual(Math.min(120, panelH * 0.35))
})

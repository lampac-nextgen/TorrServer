import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export const card = (page: Page, title: string): Locator =>
  page.locator('.torrent-card').filter({ has: page.getByRole('button', { name: title, exact: true }) })

export const detailsModal = (page: Page): Locator => page.locator('.ts-details-modal')

/** Open the details dialog the keyboard way (Enter on the focused card). */
export async function openDetails(page: Page, title: string): Promise<void> {
  const b = card(page, title).getByRole('button', { name: title, exact: true }).first()
  await b.focus()
  await page.keyboard.press('Enter')
  await expect(detailsModal(page)).toBeVisible()
}

/** Fill and submit the login form. */
export async function signIn(page: Page, user: string, pass: string): Promise<void> {
  await page.locator('input[name=username]').fill(user)
  await page.locator('input[name=password]').fill(pass)
  await page.getByRole('button', { name: /sign in/i }).click()
}

/** An interactive element inside another one is invalid ARIA and gives keyboard users duplicate tab stops. */
export const NESTED_INTERACTIVE =
  'button button, [role="button"] button, button [role="button"], a button, button a[href]'

export async function expectNoNestedInteractive(page: Page): Promise<void> {
  await expect(page.locator(NESTED_INTERACTIVE)).toHaveCount(0)
}

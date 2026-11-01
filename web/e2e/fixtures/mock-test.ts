import { test as base, expect } from '@playwright/test'

import { installMocks, type MockOptions } from './mocks'
import { embedPagesRoot, serveEmbedDir } from './static-server'

/**
 * `@playwright/test` bound to the embedded SPA served from a worker-scoped static server,
 * with the TorrServer API stubbed through `page.route` (override via `test.use({ mockOptions })`).
 */
export const test = base.extend<{ mockOptions: MockOptions; mockApi: void }, { origin: string }>({
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
  mockOptions: [{}, { option: true }],
  mockApi: [
    async ({ page, mockOptions }, use) => {
      await installMocks(page, mockOptions)
      await use()
    },
    { auto: true },
  ],
})

export { expect }

import { defineConfig, devices } from '@playwright/test'

const CI = !!process.env.CI

export default defineConfig({
  testDir: 'e2e',
  outputDir: 'e2e/.artifacts/results',
  forbidOnly: CI,
  workers: CI ? 2 : undefined,
  reporter: CI
    ? [['list'], ['github'], ['html', { open: 'never', outputFolder: 'e2e/.artifacts/report' }]]
    : [['list']],
  use: {
    ...devices['Desktop Chrome'],
    locale: 'en-US',
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' },
    acceptDownloads: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    // Embedded SPA with mocked APIs. Required CI gate.
    { name: 'mock', testMatch: 'mock/**/*.spec.ts', timeout: 60_000, expect: { timeout: 15_000 } },
    // Built binary + loopback seeder (make e2e-real). Advisory in CI.
    {
      name: 'real',
      testMatch: 'real/**/*.spec.ts',
      timeout: 90_000,
      retries: CI ? 1 : 0,
      expect: { timeout: 15_000 },
    },
    // Manual screenshot matrix (yarn test:e2e:shots); not a gate.
    { name: 'screenshots', testMatch: 'screenshots/**/*.spec.ts', timeout: 90_000 },
    // Palette × mode matrix with a contrast scan (yarn test:e2e:palettes); advisory, not a gate.
    { name: 'palettes', testMatch: 'palettes/**/*.spec.ts', fullyParallel: true, timeout: 180_000, expect: { timeout: 15_000 } },
    // Opt-in against a running server: LIVE=1 TORRSERVER_URL=...
    { name: 'live', testMatch: 'live/**/*.spec.ts', timeout: 180_000 },
  ],
})

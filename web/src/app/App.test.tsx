// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { axiosMock, calls, routeApi } from '../test/mockApi'
import { renderWithProviders } from '../test/renderWithProviders'

import App from './App'

vi.mock('axios', async () => (await import('../test/mockApi')).axiosModule)
vi.mock('virtual:pwa-register', () => ({ registerSW: vi.fn() }))
vi.mock('./Shell', () => ({ default: () => <main>shell</main> }))

beforeEach(() => {
  sessionStorage.clear()
  localStorage.clear()
})

describe('App', () => {
  it('boots into the shell and warms the settings cache once authenticated', async () => {
    routeApi({ 'POST /torrents': [], 'POST /settings': { CacheSize: 1 } })
    renderWithProviders(<App />)
    expect(await screen.findByText('shell')).toBeTruthy()
    await vi.waitFor(() => expect(calls.some(c => c.path === '/settings')).toBe(true))
  })

  it('a 401 shows the sign-in form instead of the shell, and signing in reveals the shell', async () => {
    routeApi({ 'POST /settings': { CacheSize: 1 } })
    axiosMock.post.mockImplementation(
      async (url: string, body: unknown, cfg?: { headers?: Record<string, string> }) => {
        if (String(url).endsWith('/settings')) return { data: { CacheSize: 1 }, status: 200 }
        const ok = cfg?.headers?.Authorization === `Basic ${btoa('u:p')}`
        return { status: ok ? 200 : 401, data: [] }
      },
    )
    renderWithProviders(<App />)
    expect(await screen.findByLabelText('Username')).toBeTruthy()
    expect(screen.queryByText('shell')).toBeNull()
    // No settings request goes out before the user is authenticated.
    expect(axiosMock.post.mock.calls.some(c => String(c[0]).endsWith('/settings'))).toBe(false)

    await userEvent.type(screen.getByLabelText('Username'), 'u')
    await userEvent.type(screen.getByLabelText('Password'), 'p')
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(await screen.findByText('shell')).toBeTruthy()
  })
})

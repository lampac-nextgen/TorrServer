// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { axiosMock } from '../../test/mockApi'
import { renderWithProviders } from '../../test/renderWithProviders'

import AuthGate from './AuthGate'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)

type Reply = { status: number }
/** POST /torrents answers by the Authorization header the request carried. */
function server(opts: { requiresAuth: boolean; user?: string; pass?: string; fail?: boolean }) {
  const seen: (string | undefined)[] = []
  axiosMock.post.mockImplementation(
    async (_url: string, _body: unknown, cfg?: { headers?: Record<string, string> }) => {
      if (opts.fail) throw new Error('Network Error')
      const auth = cfg?.headers?.Authorization
      seen.push(auth)
      const ok = !opts.requiresAuth || auth === `Basic ${btoa(`${opts.user}:${opts.pass}`)}`
      return { status: ok ? 200 : 401, data: [] } satisfies Reply & { data: unknown }
    },
  )
  return seen
}

const renderGate = () =>
  renderWithProviders(
    <AuthGate>
      <p>library</p>
    </AuthGate>,
  )

beforeEach(() => {
  sessionStorage.clear()
  axiosMock.post.mockReset()
  axiosMock.defaults.headers.common = {}
})

describe('AuthGate', () => {
  it('shows the app when the server needs no credentials', async () => {
    server({ requiresAuth: false })
    renderGate()
    expect(await screen.findByText('library')).toBeTruthy()
  })

  it('treats an unreachable server as ready so the app can show its offline state', async () => {
    server({ requiresAuth: false, fail: true })
    renderGate()
    expect(await screen.findByText('library')).toBeTruthy()
  })

  it('prompts for credentials on 401, rejects a bad password, accepts a good one and stores it', async () => {
    server({ requiresAuth: true, user: 'admin', pass: 'secret' })
    renderGate()
    const user = await screen.findByLabelText('Username')
    expect(screen.queryByText('library')).toBeNull()

    await userEvent.type(user, 'admin')
    await userEvent.type(screen.getByLabelText('Password'), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect((await screen.findByRole('alert')).textContent).toMatch(/./)
    expect(sessionStorage.getItem('torrserver.basicAuth')).toBeNull()

    await userEvent.clear(screen.getByLabelText('Password'))
    await userEvent.type(screen.getByLabelText('Password'), 'secret')
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(await screen.findByText('library')).toBeTruthy()
    expect(JSON.parse(sessionStorage.getItem('torrserver.basicAuth')!)).toEqual({
      username: 'admin',
      password: 'secret',
    })
    expect(axiosMock.defaults.headers.common.Authorization).toBe(`Basic ${btoa('admin:secret')}`)
  })

  it('does not sign in with an empty username', async () => {
    server({ requiresAuth: true, user: 'a', pass: 'b' })
    renderGate()
    await screen.findByLabelText('Username')
    const before = axiosMock.post.mock.calls.length
    await userEvent.type(screen.getByLabelText('Password'), 'x{Enter}')
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(screen.queryByText('library')).toBeNull()
    expect(axiosMock.post.mock.calls.length).toBe(before)
  })

  it('reuses stored credentials that still work', async () => {
    sessionStorage.setItem('torrserver.basicAuth', JSON.stringify({ username: 'admin', password: 'secret' }))
    const seen = server({ requiresAuth: true, user: 'admin', pass: 'secret' })
    renderGate()
    expect(await screen.findByText('library')).toBeTruthy()
    expect(seen).toEqual([`Basic ${btoa('admin:secret')}`])
  })

  it('drops stored credentials the server rejects and falls back to the login form', async () => {
    sessionStorage.setItem('torrserver.basicAuth', JSON.stringify({ username: 'admin', password: 'old' }))
    server({ requiresAuth: true, user: 'admin', pass: 'new' })
    renderGate()
    expect(await screen.findByLabelText('Username')).toBeTruthy()
    await waitFor(() => expect(sessionStorage.getItem('torrserver.basicAuth')).toBeNull())
  })
})

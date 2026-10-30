// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { axiosError, routeApi } from '../../test/mockApi'
import { renderWithApp } from '../../test/renderWithApp'
import DonateDialog from '../donate/DonateDialog'
import DonateSnackbar from '../donate/DonateSnackbar'
import { DONATE_LINKS } from '../donate/donateLinks'

import AboutDialog from './AboutDialog'
import { CONTRIBUTORS } from './contributors'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)
const toast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn(), warning: vi.fn() }))
vi.mock('sonner', () => ({ toast: Object.assign(vi.fn(), toast), Toaster: () => null }))

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
})

describe('AboutDialog', () => {
  it('shows the server version from /echo and every contributor link', async () => {
    routeApi({ 'GET /echo': 'MatriX.141' })
    renderWithApp(<AboutDialog open onClose={vi.fn()} />)
    expect(await screen.findByText(/MatriX\.141/)).toBeTruthy()
    const hrefs = screen.getAllByRole('link').map(a => a.getAttribute('href'))
    for (const person of CONTRIBUTORS) expect(hrefs).toContain(person.url)
  })

  it('shows an empty version, not a crash, when /echo fails', async () => {
    routeApi({
      'GET /echo': () => {
        throw axiosError(500)
      },
    })
    renderWithApp(<AboutDialog open onClose={vi.fn()} />)
    await waitFor(() => expect(screen.getByRole('heading', { name: /^TorrServer\s*$/ })).toBeTruthy())
  })

  it('closes itself and opens Server status / Donate through the callbacks', async () => {
    routeApi({ 'GET /echo': 'v1' })
    const onClose = vi.fn()
    const onOpenServerStatus = vi.fn()
    const onOpenDonate = vi.fn()
    renderWithApp(
      <AboutDialog open onClose={onClose} onOpenServerStatus={onOpenServerStatus} onOpenDonate={onOpenDonate} />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Server Status' }))
    expect(onOpenServerStatus).toHaveBeenCalledTimes(1)
    await userEvent.click(screen.getByRole('button', { name: 'Support' }))
    expect(onOpenDonate).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('runs the speed test against /download/<MB> and reports the result', async () => {
    routeApi({ 'GET /echo': 'v1', 'GET /download/10': 'x'.repeat(2048) })
    renderWithApp(<AboutDialog open onClose={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Run' }))
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith(expect.stringMatching(/Mbps/), expect.anything()))
  })

  it('toasts an error when the speed test fails', async () => {
    routeApi({
      'GET /echo': 'v1',
      'GET /download/10': () => {
        throw new Error('boom')
      },
    })
    renderWithApp(<AboutDialog open onClose={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Run' }))
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Error', expect.anything()))
  })
})

describe('Donate', () => {
  it('lists the support links as external links', () => {
    renderWithApp(<DonateDialog open onClose={vi.fn()} />)
    const link = screen.getByRole('link', { name: DONATE_LINKS[0].name })
    expect(link.getAttribute('href')).toBe(DONATE_LINKS[0].href)
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  it('snackbar: Support opens the dialog and never comes back', async () => {
    const onSupport = vi.fn()
    const first = renderWithApp(<DonateSnackbar onSupport={onSupport} />)
    await userEvent.click(screen.getByRole('button', { name: 'Support' }))
    expect(onSupport).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('status')).toBeNull()
    first.unmount()
    renderWithApp(<DonateSnackbar onSupport={onSupport} />)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('snackbar: dismissing does not open the dialog', async () => {
    const onSupport = vi.fn()
    renderWithApp(<DonateSnackbar onSupport={onSupport} />)
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('status')).toBeNull()
    expect(onSupport).not.toHaveBeenCalled()
  })
})

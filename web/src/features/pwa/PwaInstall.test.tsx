// @vitest-environment happy-dom
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '../../test/renderWithProviders'

import AndroidInstallBanner from './AndroidInstallBanner'
import PWAInstallationGuide from './PWAInstallationGuide'

beforeEach(() => localStorage.clear())

function firePrompt(outcome: 'accepted' | 'dismissed' = 'accepted') {
  const prompt = vi.fn().mockResolvedValue(undefined)
  const event = Object.assign(new Event('beforeinstallprompt', { cancelable: true }), {
    prompt,
    userChoice: Promise.resolve({ outcome }),
  })
  act(() => {
    window.dispatchEvent(event)
  })
  return { prompt, event }
}

describe('AndroidInstallBanner', () => {
  it('stays hidden until the browser offers an install prompt', () => {
    const { container } = renderWithProviders(<AndroidInstallBanner />)
    expect(container.innerHTML).toBe('')
  })

  it('shows after beforeinstallprompt, suppresses the native UI, and installs on click', async () => {
    renderWithProviders(<AndroidInstallBanner />)
    const { prompt, event } = firePrompt()
    expect(event.defaultPrevented).toBe(true)

    await userEvent.click(await screen.findByRole('button', { name: 'Install' }))
    expect(prompt).toHaveBeenCalledTimes(1)
    await vi.waitFor(() => expect(screen.queryByRole('button', { name: 'Install' })).toBeNull())
  })

  it('remembers a dismissal for later visits', async () => {
    const first = renderWithProviders(<AndroidInstallBanner />)
    firePrompt()
    await userEvent.click(await screen.findByRole('button', { name: 'Close' }))
    await vi.waitFor(() => expect(localStorage.getItem('androidPwaInstallDismissed')).toBe('true'), { timeout: 1500 })
    first.unmount()

    renderWithProviders(<AndroidInstallBanner />)
    firePrompt()
    expect(screen.queryByRole('button', { name: 'Install' })).toBeNull()
  })
})

describe('PWAInstallationGuide', () => {
  it('shows the iOS steps once and remembers the dismissal', async () => {
    const first = renderWithProviders(<PWAInstallationGuide />)
    expect(screen.getByText(/Add to Home Screen/)).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    await vi.waitFor(() => expect(localStorage.getItem('pwaNotificationIsClosed')).toBe('true'), { timeout: 1500 })
    first.unmount()

    const second = renderWithProviders(<PWAInstallationGuide />)
    expect(second.container.innerHTML).toBe('')
  })
})

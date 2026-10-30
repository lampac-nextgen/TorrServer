// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import 'shared/i18n'
import ErrorBoundary from './ErrorBoundary'

function Boom({ message }: { message: string }): never {
  throw new Error(message)
}

afterEach(() => vi.restoreAllMocks())

describe('ErrorBoundary', () => {
  it('renders children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>all good</p>
      </ErrorBoundary>,
    )
    expect(screen.getByText('all good')).toBeTruthy()
  })

  it('catches a render error, shows its message, and logs it', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <Boom message='kaput' />
      </ErrorBoundary>,
    )
    expect(screen.getByRole('heading').textContent).toBe('Something went wrong')
    expect(screen.getByText('kaput')).toBeTruthy()
    expect(log.mock.calls.some(call => call[0] === 'UI error boundary caught:')).toBe(true)
  })

  it('Reload reloads the page', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const reload = vi.fn()
    vi.stubGlobal('location', { ...window.location, reload })
    render(
      <ErrorBoundary>
        <Boom message='x' />
      </ErrorBoundary>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Reload' }))
    expect(reload).toHaveBeenCalledTimes(1)
    vi.unstubAllGlobals()
  })
})

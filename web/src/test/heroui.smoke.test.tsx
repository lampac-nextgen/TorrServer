// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@heroui/react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'

import { renderWithProviders } from './renderWithProviders'

// Proves the component-test toolchain works end to end: a HeroUI v3 component renders
// in happy-dom with the app's providers and reacts to a real user event.
describe('component test toolchain', () => {
  it('renders a HeroUI Button and handles a click', async () => {
    const onPress = vi.fn()
    renderWithProviders(<Button onPress={onPress}>Add torrent</Button>)

    const button = screen.getByRole('button', { name: 'Add torrent' })
    await userEvent.click(button)

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('has the browser stubs the app needs', () => {
    expect(window.matchMedia('(prefers-color-scheme: dark)').matches).toBe(false)
    expect(typeof ResizeObserver).toBe('function')
    expect(document.createElement('video').play()).toBeInstanceOf(Promise)
  })
})

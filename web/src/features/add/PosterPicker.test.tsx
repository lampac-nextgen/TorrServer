// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import PosterPicker from './PosterPicker'

const urls = ['https://img/a.jpg', 'https://img/b.jpg']

describe('PosterPicker', () => {
  it('renders nothing without options', () => {
    const { container } = render(<PosterPicker poster='' posterOptions={[]} onSelect={() => {}} />)
    expect(container.firstChild).toBeNull()
  })

  it('marks the selected poster and reports a clicked one', async () => {
    const onSelect = vi.fn()
    render(<PosterPicker poster={urls[0]} posterOptions={urls} onSelect={onSelect} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.map(b => b.getAttribute('aria-pressed'))).toEqual(['true', 'false'])
    await userEvent.click(buttons[1])
    expect(onSelect).toHaveBeenCalledWith(urls[1])
  })

  it('uses a horizontal strip for Add and a wrapping grid for Edit, and can be disabled', () => {
    const { container, rerender } = render(<PosterPicker poster='' posterOptions={urls} onSelect={() => {}} />)
    expect((container.firstChild as HTMLElement).className).toContain('overflow-x-auto')
    rerender(<PosterPicker poster='' posterOptions={urls} onSelect={() => {}} layout='wrap' disabled />)
    expect((container.firstChild as HTMLElement).className).toContain('flex-wrap')
    expect(screen.getAllByRole('button').every(b => (b as HTMLButtonElement).disabled)).toBe(true)
  })
})

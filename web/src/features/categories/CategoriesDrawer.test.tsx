// @vitest-environment happy-dom
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import { renderWithApp } from '@/test/renderWithApp'

import CategoriesDrawer from './CategoriesDrawer'

function setup(selectedCategory: string) {
  const onClose = vi.fn()
  const onSelectCategory = vi.fn()
  renderWithApp(
    <CategoriesDrawer open onClose={onClose} selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />,
  )
  return { onClose, onSelectCategory, user: userEvent.setup() }
}

describe('CategoriesDrawer', () => {
  it('lists All, every category and Uncategorized', async () => {
    setup('all')
    expect(await screen.findByRole('button', { name: 'All' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Uncategorized' })).toBeTruthy()
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(TORRENT_CATEGORIES.length + 2)
  })

  it.each([
    ['All', 'all'],
    ['Uncategorized', ''],
  ])('selecting %s reports %j and closes', async (name, value) => {
    const { onClose, onSelectCategory, user } = setup('movie')
    await user.click(await screen.findByRole('button', { name }))
    expect(onSelectCategory).toHaveBeenCalledWith(value)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('selects a concrete category', async () => {
    const { onSelectCategory, user } = setup('all')
    await screen.findByRole('button', { name: 'All' })
    // Entry 0 is "All", then the categories in declared order.
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('rounded-lg'))
    await user.click(buttons[1])
    expect(onSelectCategory).toHaveBeenCalledWith(TORRENT_CATEGORIES[0].key)
  })

  it('marks the active entry with a check instead of its icon', async () => {
    setup('')
    const btn = await screen.findByRole('button', { name: 'Uncategorized' })
    expect(btn.className).toContain('bg-accent-soft')
  })
})

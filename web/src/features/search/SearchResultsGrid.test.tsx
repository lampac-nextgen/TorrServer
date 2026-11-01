// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { SearchResultItem } from 'shared/api/types'
import 'shared/i18n'

import SearchResultsGrid from './SearchResultsGrid'

const results = [
  { Title: 'Alpha', Hash: 'a', Tracker: 'Idx', Size: '1 GB', Seed: 5, Peer: 2 },
  { Hash: 'b' },
  { Title: 'Gamma' },
] as SearchResultItem[]

const props = {
  results,
  adding: false,
  addingKey: null,
  resultDedupeKey: (i: SearchResultItem) => i.Hash || '',
  formatSize: () => '1.0 GB',
  onAdd: vi.fn(),
}

const original = window.matchMedia
function viewport(compact: boolean) {
  window.matchMedia = ((q: string) => ({
    matches: compact,
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  })) as unknown as typeof window.matchMedia
}

afterEach(() => {
  window.matchMedia = original
  vi.clearAllMocks()
})

describe.each([
  ['table', false],
  ['compact cards', true],
])('SearchResultsGrid (%s)', (_name, compact) => {
  it('renders title, tracker and an em dash for a missing title', () => {
    viewport(compact)
    render(<SearchResultsGrid {...props} />)
    expect(screen.getByText('Alpha')).toBeTruthy()
    expect(screen.getByText('Idx')).toBeTruthy()
    expect(screen.getAllByText('—').length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Add' })).toHaveLength(3)
  })

  it('adds the clicked row', async () => {
    viewport(compact)
    render(<SearchResultsGrid {...props} />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Add' })[0])
    expect(props.onAdd).toHaveBeenCalledWith(results[0])
  })

  it('disables every Add while one row is being added and spins on that row', () => {
    viewport(compact)
    render(<SearchResultsGrid {...props} adding addingKey='a' />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.every(b => (b as HTMLButtonElement).disabled || b.getAttribute('aria-disabled') === 'true')).toBe(
      true,
    )
    // The busy row shows a spinner instead of the "Add" label.
    expect(screen.getAllByRole('button', { name: 'Add' })).toHaveLength(2)
  })
})

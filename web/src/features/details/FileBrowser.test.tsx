// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/renderWithProviders'

import FileBrowser from './FileBrowser'

const gridProps = vi.hoisted(() => vi.fn())
vi.mock('./FilesDataGrid', () => ({
  default: (props: { nameQuery?: string; onlyUnviewed?: boolean }) => {
    gridProps(props)
    return <div data-testid='grid' />
  },
}))

const many = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, path: `Show/Show.S01E0${i + 1}.mkv`, length: 1 }))

const lastProps = () => gridProps.mock.calls.at(-1)?.[0] as { nameQuery?: string; onlyUnviewed?: boolean }

describe('FileBrowser file filter', () => {
  it('has no filter row for a short list', () => {
    renderWithProviders(<FileBrowser hash='h' playableFileList={many.slice(0, 7)} />)
    expect(screen.queryByPlaceholderText('Filter files')).toBeNull()
  })

  it('passes the typed query and the unviewed toggle to the grid, and clears the query', async () => {
    renderWithProviders(<FileBrowser hash='h' playableFileList={many} viewedFileList={[1]} />)
    await userEvent.type(screen.getByPlaceholderText('Filter files'), 'E03')
    expect(lastProps().nameQuery).toBe('E03')

    await userEvent.click(screen.getByRole('button', { name: 'Not viewed yet' }))
    expect(lastProps().onlyUnviewed).toBe(true)
    expect(screen.getByRole('button', { name: 'Not viewed yet' }).getAttribute('aria-pressed')).toBe('true')

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }))
    expect(lastProps().nameQuery).toBe('')
  })
})

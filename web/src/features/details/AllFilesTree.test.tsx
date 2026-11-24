// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/renderWithProviders'

import AllFilesTree from './AllFilesTree'

const copy = vi.hoisted(() => vi.fn())
vi.mock('shared/lib/clipboard', () => ({ copyToClipboard: copy }))
const showToast = vi.hoisted(() => vi.fn())
vi.mock('shared/ui/Toast', () => ({ useOptionalAppToast: () => ({ showToast }) }))

const files = [
  { id: 1, path: 'Show/S1/a.mkv', length: 2 * 1024 * 1024 },
  { id: 2, path: 'Show/S1/b.mkv', length: 1024 * 1024 },
  { id: 3, path: 'Show/info.nfo', length: 1024 },
  { id: 4, path: 'Extras/poster.jpg', length: 2048 },
]

beforeEach(() => {
  copy.mockReset()
  copy.mockResolvedValue(undefined)
  showToast.mockReset()
})

describe('AllFilesTree', () => {
  it('opens the first level, hides deeper rows and lists non-playable files', () => {
    renderWithProviders(<AllFilesTree files={files} />)
    expect(screen.getByRole('treeitem', { name: /^Show/ })).toBeTruthy()
    expect(screen.getByText('info.nfo')).toBeTruthy()
    expect(screen.getByText('poster.jpg')).toBeTruthy()
    expect(screen.queryByText('a.mkv')).toBeNull()
  })

  it('shows folder file count and expands or collapses on click', async () => {
    renderWithProviders(<AllFilesTree files={files} />)
    const show = screen.getByRole('treeitem', { name: /^Show/ })
    expect(within(show).getByText('Files: 3')).toBeTruthy()
    await userEvent.click(screen.getByText('S1'))
    expect(screen.getByText('a.mkv')).toBeTruthy()
    await userEvent.click(screen.getByText('S1'))
    expect(screen.queryByText('a.mkv')).toBeNull()
  })

  it('Expand all and Collapse all', async () => {
    renderWithProviders(<AllFilesTree files={files} />)
    await userEvent.click(screen.getByRole('button', { name: 'Expand all' }))
    expect(screen.getByText('b.mkv')).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Collapse all' }))
    expect(screen.queryByText('info.nfo')).toBeNull()
    expect(screen.getByText('Show')).toBeTruthy()
  })

  it('keyboard: arrows move, Right expands, Left collapses', async () => {
    renderWithProviders(<AllFilesTree files={files} />)
    screen.getByRole('treeitem', { name: /^Show/ }).focus()
    await userEvent.keyboard('{ArrowDown}')
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('treeitem', { name: /^S1/ })))
    await userEvent.keyboard('{ArrowRight}')
    await waitFor(() => expect(screen.getByText('a.mkv')).toBeTruthy())
    await userEvent.keyboard('{ArrowLeft}')
    await waitFor(() => expect(screen.queryByText('a.mkv')).toBeNull())
  })

  it('copies the name and the full path', async () => {
    renderWithProviders(<AllFilesTree files={files} />)
    await userEvent.click(screen.getByRole('button', { name: 'Copy name: info.nfo' }))
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Copy path' }))
    await waitFor(() => expect(copy).toHaveBeenCalledWith('Show/info.nfo'))
    expect(showToast).toHaveBeenCalledWith({ message: 'Copied', severity: 'success' })
  })

  it('marks viewed files and shows sizes with one decimal', async () => {
    renderWithProviders(
      <AllFilesTree
        files={[...files, { id: 5, path: 'Show/S1/c.mkv', length: 7.6 * 1024 ** 3 }]}
        viewedFileList={[5]}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Expand all' }))
    const row = screen.getByText('c.mkv').closest('[role=treeitem]') as HTMLElement
    expect(within(row).getByRole('img', { name: 'Viewed' })).toBeTruthy()
    expect(within(row).getByText('7.6 GB')).toBeTruthy()
    const other = screen.getByText('a.mkv').closest('[role=treeitem]') as HTMLElement
    expect(within(other).queryByRole('img', { name: 'Viewed' })).toBeNull()
  })

  it('renders a 1000-file pack without mounting files of closed folders', () => {
    const many = Array.from({ length: 1000 }, (_, i) => ({ id: i, path: `Pack/D${i % 10}/f${i}.mkv`, length: 10 }))
    renderWithProviders(<AllFilesTree files={many} />)
    // Pack + its 10 subfolders; the 1000 files below stay unmounted until a folder opens.
    expect(screen.getAllByRole('treeitem')).toHaveLength(11)
    expect(screen.queryByText('f0.mkv')).toBeNull()
  })
})

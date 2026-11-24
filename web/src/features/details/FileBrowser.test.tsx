// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/renderWithProviders'

import FileBrowser from './FileBrowser'

vi.mock('./FilesDataGrid', () => ({ default: () => <div data-testid='grid' /> }))

const files = [
  { id: 1, path: 'Show/a.mkv', length: 10 },
  { id: 2, path: 'Show/info.nfo', length: 1 },
]

describe('FileBrowser view toggle', () => {
  it('switches between the playlist and the All files tree', async () => {
    renderWithProviders(<FileBrowser hash='h' playableFileList={[files[0]]} allFiles={files} />)
    expect(screen.getByTestId('grid')).toBeTruthy()
    expect(screen.queryByRole('tree')).toBeNull()

    await userEvent.click(screen.getByRole('radio', { name: 'All files' }))
    expect(screen.getByRole('tree')).toBeTruthy()
    expect(screen.queryByTestId('grid')).toBeNull()

    await userEvent.click(screen.getByRole('radio', { name: 'Playlist' }))
    expect(screen.getByTestId('grid')).toBeTruthy()
  })

  it('has no toggle for a single-file torrent', () => {
    renderWithProviders(<FileBrowser hash='h' playableFileList={[files[0]]} allFiles={[files[0]]} />)
    expect(screen.queryByRole('radio', { name: 'All files' })).toBeNull()
    expect(screen.getByTestId('grid')).toBeTruthy()
  })
})

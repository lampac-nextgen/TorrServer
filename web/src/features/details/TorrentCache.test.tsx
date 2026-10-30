// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'

import type { CachePiece, TorrentCache as TorrentCacheData } from 'shared/api/types'
import { clearSnakeSessions } from 'shared/cache/snakeSession'
import { renderWithProviders } from '@/test/renderWithProviders'

import TorrentCache from './TorrentCache'

const MB = 1024 * 1024

const sizes = { width: 400, height: 240 }

beforeEach(() => {
  clearSnakeSessions()
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => sizes.width })
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, get: () => sizes.height })
})

afterEach(() => {
  delete (HTMLElement.prototype as unknown as Record<string, unknown>).clientWidth
  delete (HTMLElement.prototype as unknown as Record<string, unknown>).clientHeight
  vi.restoreAllMocks()
})

const pieces = (count: number, completeUpTo: number): CachePiece[] =>
  Array.from({ length: count }, (_, i) => ({
    Id: i,
    Size: i < completeUpTo ? 4 * MB : 0,
    Length: 4 * MB,
    Completed: i < completeUpTo,
    Priority: 0,
  }))

const cache = (over: Partial<TorrentCacheData> = {}): TorrentCacheData => ({
  Hash: 'h',
  Capacity: 64 * MB,
  Filled: 16 * MB,
  PiecesCount: 60,
  PiecesLength: 4 * MB,
  Pieces: pieces(60, 4),
  Readers: [],
  ...over,
})

describe('TorrentCache', () => {
  it('paints a canvas labelled with filled and capacity once the pane has a width', async () => {
    renderWithProviders(<TorrentCache cache={cache()} hash='h' />)
    const canvas = await screen.findByRole('img')
    expect(canvas.tagName).toBe('CANVAS')
    expect(canvas.getAttribute('aria-label')).toMatch(/16(\.0)? MB of 64(\.0)? MB cached/)
  })

  it('draws nothing while the pane has no width yet (hidden tab)', () => {
    sizes.width = 0
    renderWithProviders(<TorrentCache cache={cache()} hash='h' />)
    expect(screen.queryByRole('img')).toBeNull()
    sizes.width = 400
  })

  it('names the cache when sizes are unknown', async () => {
    renderWithProviders(<TorrentCache cache={{ Hash: 'h' }} hash='h' />)
    expect((await screen.findByRole('img')).getAttribute('aria-label')).toBe('Cache')
  })

  it('shows the focus range and legend only once real pieces exist', async () => {
    const { rerender } = renderWithProviders(<TorrentCache cache={{ Hash: 'h' }} hash='h' />)
    await screen.findByRole('img')
    expect(screen.queryByText(/^pieces/)).toBeNull()

    rerender(<TorrentCache cache={cache()} hash='h' />)
    expect(await screen.findByText(/pieces 0–\d+/)).toBeTruthy()
  })

  it('flags an idle playhead as frozen but not an active one', async () => {
    const { rerender } = renderWithProviders(
      <TorrentCache cache={cache({ Readers: [{ Reader: 1, Start: 0, End: 3, Active: false }] })} hash='h' />,
    )
    expect(await screen.findByText(/idle · frozen/)).toBeTruthy()
    rerender(<TorrentCache cache={cache({ Readers: [{ Reader: 1, Start: 0, End: 3, Active: true }] })} hash='h' />)
    await waitFor(() => expect(screen.queryByText(/idle · frozen/)).toBeNull())
  })

  it('debug mode adds the priority legend', async () => {
    renderWithProviders(<TorrentCache cache={cache()} hash='h' isSnakeDebugMode />)
    expect(await screen.findByText(/^A · /)).toBeTruthy()
  })

  it('hover shows a piece tooltip and leaving hides it', async () => {
    renderWithProviders(<TorrentCache cache={cache()} hash='h' />)
    const canvas = await screen.findByRole('img')
    let found: HTMLElement | null = null
    for (let x = 4; x < 60 && !found; x += 4) {
      fireEvent.mouseMove(canvas, { clientX: x, clientY: 10 })
      found = screen.queryByText(/piece #\d+|pieces \d+–\d+ ·/)
    }
    expect(found).not.toBeNull()
    fireEvent.mouseLeave(canvas)
    await waitFor(() => expect(screen.queryByText(/piece #\d+ ·/)).toBeNull())
  })

  it('tap outside dismisses the tooltip and the document listener is removed on unmount', async () => {
    const add = vi.spyOn(document, 'addEventListener')
    const remove = vi.spyOn(document, 'removeEventListener')
    const view = renderWithProviders(<TorrentCache cache={cache()} hash='h' />)
    const canvas = await screen.findByRole('img')
    let found: HTMLElement | null = null
    for (let x = 4; x < 60 && !found; x += 4) {
      fireEvent.click(canvas, { clientX: x, clientY: 10 })
      found = screen.queryByText(/piece #\d+|pieces \d+–\d+ ·/)
    }
    expect(found).not.toBeNull()
    expect(add.mock.calls.filter(([type]) => type === 'pointerdown')).toHaveLength(1)
    act(() => {
      document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    })
    await waitFor(() => expect(screen.queryByText(/piece #\d+|pieces \d+–\d+ ·/)).toBeNull())

    // open it again, then unmount with the tooltip showing
    for (let x = 4; x < 60 && !screen.queryByText(/piece #\d+|pieces \d+–\d+ ·/); x += 4) {
      fireEvent.click(canvas, { clientX: x, clientY: 10 })
    }
    view.unmount()
    const adds = add.mock.calls.filter(([type]) => type === 'pointerdown').length
    expect(remove.mock.calls.filter(([type]) => type === 'pointerdown').length).toBe(adds)
  })

  it('cancels its pending frame on unmount', async () => {
    const cancel = vi.spyOn(window, 'cancelAnimationFrame')
    const view = renderWithProviders(<TorrentCache cache={cache()} hash='h' />)
    await screen.findByRole('img')
    view.unmount()
    expect(cancel).toHaveBeenCalled()
  })

  it('mini mode paints the same labelled canvas', async () => {
    renderWithProviders(<TorrentCache cache={cache()} hash='h' mode='mini' />)
    expect((await screen.findByRole('img')).getAttribute('aria-label')).toMatch(/of 64(\.0)? MB cached/)
  })
})

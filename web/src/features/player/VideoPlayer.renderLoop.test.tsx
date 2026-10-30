// @vitest-environment happy-dom
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { waitFor } from '@testing-library/react'

import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { renderWithProviders } from '@/test/renderWithProviders'

import VideoPlayer from './VideoPlayer'

const chromeRenders = vi.hoisted(() => ({ count: 0 }))

// PlayerChrome re-renders with every VideoPlayer render, so it doubles as a render counter that
// turns an endless update loop into a failing test instead of a hung worker.
vi.mock('./PlayerChrome', () => ({
  default: ({ children }: { children: ReactNode }) => {
    if (++chromeRenders.count > 200) throw new Error('VideoPlayer is stuck in a render loop')
    return <div>{children}</div>
  },
}))

describe('VideoPlayer without audioTracks', () => {
  it('settles after mount instead of re-rendering forever', async () => {
    chromeRenders.count = 0
    renderWithProviders(
      <ModalOpenProvider>
        <VideoPlayer videoSrc='http://localhost/stream/movie.mp4?link=x&index=1&play' showTrigger={false} initiallyOpen />
      </ModalOpenProvider>,
    )
    await waitFor(() => expect(document.querySelector('video')).not.toBeNull())
    const settled = chromeRenders.count
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(chromeRenders.count).toBe(settled)
    expect(settled).toBeLessThan(20)
  })
})

// @vitest-environment happy-dom
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { TorrentStat } from 'shared/api/types'
import { renderWithApp } from '@/test/renderWithApp'

import TorrentCard from './TorrentCard'

vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: {} }),
    post: vi.fn(),
    isCancel: () => false,
    isAxiosError: () => false,
  },
}))

const torrent = { hash: 'a'.repeat(40), title: 'Alpha', stat: 5 } as TorrentStat

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response('{}', { status: 200 })),
  )
})

function mount(props: Partial<React.ComponentProps<typeof TorrentCard>> = {}) {
  const onSelect = vi.fn()
  const onToggleSelect = vi.fn()
  const utils = renderWithApp(
    <TorrentCard torrent={torrent} onSelect={onSelect} onToggleSelect={onToggleSelect} {...props} />,
  )
  return { onSelect, onToggleSelect, ...utils }
}

describe('TorrentCard interactive structure', () => {
  it('never nests one interactive element inside another', () => {
    const { container } = mount({
      resumeEntry: { hash: torrent.hash, fileIndex: 1, timecode: 5 } as never,
      onResume: vi.fn(),
    })
    const interactive = 'button, a[href], [role=button], [role=link], [role=menuitem]'
    const nested = [...container.querySelectorAll(interactive)].filter(el => el.parentElement?.closest(interactive))
    expect(nested.map(el => el.outerHTML.slice(0, 80))).toEqual([])
  })

  it('opens details exactly once from the poster button', async () => {
    const { onSelect } = mount()
    await userEvent.click(screen.getByRole('button', { name: 'Alpha' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
    onSelect.mockClear()
    screen.getByRole('button', { name: 'Alpha' }).focus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')
    expect(onSelect).toHaveBeenCalledTimes(2)
  })

  it('keyboard-activating Play or Actions does not also open details', async () => {
    const { onSelect } = mount()
    for (const name of ['Play', 'Actions']) {
      screen.getByRole('button', { name }).focus()
      await userEvent.keyboard('{Enter}')
    }
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('in selection mode the poster button toggles selection and reports its state', async () => {
    const { onSelect, onToggleSelect } = mount({ selectionMode: true, selected: true })
    const poster = screen.getByRole('button', { name: 'Alpha' })
    expect(poster.getAttribute('aria-pressed')).toBe('true')
    expect(screen.queryByRole('button', { name: 'Play' })).toBeNull()
    await userEvent.click(poster)
    expect(onToggleSelect).toHaveBeenCalledWith(torrent.hash)
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('Continue resumes without opening plain details', async () => {
    const onResume = vi.fn()
    const { onSelect } = mount({ resumeEntry: { hash: torrent.hash, fileIndex: 1, timecode: 5 } as never, onResume })
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(onResume).toHaveBeenCalledTimes(1)
    expect(onSelect).not.toHaveBeenCalled()
  })
})

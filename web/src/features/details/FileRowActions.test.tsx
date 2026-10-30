// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/renderWithProviders'

import FileRowActions, { type FileRowActionsProps } from './FileRowActions'

const copy = vi.hoisted(() => vi.fn())
vi.mock('shared/lib/clipboard', () => ({ copyToClipboard: copy }))

const base = (over: Partial<FileRowActionsProps> = {}): FileRowActionsProps => ({
  preloadLabel: 'Preload',
  onPreload: vi.fn(),
  playerSupported: true,
  onPlay: vi.fn(),
  copyText: 'https://tv.lan:8443/stream/x.mp4?link=h&index=1&play',
  externalPlayers: [],
  openLinkHref: 'http://localhost:3000/stream/x.mp4?link=h&index=1&play',
  showOpenLink: true,
  ...over,
})

const setMobile = (mobile: boolean) => {
  window.matchMedia = ((query: string) => ({
    matches: mobile,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}

const original = window.matchMedia

beforeEach(() => {
  copy.mockReset()
  copy.mockResolvedValue(undefined)
  setMobile(false)
})

afterEach(() => {
  window.matchMedia = original
  vi.restoreAllMocks()
})

describe('FileRowActions on desktop', () => {
  it('shows Play, the external player chips and the utilities on the row', () => {
    renderWithProviders(
      <FileRowActions
        {...base({
          externalPlayers: [{ label: 'VLC', href: 'vlc://https://tv.lan/x' }],
          onProbeMedia: vi.fn(),
        })}
      />,
    )
    expect(screen.getByRole('button', { name: 'Play' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'VLC' })).toBeTruthy()
    for (const name of ['Open link', 'Copy URL', 'Preload', 'Media info']) {
      expect(screen.getByRole('button', { name })).toBeTruthy()
    }
    expect(screen.queryByRole('button', { name: 'Actions' })).toBeNull()
  })

  it('Play, Preload and Media info call their handlers once', async () => {
    const props = base({ onProbeMedia: vi.fn() })
    renderWithProviders(<FileRowActions {...props} />)
    await userEvent.click(screen.getByRole('button', { name: 'Play' }))
    await userEvent.click(screen.getByRole('button', { name: 'Preload' }))
    await userEvent.click(screen.getByRole('button', { name: 'Media info' }))
    expect(props.onPlay).toHaveBeenCalledTimes(1)
    expect(props.onPreload).toHaveBeenCalledTimes(1)
    expect(props.onProbeMedia).toHaveBeenCalledTimes(1)
  })

  it('omits Media info when no probe handler is wired', () => {
    renderWithProviders(<FileRowActions {...base()} />)
    expect(screen.queryByRole('button', { name: 'Media info' })).toBeNull()
  })

  it('copies the external (media base) link, not the in-page one', async () => {
    renderWithProviders(<FileRowActions {...base()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Copy URL' }))
    expect(copy).toHaveBeenCalledWith('https://tv.lan:8443/stream/x.mp4?link=h&index=1&play')
  })

  it('open link uses the in-page url in a new noopener window', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    renderWithProviders(<FileRowActions {...base()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open link' }))
    expect(open).toHaveBeenCalledWith(
      'http://localhost:3000/stream/x.mp4?link=h&index=1&play',
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('hides the open-link utility when the setting says no', () => {
    renderWithProviders(<FileRowActions {...base({ showOpenLink: false })} />)
    expect(screen.queryByRole('button', { name: 'Open link' })).toBeNull()
  })

  it('when the in-app player cannot play the file, Play opens the link instead', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    const props = base({ playerSupported: false })
    renderWithProviders(<FileRowActions {...props} />)
    await userEvent.click(screen.getByRole('button', { name: 'Play' }))
    expect(props.onPlay).not.toHaveBeenCalled()
    expect(open).toHaveBeenCalledTimes(1)
    // the open-link utility is not duplicated next to it
    expect(screen.queryByRole('button', { name: 'Open link' })).toBeNull()
  })

  it('has no Play at all when the player is unsupported and open-link is off', () => {
    renderWithProviders(<FileRowActions {...base({ playerSupported: false, showOpenLink: false })} />)
    expect(screen.queryByRole('button', { name: 'Play' })).toBeNull()
  })

  it('a failed clipboard write does not throw', async () => {
    copy.mockRejectedValue(new Error('denied'))
    renderWithProviders(<FileRowActions {...base()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Copy URL' }))
    await waitFor(() => expect(copy).toHaveBeenCalled())
  })
})

describe('FileRowActions on a phone', () => {
  beforeEach(() => setMobile(true))

  it('keeps only Play and More on the row; players and utilities move into the menu', async () => {
    const props = base({ externalPlayers: [{ label: 'VLC', href: 'vlc://x' }], onProbeMedia: vi.fn() })
    renderWithProviders(<FileRowActions {...props} />)
    expect(screen.queryByRole('button', { name: 'VLC' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Copy URL' })).toBeNull()

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }))
    expect(await screen.findByRole('menuitem', { name: /VLC/ })).toBeTruthy()
    await userEvent.click(screen.getByRole('menuitem', { name: /Preload/ }))
    expect(props.onPreload).toHaveBeenCalledTimes(1)
  })

  it('menu Copy URL copies the external link', async () => {
    renderWithProviders(<FileRowActions {...base()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Actions' }))
    await userEvent.click(await screen.findByRole('menuitem', { name: /Copy URL/ }))
    expect(copy).toHaveBeenCalledWith('https://tv.lan:8443/stream/x.mp4?link=h&index=1&play')
  })

  it('Play stays reachable and fires onPlay', async () => {
    const props = base()
    renderWithProviders(<FileRowActions {...props} />)
    await userEvent.click(screen.getByRole('button', { name: 'Play' }))
    expect(props.onPlay).toHaveBeenCalledTimes(1)
  })
})

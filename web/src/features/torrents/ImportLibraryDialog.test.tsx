// @vitest-environment happy-dom
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithApp } from '@/test/renderWithApp'

import ImportLibraryDialog from './ImportLibraryDialog'

const api = vi.hoisted(() => ({
  addTorrent: vi.fn(),
  refreshTorrentsList: vi.fn(),
  upsertTorrentsInList: vi.fn(),
}))
const library = vi.hoisted(() => ({ data: [] as { hash: string }[] }))
const toast = vi.hoisted(() => vi.fn())

vi.mock('shared/api/torrents', () => api)
vi.mock('shared/hooks/useTorrentsQuery', () => ({ useTorrentsQuery: () => ({ data: library.data }) }))
vi.mock('sonner', () => ({
  toast: Object.assign((m: string) => toast('info', m), {
    success: (m: string) => toast('success', m),
    error: (m: string) => toast('error', m),
    warning: (m: string) => toast('warning', m),
  }),
}))

const H1 = '0123456789abcdef0123456789abcdef01234567'
const H2 = 'fedcba9876543210fedcba9876543210fedcba98'
const magnet = (h: string) => `magnet:?xt=urn:btih:${h}`

beforeEach(() => {
  vi.clearAllMocks()
  library.data = []
  api.addTorrent.mockImplementation(async (p: { link: string }) => ({ hash: p.link.slice(-40), title: 't' }))
  api.refreshTorrentsList.mockResolvedValue(undefined)
})

async function open() {
  const onClose = vi.fn()
  const user = userEvent.setup()
  renderWithApp(<ImportLibraryDialog open onClose={onClose} />)
  const box = (await screen.findByRole('textbox')) as HTMLTextAreaElement
  return { user, onClose, box }
}

const runButton = () => screen.getByRole('button', { name: 'Import' }) as HTMLButtonElement
const isOff = (el: HTMLElement) => (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true'

describe('ImportLibraryDialog', () => {
  it('keeps Import disabled until something parses, and shows the parsed count', async () => {
    const { box } = await open()
    expect(isOff(runButton())).toBe(true)
    fireEvent.change(box, { target: { value: `${magnet(H1)}\n${magnet(H2)}\nnot a link` } })
    expect(await screen.findByText('2 items ready')).toBeTruthy()
    await waitFor(() => expect(isOff(runButton())).toBe(false))
  })

  it('imports every parsed link, reports the summary and refreshes the library', async () => {
    const { box, user } = await open()
    fireEvent.change(box, { target: { value: `${magnet(H1)}\n${magnet(H2)}` } })
    await user.click(runButton())
    await waitFor(() => expect(toast).toHaveBeenCalledWith('success', expect.stringContaining('2')))
    expect(api.addTorrent).toHaveBeenCalledTimes(2)
    expect(api.addTorrent).toHaveBeenCalledWith(expect.objectContaining({ link: magnet(H1), save_to_db: true }))
    expect(api.upsertTorrentsInList).toHaveBeenCalledTimes(2)
    expect(api.refreshTorrentsList).toHaveBeenCalledOnce()
  })

  it('skips torrents that are already in the library', async () => {
    library.data = [{ hash: H1.toUpperCase() }]
    const { box, user } = await open()
    fireEvent.change(box, { target: { value: `${magnet(H1)}\n${magnet(H2)}` } })
    await user.click(runButton())
    await waitFor(() => expect(api.refreshTorrentsList).toHaveBeenCalled())
    expect(api.addTorrent).toHaveBeenCalledTimes(1)
    expect(api.addTorrent).toHaveBeenCalledWith(expect.objectContaining({ link: magnet(H2) }))
  })

  it('adds existing torrents too when "skip existing" is switched off', async () => {
    library.data = [{ hash: H1 }]
    const { box, user } = await open()
    fireEvent.change(box, { target: { value: magnet(H1) } })
    await user.click(screen.getByRole('switch', { name: 'Skip torrents already in the library' }))
    await user.click(runButton())
    await waitFor(() => expect(api.addTorrent).toHaveBeenCalledTimes(1))
  })

  it('passes save_to_db=false when the switch is off', async () => {
    const { box, user } = await open()
    fireEvent.change(box, { target: { value: magnet(H1) } })
    await user.click(screen.getByRole('switch', { name: 'Save to library' }))
    await user.click(runButton())
    await waitFor(() => expect(api.addTorrent).toHaveBeenCalledWith(expect.objectContaining({ save_to_db: false })))
  })

  it('counts failures and warns instead of claiming success', async () => {
    api.addTorrent.mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce({ hash: H2 })
    const { box, user } = await open()
    fireEvent.change(box, { target: { value: `${magnet(H1)}\n${magnet(H2)}` } })
    await user.click(runButton())
    await waitFor(() => expect(toast).toHaveBeenCalledWith('warning', expect.any(String)))
    expect(api.upsertTorrentsInList).toHaveBeenCalledTimes(1)
  })

  it('loads text from a picked file and clears it again', async () => {
    const { box, user } = await open()
    const input = document.querySelector('input[type=file]') as HTMLInputElement
    const file = new File([magnet(H1)], 'lib.txt', { type: 'text/plain' })
    Object.defineProperty(file, 'text', { value: async () => magnet(H1) })
    await user.upload(input, file)
    await waitFor(() => expect(box.value).toBe(magnet(H1)))
    await user.click(screen.getByRole('button', { name: 'Clear' }))
    expect(box.value).toBe('')
  })

  it('reports an unreadable file', async () => {
    await open()
    const input = document.querySelector('input[type=file]') as HTMLInputElement
    const file = new File(['x'], 'lib.txt', { type: 'text/plain' })
    Object.defineProperty(file, 'text', { value: async () => Promise.reject(new Error('io')) })
    fireEvent.change(input, { target: { files: [file] } })
    await waitFor(() => expect(toast).toHaveBeenCalledWith('error', expect.any(String)))
  })

  it('opens the file picker from the button and closes with a reset', async () => {
    const { user, onClose, box } = await open()
    const click = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {})
    await user.click(screen.getByRole('button', { name: 'Load file' }))
    expect(click).toHaveBeenCalled()
    fireEvent.change(box, { target: { value: magnet(H1) } })
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })
})

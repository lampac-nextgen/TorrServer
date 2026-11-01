// @vitest-environment happy-dom
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { TorrentStat } from 'shared/api/types'
import { renderWithApp } from '@/test/renderWithApp'

import ExportLibraryDialog from './ExportLibraryDialog'

const clip = vi.hoisted(() => ({ copyToClipboard: vi.fn() }))
const toast = vi.hoisted(() => vi.fn())
vi.mock('shared/lib/clipboard', () => clip)
vi.mock('shared/api/extras', () => ({ torrsShareUrl: (t: { hash: string }) => `torrs://${t.hash}` }))
vi.mock('sonner', () => ({
  toast: Object.assign((m: string) => toast('info', m), {
    success: (m: string) => toast('success', m),
    error: (m: string) => toast('error', m),
    warning: (m: string) => toast('warning', m),
  }),
}))

const rows = [
  { hash: 'a'.repeat(40), title: 'Show & Co', category: 'tv', torrent_size: 10, timestamp: 5 },
  { hash: 'b'.repeat(40), name: 'plain.name' },
  { hash: 'c'.repeat(40) },
] as unknown as TorrentStat[]

let blobs: Blob[]
let downloads: string[]

beforeEach(() => {
  vi.clearAllMocks()
  clip.copyToClipboard.mockResolvedValue(undefined)
  blobs = []
  downloads = []
  URL.createObjectURL = ((b: Blob) => (blobs.push(b), 'blob:x')) as typeof URL.createObjectURL
  URL.revokeObjectURL = () => {}
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    downloads.push(this.download)
  })
})

afterEach(() => vi.restoreAllMocks())

const open = (torrents = rows) => {
  const user = userEvent.setup()
  renderWithApp(<ExportLibraryDialog open onClose={() => {}} torrents={torrents} />)
  return user
}

describe('ExportLibraryDialog', () => {
  it('shows the count and disables every action for an empty library', async () => {
    open([])
    await screen.findByText(/0/)
    for (const b of screen.getAllByRole('button').filter(b => b.textContent && b.textContent !== 'Close')) {
      expect((b as HTMLButtonElement).disabled || b.getAttribute('aria-disabled') === 'true').toBe(true)
    }
  })

  it('copies magnets built from title, name or hash, then flips the label', async () => {
    const user = open()
    await user.click(await screen.findByRole('button', { name: 'Copy magnets' }))
    const text = clip.copyToClipboard.mock.calls[0][0] as string
    expect(text.split('\n')).toEqual([
      `magnet:?xt=urn:btih:${'a'.repeat(40)}&dn=Show%20%26%20Co`,
      `magnet:?xt=urn:btih:${'b'.repeat(40)}&dn=plain.name`,
      `magnet:?xt=urn:btih:${'c'.repeat(40)}&dn=${'c'.repeat(40)}`,
    ])
    await waitFor(() => expect(toast).toHaveBeenCalledWith('success', 'Copied'))
  })

  it('copies torrs links and the JSON projection', async () => {
    const user = open()
    const buttons = await screen.findAllByRole('button', { name: /Copy/ })
    await user.click(buttons.find(b => /torrs/i.test(b.textContent || ''))!)
    expect(clip.copyToClipboard.mock.calls[0][0]).toBe(rows.map(r => `torrs://${r.hash}`).join('\n'))

    await user.click(buttons.find(b => /json/i.test(b.textContent || ''))!)
    const json = JSON.parse(clip.copyToClipboard.mock.calls[1][0] as string)
    expect(json[0]).toMatchObject({
      hash: 'a'.repeat(40),
      title: 'Show & Co',
      category: 'tv',
      torrent_size: 10,
      timestamp: 5,
    })
    expect(json).toHaveLength(3)
  })

  it('falls back to a selectable textarea when copying fails', async () => {
    clip.copyToClipboard.mockRejectedValue(new Error('denied'))
    const user = open()
    await user.click(await screen.findByRole('button', { name: 'Copy magnets' }))
    const area = (await screen.findByDisplayValue(/magnet:\?xt/)) as HTMLTextAreaElement
    expect(area.readOnly).toBe(true)
    expect(toast).toHaveBeenCalledWith('error', expect.any(String))
  })

  it.each([
    [/Download magnets/, 'torrserver-magnets.txt', 'text/plain'],
    [/Download torrs/, 'torrserver-torrs.txt', 'text/plain'],
    [/Download library/, 'torrserver-library.json', 'application/json'],
  ])('downloads %s as %s', async (label, filename, mime) => {
    const user = open()
    await user.click(await screen.findByRole('button', { name: label }))
    expect(downloads).toEqual([filename])
    expect(blobs[0].type).toContain(mime)
    expect(toast).toHaveBeenCalledWith('success', expect.any(String))
  })
})

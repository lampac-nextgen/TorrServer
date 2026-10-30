// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { mockNetwork, pathOf, type NetworkMock } from '@/test/network'
import { renderWithProviders } from '@/test/renderWithProviders'

import MediaInfoDialog from './MediaInfoDialog'

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'
let net: NetworkMock | undefined

afterEach(() => {
  net?.restore()
  net = undefined
})

const mount = (props: { open?: boolean; onClose?: () => void; fileId?: number } = {}) =>
  renderWithProviders(
    <ModalOpenProvider>
      <MediaInfoDialog
        open={props.open ?? true}
        onClose={props.onClose ?? (() => {})}
        hash={HASH}
        fileId={props.fileId ?? 3}
        fileName='Show.S01E03.mkv'
      />
    </ModalOpenProvider>,
  )

describe('MediaInfoDialog', () => {
  it('probes /ffp for the hash and file index and lists the streams by kind', async () => {
    net = mockNetwork(() => ({
      format: { format_long_name: 'Matroska', duration: '3725.5', size: '1048576', bit_rate: '8000000' },
      streams: [
        { codec_type: 'video', codec_name: 'hevc', width: 1920, height: 1080, r_frame_rate: '24000/1001' },
        { codec_type: 'audio', codec_name: 'aac', channels: 2, sample_rate: '48000', tags: { language: 'eng' } },
        { codec_type: 'audio', codec_name: 'ac3', channels: 6, tags: { language: 'rus' } },
        { codec_type: 'subtitle', codec_name: 'subrip' },
      ],
    }))
    mount()
    await screen.findByText('Matroska')
    expect(net.requests[0].url).toContain(`/ffp/${HASH}/3`)
    expect(screen.getByText('Show.S01E03.mkv')).toBeTruthy()
    expect(screen.getByText(/1920×1080/)).toBeTruthy()
    expect(screen.getByText(/Audio \(2\)/i)).toBeTruthy()
    expect(screen.getByText(/Video \(1\)/i)).toBeTruthy()
    expect(screen.getByText('1:02:06')).toBeTruthy()
  })

  it('shows the error and no stream cards when the probe fails', async () => {
    net = mockNetwork(() => ({ status: 500, data: { error: 'ffprobe not found' } }))
    mount()
    await waitFor(() => expect(document.querySelector('.text-danger')).not.toBeNull())
    expect(document.querySelector('article')).toBeNull()
  })

  it('says there is no data for a probe with no streams', async () => {
    net = mockNetwork(() => ({ streams: [], format: {} }))
    mount()
    expect(await screen.findByText('No probe data')).toBeTruthy()
  })

  it('does not probe while closed', async () => {
    net = mockNetwork(() => ({}))
    mount({ open: false })
    await new Promise(resolve => setTimeout(resolve, 30))
    expect(net.requests).toHaveLength(0)
  })

  it('aborts the in-flight probe when the dialog unmounts', async () => {
    let signal: AbortSignal | null | undefined
    net = mockNetwork(req => {
      if (pathOf(req.url).startsWith('/ffp/')) {
        signal = req.signal
        return new Promise(() => {})
      }
      return undefined
    })
    const view = mount()
    await waitFor(() => expect(signal).toBeTruthy())
    expect(signal?.aborted).toBe(false)
    view.unmount()
    expect(signal?.aborted).toBe(true)
  })

  it('Close calls onClose', async () => {
    net = mockNetwork(() => ({ streams: [], format: {} }))
    const onClose = vi.fn()
    mount({ onClose })
    await userEvent.click(await screen.findByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })
})

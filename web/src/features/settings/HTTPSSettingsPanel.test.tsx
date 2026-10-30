// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { isDisabled } from '../../test/dom'
import { axiosError, callsTo, routeApi } from '../../test/mockApi'
import { renderWithProviders } from '../../test/renderWithProviders'

import HTTPSSettingsPanel from './HTTPSSettingsPanel'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)

const status = (over: Record<string, unknown> = {}, cert: Record<string, unknown> = {}) => ({
  enabled: true,
  port: '8091',
  http_port: '8090',
  http_enabled: true,
  force_https: false,
  http_media: false,
  read_only: false,
  cert_from_flags: false,
  cert: {
    source: 'self-signed',
    cert_file: '/d/ts.crt',
    key_file: '/d/ts.key',
    trusted: false,
    ...cert,
  },
  ...over,
})

const pem = (name: string) => new File(['-----BEGIN-----'], name, { type: 'application/x-pem-file' })
const fileInputs = (container: HTMLElement) => container.querySelectorAll<HTMLInputElement>('input[type=file]')

describe('HTTPSSettingsPanel', () => {
  it('renders nothing when HTTPS is not enabled or the status request fails', async () => {
    routeApi({ 'GET /ssl/status': status({ enabled: false }) })
    const { container, unmount } = renderWithProviders(<HTTPSSettingsPanel onUpdate={vi.fn()} />)
    await waitFor(() => expect(callsTo('GET', '/ssl/status')).toHaveLength(1))
    expect(container.textContent).toBe('')
    unmount()

    routeApi({
      'GET /ssl/status': () => {
        throw axiosError(404)
      },
    })
    const second = renderWithProviders(<HTTPSSettingsPanel onUpdate={vi.fn()} />)
    await waitFor(() => expect(callsTo('GET', '/ssl/status')).toHaveLength(1))
    expect(second.container.textContent).toBe('')
  })

  it('describes the mode and a self-signed certificate', async () => {
    routeApi({ 'GET /ssl/status': status({ force_https: true }) })
    renderWithProviders(<HTTPSSettingsPanel onUpdate={vi.fn()} />)
    expect(await screen.findByText('HTTPS on port 8091, HTTP redirects to HTTPS')).toBeTruthy()
    expect(screen.getByText('Self-signed (managed by TorrServer)')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Regenerate' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Use self-signed' })).toBeNull()
  })

  it('uploads cert and key as multipart, syncs SslCert/SslKey, then clears the pickers', async () => {
    const after = status(
      {},
      {
        source: 'uploaded',
        cert_file: '/d/up.crt',
        key_file: '/d/up.key',
        trusted: true,
      },
    )
    routeApi({ 'GET /ssl/status': status(), 'POST /ssl/upload': after })
    const onUpdate = vi.fn()
    const { container } = renderWithProviders(<HTTPSSettingsPanel onUpdate={onUpdate} />)
    await screen.findByText('Mode')

    const upload = screen.getByRole('button', { name: 'Upload' })
    expect(isDisabled(upload)).toBe(true)
    await userEvent.upload(fileInputs(container)[0], pem('fullchain.pem'))
    expect(isDisabled(upload)).toBe(true)
    await userEvent.upload(fileInputs(container)[1], pem('privkey.pem'))
    expect(isDisabled(upload)).toBe(false)
    await userEvent.click(upload)

    expect(await screen.findByText('Certificate uploaded and in use.')).toBeTruthy()
    const form = callsTo('POST', '/ssl/upload')[0].body as FormData
    expect((form.get('cert') as File).name).toBe('fullchain.pem')
    expect((form.get('key') as File).name).toBe('privkey.pem')
    expect(onUpdate).toHaveBeenCalledWith('SslCert', '/d/up.crt')
    expect(onUpdate).toHaveBeenCalledWith('SslKey', '/d/up.key')
    expect(screen.getByText('Uploaded')).toBeTruthy()
    expect(isDisabled(screen.getByRole('button', { name: 'Upload' }))).toBe(true)
  })

  it('switches an uploaded certificate back to self-signed', async () => {
    routeApi({
      'GET /ssl/status': status({}, { source: 'uploaded', trusted: true }),
      'POST /ssl/selfsigned': status(),
    })
    renderWithProviders(<HTTPSSettingsPanel onUpdate={vi.fn()} />)
    await userEvent.click(await screen.findByRole('button', { name: 'Use self-signed' }))
    expect(await screen.findByText('Switched to the self-signed certificate.')).toBeTruthy()
    expect(callsTo('POST', '/ssl/selfsigned')).toHaveLength(1)
    expect(await screen.findByRole('button', { name: 'Regenerate' })).toBeTruthy()
  })

  it('shows the server error when the upload is rejected and keeps the chosen files', async () => {
    routeApi({
      'GET /ssl/status': status(),
      'POST /ssl/upload': () => {
        throw axiosError(400, { error: 'tls: failed to parse private key' })
      },
    })
    const { container } = renderWithProviders(<HTTPSSettingsPanel onUpdate={vi.fn()} />)
    await screen.findByText('Mode')
    await userEvent.upload(fileInputs(container)[0], pem('a.pem'))
    await userEvent.upload(fileInputs(container)[1], pem('b.key'))
    await userEvent.click(screen.getByRole('button', { name: 'Upload' }))
    expect(await screen.findByText('tls: failed to parse private key')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'a.pem' })).toBeTruthy()
  })

  it('locks every control when the server is read-only or the cert comes from flags', async () => {
    routeApi({
      'GET /ssl/status': status({ read_only: true, cert_from_flags: true }),
    })
    renderWithProviders(<HTTPSSettingsPanel onUpdate={vi.fn()} />)
    await screen.findByText('Mode')
    expect(isDisabled(screen.getByRole('button', { name: 'Regenerate' }))).toBe(true)
    expect(isDisabled(screen.getByRole('button', { name: 'Use these files' }))).toBe(true)
    expect(screen.getByText(/--sslcert\/--sslkey/)).toBeTruthy()
  })

  it('applies certificate paths', async () => {
    routeApi({
      'GET /ssl/status': status(),
      'POST /ssl/paths': status({}, { source: 'user', cert_file: '/le/full.pem', key_file: '/le/priv.pem' }),
    })
    renderWithProviders(<HTTPSSettingsPanel onUpdate={vi.fn()} />)
    await screen.findByText('Mode')
    await userEvent.type(screen.getByLabelText('Certificate file (full chain)'), '/le/full.pem')
    await userEvent.type(screen.getByLabelText('Private key file'), '/le/priv.pem')
    await userEvent.click(screen.getByRole('button', { name: 'Use these files' }))
    expect(await screen.findByText('Certificate files in use.')).toBeTruthy()
    expect(callsTo('POST', '/ssl/paths')[0].body).toEqual({
      cert: '/le/full.pem',
      key: '/le/priv.pem',
    })
  })
})

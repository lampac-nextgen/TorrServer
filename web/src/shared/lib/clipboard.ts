/**
 * Copy text to the clipboard.
 *
 * `navigator.clipboard` only works in a secure context (HTTPS or localhost).
 * TorrServer is often opened as `http://192.168.x.x` on phones — that fails.
 * Fall back to a hidden textarea + `document.execCommand('copy')`, which still
 * works from a user gesture on iOS Safari / Android Chrome over plain HTTP.
 */
export async function copyToClipboard(text: string): Promise<void> {
  const secure =
    typeof globalThis !== 'undefined' &&
    'isSecureContext' in globalThis &&
    Boolean((globalThis as { isSecureContext?: boolean }).isSecureContext)

  if (secure && typeof navigator !== 'undefined' && typeof navigator.clipboard?.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Fall through to legacy path (permissions / transient failures).
    }
  }

  copyWithExecCommand(text)
}

function copyWithExecCommand(text: string): void {
  if (typeof document === 'undefined') {
    throw new Error('Clipboard unavailable')
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.setAttribute('aria-hidden', 'true')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.width = '1px'
  textarea.style.height = '1px'
  textarea.style.padding = '0'
  textarea.style.border = 'none'
  textarea.style.outline = 'none'
  textarea.style.boxShadow = 'none'
  textarea.style.background = 'transparent'
  textarea.style.opacity = '0'

  document.body.appendChild(textarea)

  const selection = document.getSelection()
  const previousRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

  textarea.focus()
  textarea.select()
  textarea.setSelectionRange(0, text.length)

  let ok = false
  try {
    ok = document.execCommand('copy')
  } finally {
    document.body.removeChild(textarea)
    if (selection) {
      selection.removeAllRanges()
      if (previousRange) selection.addRange(previousRange)
    }
  }

  if (!ok) throw new Error('Clipboard copy failed')
}

export default function checkIsIOS(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false

  return /iPhone|iPad|iPod/i.test(navigator.userAgent || (navigator as Navigator & { vendor?: string }).vendor || '')
}

import Button, { type ButtonProps } from '@mui/material/Button'
import { useEffect, useState, type ReactNode } from 'react'

interface UnsafeButtonProps extends ButtonProps {
  timeout?: number
  children?: ReactNode
}

/** Destructive action button with optional countdown delay. */
export default function UnsafeButton({ timeout = 5, children, disabled, ...props }: UnsafeButtonProps) {
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [now, setNow] = useState(() => Date.now())

  // Restart countdown when timeout/disabled identity changes (subscribe-only effect).
  useEffect(() => {
    if (disabled || timeout <= 0) return undefined
    const start = Date.now()
    setStartedAt(start)
    setNow(start)
    const intervalId = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(intervalId)
  }, [disabled, timeout])

  const timeLeft =
    disabled || timeout <= 0 ? 0 : Math.max(0, timeout - Math.floor((now - startedAt) / 1000))
  const buttonDisabled = Boolean(disabled) || timeLeft > 0
  const timerText = !disabled && timeLeft > 0 ? ` (${timeLeft})` : ''

  return (
    <Button disabled={buttonDisabled} {...props}>
      {children}
      {timerText}
    </Button>
  )
}

import { Button, type ButtonProps } from '@mui/material'
import { useEffect, useState, type ReactNode } from 'react'

interface UnsafeButtonProps extends ButtonProps {
  timeout?: number
  children?: ReactNode
}

export default function UnsafeButton({ timeout = 7, children, disabled, ...props }: UnsafeButtonProps) {
  const [timeLeft, setTimeLeft] = useState(timeout)
  const [buttonDisabled, setButtonDisabled] = useState(Boolean(disabled) || timeLeft > 0)

  useEffect(() => {
    if (disabled || timeLeft <= 0) {
      setButtonDisabled(Boolean(disabled))
      return
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1
        if (next <= 0) setButtonDisabled(Boolean(disabled))
        return next
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [disabled, timeLeft])

  const timerText = !disabled && timeLeft > 0 ? ` (${timeLeft})` : ''

  return (
    <Button disabled={buttonDisabled} {...props}>
      {children}
      {timerText}
    </Button>
  )
}

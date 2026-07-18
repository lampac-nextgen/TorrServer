import { Component, type ErrorInfo, type ReactNode } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message?: string
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error?.message || 'Unexpected error' }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI error boundary caught:', error, info.componentStack)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          padding: 24,
          textAlign: 'center',
          gap: 16,
        }}
      >
        <Typography variant='h5' component='h1'>
          Something went wrong
        </Typography>
        {this.state.message && (
          <Typography variant='body2' color='text.secondary'>
            {this.state.message}
          </Typography>
        )}
        <Button variant='contained' color='primary' onClick={this.handleReload}>
          Reload
        </Button>
      </div>
    )
  }
}

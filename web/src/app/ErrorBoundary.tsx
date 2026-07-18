import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message?: string
}

/** Plain HTML fallback — sits outside ThemeProvider. */
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
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Something went wrong</h1>
        {this.state.message ? <p style={{ margin: 0, color: '#666', maxWidth: 480 }}>{this.state.message}</p> : null}
        <button
          type='button'
          onClick={this.handleReload}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: '#00a572',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Reload
        </button>
      </div>
    )
  }
}

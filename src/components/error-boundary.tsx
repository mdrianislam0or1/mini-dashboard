"use client"

import { motion } from "framer-motion";
import { Component, type ReactNode } from "react";
import { Button } from "./button";

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-6">💥</div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">An unexpected error occurred. Please try refreshing the page.</p>
            <div className="space-x-4">
              <Button onClick={() => window.location.reload()} variant="primary">
                Refresh Page
              </Button>
              <Button onClick={() => this.setState({ hasError: false })} variant="secondary">
                Try Again
              </Button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground">Error Details (Development)</summary>
                <pre className="mt-2 p-4 bg-muted rounded text-xs overflow-auto">{this.state.error.stack}</pre>
              </details>
            )}
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

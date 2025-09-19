"use client"

import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({ message, onRetry, className = "" }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center ${className}`}
    >
      <div className="text-destructive text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-destructive mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </motion.div>
  )
}

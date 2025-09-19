"use client"

import { Button } from "@/components/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Page error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong!</h1>
        <p className="text-muted-foreground mb-6">An error occurred while loading this page. Please try again.</p>
        <div className="space-x-4">
          <Button onClick={reset} variant="primary">
            Try Again
          </Button>
          <Button onClick={() => (window.location.href = "/")} variant="secondary">
            Go Home
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground">Error Details (Development)</summary>
            <pre className="mt-2 p-4 bg-muted rounded text-xs overflow-auto">
              {error.message}
              {error.stack && `\n${error.stack}`}
            </pre>
          </details>
        )}
      </motion.div>
    </div>
  )
}

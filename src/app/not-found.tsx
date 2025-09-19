"use client"

import { Button } from "@/components/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
          className="text-8xl mb-6"
        >
          🔍
        </motion.div>
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="space-x-4">
          <Link href="/">
            <Button variant="primary">Go Home</Button>
          </Link>
          <Button onClick={() => window.history.back()} variant="secondary">
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

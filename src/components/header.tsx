'use client'

import { AuthButton } from '@/components/auth-button'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass border-b border-border/50 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <span className="text-lg">☰</span>
          </motion.button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow"
          >
            <span className="text-white font-bold text-sm">D</span>
          </motion.div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gradient">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back! 👋</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-48 xl:w-64 px-4 py-2 bg-muted/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              🔍
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <span className="text-lg">🔔</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse"></span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <span className="text-lg">{isDarkMode ? '🌙' : '☀️'}</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AuthButton />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

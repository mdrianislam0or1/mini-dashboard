'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: '🏠' },
  { name: 'Posts', href: '/posts', icon: '📝' },
  { name: 'Users', href: '/users', icon: '👥' },
  { name: 'Profile', href: '/profile', icon: '👤' },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="glass border-r border-border/50 backdrop-blur-md flex flex-col shadow-glow-purple hidden md:flex"
    >
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <h1 className="text-lg font-bold text-gradient">Dashboard</h1>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-lg">←</span>
            </motion.div>
          </motion.button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'gradient-primary text-white shadow-glow'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground hover:shadow-md'
                  }`}
                >
                  <motion.span
                    className="text-xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {item.icon}
                  </motion.span>
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 border-t border-border/50"
      >
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl gradient-accent flex items-center justify-center shadow-glow-teal">
                <span className="text-white font-bold">⚡</span>
              </div>
              <p className="text-xs text-muted-foreground">v2.0.1</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

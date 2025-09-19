"use client"

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggeredContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggeredContainer({ children, className = "", staggerDelay = 0.1 }: StaggeredContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredItemProps {
  children: ReactNode
  className?: string
}

export function StaggeredItem({ children, className = "" }: StaggeredItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

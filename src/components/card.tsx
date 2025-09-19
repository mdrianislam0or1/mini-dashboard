"use client"

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
  delay?: number
}

export function Card({ children, className = "", onClick, hover = false, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      onClick={onClick}
      className={`
        card-modern p-6
        ${onClick ? "cursor-pointer" : ""}
        ${hover ? "transition-all duration-300 hover:shadow-glow" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return <h3 className={`text-lg font-bold text-card-foreground ${className}`}>{children}</h3>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`text-muted-foreground ${className}`}>{children}</div>
}

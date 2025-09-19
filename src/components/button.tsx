"use client"

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "destructive"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl",
  }

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-12 px-6 text-lg",
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </motion.button>
  )
}

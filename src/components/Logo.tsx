'use client'

import { motion } from 'framer-motion'
import { Heart, Hand } from 'lucide-react'

interface LogoProps {
  variant?: 'full' | 'icon' | 'text'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  }

  const iconSize = iconSizes[size]

  if (variant === 'icon') {
    return (
      <motion.div
        className={`flex items-center justify-center ${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          <Hand className="text-accent" size={iconSize} />
          <Heart 
            className="absolute -top-1 -right-1 text-highlight" 
            size={iconSize * 0.6} 
            fill="currentColor"
          />
        </div>
      </motion.div>
    )
  }

  if (variant === 'text') {
    return (
      <motion.h1 
        className={`font-bold text-secondary ${sizeClasses[size]} ${className}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        DeBabs
      </motion.h1>
    )
  }

  return (
    <motion.div
      className={`flex items-center space-x-3 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <Hand className="text-accent" size={iconSize} />
        <Heart 
          className="absolute -top-1 -right-1 text-highlight" 
          size={iconSize * 0.6} 
          fill="currentColor"
        />
      </div>
      <h1 className={`font-bold text-secondary ${sizeClasses[size]}`}>
        DeBabs
      </h1>
    </motion.div>
  )
}

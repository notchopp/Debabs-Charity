'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'

interface LogoProps {
  variant?: 'icon' | 'full'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32
  }

  return (
    <Link href="/" className={`flex items-center space-x-2 ${sizeClasses[size]} ${className}`}>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Heart 
          className="text-highlight" 
          size={iconSizes[size]}
          fill="currentColor"
        />
      </motion.div>
      {variant === 'full' && (
        <motion.span
          className="font-bold text-secondary"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          DeBabs
        </motion.span>
      )}
    </Link>
  )
}


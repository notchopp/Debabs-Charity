'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function AnimatedLogo({ size = 'md', className = '' }: AnimatedLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  return (
    <motion.div
      className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
      }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut"
      }}
    >
      <motion.div
        className="relative"
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="absolute inset-0 bg-highlight/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="relative bg-gradient-to-br from-highlight to-purple rounded-full p-4 shadow-2xl"
          whileHover={{ scale: 1.1 }}
        >
          <Heart 
            className="text-white" 
            size={size === 'sm' ? 24 : size === 'md' ? 48 : 64}
            fill="currentColor"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}


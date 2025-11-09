'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import AnimatedLogo from '@/components/AnimatedLogo'

export default function IntroPage() {
  const [showButton, setShowButton] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Show button after logo animation
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    router.push('/')
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#00A86B] via-[#1A4CC7] to-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
          }}
          transition={{ 
            duration: 1,
            ease: "easeOut"
          }}
          className="mb-8"
        >
          <AnimatedLogo size="lg" />
        </motion.div>

        {/* DeBabs Charity Text */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-12 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          DeBabs Charity
        </motion.h1>

        {/* Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                onClick={handleEnter}
                className="px-10 py-5 bg-white text-[#1A4CC7] text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-shadow"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Help Your Neighbor Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

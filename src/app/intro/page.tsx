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
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
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
        >
          <AnimatedLogo size="lg" />
        </motion.div>

        {/* Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12"
            >
              <motion.button
                onClick={handleEnter}
                className="px-8 py-4 bg-gradient-to-r from-highlight to-purple text-white text-lg font-semibold rounded-full shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 168, 107, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Give Back Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


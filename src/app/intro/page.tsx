'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight, Heart } from 'lucide-react'

export default function IntroPage() {
  const [showButton, setShowButton] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    router.push('/home')
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#00A86B] via-[#6B3FA0] to-[#1A4CC7] z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Logo Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
            <Heart className="text-white" size={40} fill="currentColor" />
          </div>
        </motion.div>

        {/* DeBabs Charity Name */}
        <motion.h1
          className="text-6xl md:text-8xl font-light text-white mb-8 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          DeBabs Charity
        </motion.h1>

        {/* Tagline */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight drop-shadow-md">
            Give. Share. Impact.
          </h2>
        </motion.div>

        {/* Why Section - Charity Focused */}
        <motion.div
          className="mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light drop-shadow-sm">
            Empowering communities through the gift of giving. 
            Every donation creates hope, every item finds a home, every act of kindness builds a stronger community.
          </p>
        </motion.div>

        {/* Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                onClick={handleEnter}
                className="group px-10 py-5 bg-white text-[#1A4CC7] text-lg font-medium rounded-full shadow-2xl flex items-center space-x-3 mx-auto"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(255, 255, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Help Your Neighbor</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

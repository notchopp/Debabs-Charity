'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-[#00A86B]/20 via-[#6B3FA0]/20 to-[#1A4CC7]/20 backdrop-blur-xl border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
        <Link href="/home">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <Heart className="text-white" size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                DeBabs Charity
              </h1>
            </div>
          </motion.div>
        </Link>
      </div>
    </motion.header>
  )
}


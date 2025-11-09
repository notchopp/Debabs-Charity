'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function DonationsPage() {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
          My Donations
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mb-12">
          View and manage items you&apos;ve donated to the community
        </p>

        {/* Empty State */}
        <div className="text-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Heart className="text-white" size={48} />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">No Donations Yet</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Start making a difference by donating items to your community
            </p>
            <Link href="/donate">
              <motion.button
                className="px-8 py-4 bg-white text-[#1A4CC7] rounded-xl font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Donate Your First Item
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

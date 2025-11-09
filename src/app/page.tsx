'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to intro page on first load
    router.push('/intro')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-neutral-500">Loading...</p>
      </motion.div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import DonateForm from '@/components/DonateForm'

export default function DonatePage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-highlight/10 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heart className="text-highlight" size={40} fill="currentColor" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Donate an Item
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            Share what you have with your community. Your donation can make a real difference in someone&apos;s life.
          </p>
        </motion.div>

        {/* Form */}
        <DonateForm />

        {/* Additional Info */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-accent/5 to-highlight/5 rounded-2xl p-8 border border-neutral-200">
            <h3 className="text-2xl font-semibold text-secondary mb-4">
              What Happens Next?
            </h3>
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start space-x-3">
                <ArrowRight className="text-accent mt-1 flex-shrink-0" size={20} />
                <span>Your item will be reviewed and posted to our community marketplace</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowRight className="text-accent mt-1 flex-shrink-0" size={20} />
                <span>Community members can browse and request your item</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowRight className="text-accent mt-1 flex-shrink-0" size={20} />
                <span>You&apos;ll be notified when someone is interested</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowRight className="text-accent mt-1 flex-shrink-0" size={20} />
                <span>Together, we build stronger, more connected communities</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


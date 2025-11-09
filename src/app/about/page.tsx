'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Target, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Generosity',
      description: 'We believe in the power of giving and the impact it creates in communities.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building connections and strengthening bonds through shared resources.',
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Every donation, no matter how small, creates meaningful change.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Using modern technology to make generosity effortless and accessible.',
    },
  ]

  return (
    <div className="min-h-screen p-6 md:p-12">
      {/* Hero Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-light text-secondary mb-6 tracking-tight">
          About DeBabs Charity
        </h1>
        <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed max-w-3xl">
          We&apos;re on a mission to make generosity effortless and build stronger communities through meaningful connections.
        </p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-secondary mb-6 tracking-tight">
          Our Mission
        </h2>
        <div className="space-y-4 text-lg text-neutral-600 leading-relaxed max-w-3xl">
          <p>
            DeBabs Charity was founded on a simple belief: generosity should be effortless. 
            In a world where we often have more than we need, we created a platform that makes 
            it easy to share with those who could benefit from what we have to offer.
          </p>
          <p>
            Our platform connects community members who want to donate items with those who need them. 
            Whether it&apos;s furniture, clothing, electronics, or household items, every donation 
            creates a ripple effect of kindness and support.
          </p>
          <p>
            We&apos;re not just about transactions—we&apos;re about transformation. Every item 
            donated represents a connection made, a need met, and a community strengthened.
          </p>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-secondary mb-12 tracking-tight">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#00A86B]/10 to-[#1A4CC7]/10 rounded-xl flex items-center justify-center mb-4">
                <value.icon className="text-[#1A4CC7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {value.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-secondary mb-6 tracking-tight">
          Join Us in Making a Difference
        </h2>
        <p className="text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">
          Whether you&apos;re looking to donate or find items you need, 
          you&apos;re welcome to be part of our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#00A86B] to-[#1A4CC7] text-white rounded-xl font-medium shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={20} className="inline mr-2" fill="currentColor" />
              Donate an Item
            </motion.button>
          </Link>
          <Link href="/">
            <motion.button
              className="px-8 py-4 bg-white border border-neutral-200 text-secondary rounded-xl font-medium hover:bg-neutral-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Items
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

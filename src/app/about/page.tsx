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
        <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight">
          About DeBabs Charity
        </h1>
        <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl">
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
        <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
          Our Mission
        </h2>
        <div className="space-y-4 text-lg text-white/80 leading-relaxed max-w-3xl">
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
        <h2 className="text-3xl md:text-4xl font-light text-white mb-12 tracking-tight">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/15 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 border border-white/20">
                <value.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
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
        <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
          Join Us in Making a Difference
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Whether you&apos;re looking to donate or find items you need, 
          you&apos;re welcome to be part of our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate">
            <motion.button
              className="px-8 py-4 bg-white text-[#1A4CC7] rounded-xl font-medium shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={20} className="inline mr-2" fill="currentColor" />
              Donate an Item
            </motion.button>
          </Link>
          <Link href="/home">
            <motion.button
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-medium hover:bg-white/20"
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

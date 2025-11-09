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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-white to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
              About DeBabs Charity
            </h1>
            <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed">
              We&apos;re on a mission to make generosity effortless and build stronger communities through meaningful connections.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              DeBabs Charity was founded on a simple belief: generosity should be effortless. 
              In a world where we often have more than we need, we created a platform that makes 
              it easy to share with those who could benefit from what we have to offer.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              Our platform connects community members who want to donate items with those who need them. 
              Whether it&apos;s furniture, clothing, electronics, or household items, every donation 
              creates a ripple effect of kindness and support.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed">
              We&apos;re not just about transactions—we&apos;re about transformation. Every item 
              donated represents a connection made, a need met, and a community strengthened.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/5 to-highlight/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our Values
            </h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6">
                  <value.icon className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re looking to donate or find items you need, 
              you&apos;re welcome to be part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <motion.button
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={20} />
                  <span>Donate an Item</span>
                </motion.button>
              </Link>
              <Link href="/items">
                <motion.button
                  className="btn-outline text-lg px-8 py-4 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Browse Items</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


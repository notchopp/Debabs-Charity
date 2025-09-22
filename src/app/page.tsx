'use client'

import Hero from '@/components/Hero'
import { motion } from 'framer-motion'
import { Package, Users, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const features = [
    {
      icon: Package,
      title: 'Browse Items',
      description: 'Discover donated items in your community. From furniture to clothing, find what you need.',
      link: '/items'
    },
    {
      icon: Heart,
      title: 'Donate Items',
      description: 'Give back to your community by donating items you no longer need.',
      link: '/donate'
    },
    {
      icon: Users,
      title: 'Connect Community',
      description: 'Build stronger communities through meaningful donations and connections.',
      link: '/about'
    }
  ]

  const stats = [
    { value: '500+', label: 'Families Helped' },
    { value: '1,200+', label: 'Items Donated' },
    { value: '25+', label: 'Communities' },
    { value: '98%', label: 'Satisfaction Rate' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              How It Works
            </h2>
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Simple steps to make a difference in your community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-2xl mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <feature.icon className="text-accent" size={40} />
                </div>
                <h3 className="text-2xl font-semibold text-secondary mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-500 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Link href={feature.link}>
                  <motion.button
                    className="btn-outline flex items-center space-x-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-accent/5 to-highlight/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Together, we're making a real difference in communities across the region
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-500 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Join thousands of community members who are already making generosity effortless
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <motion.button
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={20} />
                  <span>Start Donating</span>
                </motion.button>
              </Link>
              <Link href="/items">
                <motion.button
                  className="btn-outline text-lg px-8 py-4 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Package size={20} />
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
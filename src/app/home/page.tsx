'use client'

import { motion } from 'framer-motion'
import { Package, ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'
import ItemCard from '@/components/ItemCard'
import { Item } from '@/lib/supabaseClient'

// Most recent items (last 6)
const recentItems: Item[] = [
  {
    id: '1',
    title: 'Vintage Coffee Table',
    description: 'Beautiful wooden coffee table in excellent condition. Perfect for any living room.',
    image_url: null,
    pickup_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Children\'s Books Collection',
    description: 'Set of 50+ children\'s books, ages 3-10. Great for families or schools.',
    image_url: null,
    pickup_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Winter Coat - Size Large',
    description: 'Warm winter coat, gently used. Perfect for someone in need this season.',
    image_url: null,
    pickup_available: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Kitchen Appliances Set',
    description: 'Complete set of kitchen appliances including blender, toaster, and coffee maker.',
    image_url: null,
    pickup_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Bicycle - Adult Size',
    description: 'Well-maintained bicycle, perfect for commuting or exercise. Includes helmet.',
    image_url: null,
    pickup_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Furniture Set',
    description: 'Complete bedroom set including bed frame, dresser, and nightstand.',
    image_url: null,
    pickup_available: true,
    created_at: new Date().toISOString(),
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Video Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
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
        </div>

        {/* Video Placeholder */}
        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-video bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <Heart className="text-white" size={40} fill="currentColor" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
                About DeBabs Charity
              </h2>
              <p className="text-white/80 text-lg">
                Video placeholder - Learn how we connect communities through giving
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Recent Items Section */}
      <section className="p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">
                Recent Donations
              </h2>
              <p className="text-white/80">
                Latest items from our generous community members
              </p>
            </div>
            <Link href="/browse">
              <motion.button
                className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium flex items-center space-x-2 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Browse All</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ItemCard item={item} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

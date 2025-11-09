'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Search, Filter, MapPin, Heart } from 'lucide-react'
import Link from 'next/link'
import ItemCard from '@/components/ItemCard'
import { Item } from '@/lib/supabaseClient'

// Placeholder items data
const placeholderItems: Item[] = [
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
  {
    id: '7',
    title: 'Baby Stroller',
    description: 'Lightweight stroller in great condition. Perfect for new parents.',
    image_url: null,
    pickup_available: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Electronics Bundle',
    description: 'Various electronics including tablets, phones, and accessories.',
    image_url: null,
    pickup_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Office Chair',
    description: 'Ergonomic office chair, excellent condition. Perfect for home office.',
    image_url: null,
    pickup_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '10',
    title: 'Art Supplies Collection',
    description: 'Complete art supplies set with paints, brushes, canvases, and more.',
    image_url: null,
    pickup_available: false,
    created_at: new Date().toISOString(),
  },
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPickup, setFilterPickup] = useState<boolean | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredItems = placeholderItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPickup = filterPickup === null || item.pickup_available === filterPickup
    return matchesSearch && matchesPickup
  })

  return (
    <div className="min-h-screen p-6 md:p-12">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
          Browse All Items
        </h1>
        <p className="text-lg text-white/80 max-w-2xl">
          Explore all items donated by our community members
        </p>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center space-x-2 text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter size={20} />
            <span className="font-medium">Filters</span>
          </motion.button>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
            >
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFilterPickup(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterPickup === null
                      ? 'bg-white text-[#1A4CC7]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setFilterPickup(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                    filterPickup === true
                      ? 'bg-white text-[#1A4CC7]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <MapPin size={16} />
                  <span>Pickup Available</span>
                </button>
                <button
                  onClick={() => setFilterPickup(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterPickup === false
                      ? 'bg-white text-[#1A4CC7]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  No Pickup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <p className="text-sm text-white/70 mt-4">
          Showing {filteredItems.length} of {placeholderItems.length} items
        </p>
      </motion.div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Package className="text-white/40 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-semibold text-white mb-2">No Items Found</h2>
          <p className="text-white/70 mb-6">
            Try adjusting your search or filters
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ItemCard item={item} index={index} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}


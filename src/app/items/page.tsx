'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Calendar, MapPin } from 'lucide-react'
import { supabase, Item } from '@/lib/supabase'

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState({
    category: 'All',
    condition: 'All',
    pickupOnly: false,
    search: ''
  })

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [items, filters])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error fetching items:', error)
      setError('Failed to load items. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    let filtered = [...items]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(item => item.category === filters.category)
    }

    // Condition filter
    if (filters.condition !== 'All') {
      filtered = filtered.filter(item => item.condition === filters.condition)
    }

    // Pickup only filter
    if (filters.pickupOnly) {
      filtered = filtered.filter(item => item.pickup_available)
    }

    setFilteredItems(filtered)
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-neutral-500">Loading items...</p>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-error text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-secondary mb-4">Oops! Something went wrong</h2>
            <p className="text-neutral-500 mb-6">{error}</p>
            <button
              onClick={fetchItems}
              className="btn-primary"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
            Available Items
          </h1>
          <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
            Discover donated items in your community. Find what you need and help others find what they need.
          </p>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-neutral-500">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </motion.div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-neutral-400 text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-secondary mb-4">
              No items found
            </h3>
            <p className="text-neutral-500 mb-6">
              Try adjusting your filters or check back later for new donations.
            </p>
            <button
              onClick={() => setFilters({
                category: 'All',
                condition: 'All',
                pickupOnly: false,
                search: ''
              })}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="card p-6 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-neutral-100">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Package className="text-neutral-400" size={48} />
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Pickup Available Badge */}
                  {item.pickup_available && (
                    <div className="absolute top-3 right-3">
                      <motion.div
                        className="bg-highlight text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MapPin size={12} />
                        <span>Pickup</span>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-secondary group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-500 text-sm line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-neutral-500">
                      <Calendar size={16} />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="text-sm font-medium text-accent">
                      {item.condition}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className="w-full btn-outline mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

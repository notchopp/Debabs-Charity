'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Loader2 } from 'lucide-react'
import { supabase, Item } from '@/lib/supabaseClient'
import ItemCard from '@/components/ItemCard'

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setItems(data || [])
    } catch (err: any) {
      console.error('Error fetching items:', err)
      setError(err.message || 'Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="animate-spin text-accent mx-auto mb-4" size={48} />
          <p className="text-neutral-500">Loading items...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <Package className="text-error mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-secondary mb-2">Error Loading Items</h2>
          <p className="text-neutral-500">{error}</p>
        </motion.div>
      </div>
    )
  }

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
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Available Items
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            Browse through items donated by our community members. Find what you need or get inspired to donate.
          </p>
        </motion.div>

        {/* Items Grid */}
        {items.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Package className="text-neutral-400 mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-secondary mb-2">No Items Available</h2>
            <p className="text-neutral-500 mb-6">
              Be the first to donate an item to our community!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <ItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


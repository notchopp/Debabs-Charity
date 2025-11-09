'use client'

import { motion } from 'framer-motion'
import { Package, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Item } from '@/lib/supabaseClient'

interface ItemCardProps {
  item: Item
  index?: number
}

export default function ItemCard({ item, index = 0 }: ItemCardProps) {
  return (
    <motion.div
      className="card overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Image */}
      <div className="relative w-full h-64 bg-neutral-300 overflow-hidden">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-highlight/10">
            <Package className="text-neutral-500" size={64} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-secondary mb-2 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-neutral-500 mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        {/* Badges */}
        <div className="flex items-center justify-between">
          {item.pickup_available && (
            <motion.div
              className="flex items-center space-x-2 text-highlight"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <MapPin size={16} />
              <span className="text-sm font-medium">Pickup Available</span>
            </motion.div>
          )}
          <span className="text-xs text-neutral-400">
            {new Date(item.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}


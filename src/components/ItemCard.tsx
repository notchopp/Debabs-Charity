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
      className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden group cursor-pointer border border-white/20 hover:bg-white/15 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Image */}
      <div className="relative w-full h-64 bg-white/10 overflow-hidden">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00A86B]/20 to-[#1A4CC7]/20">
            <Package className="text-white/60" size={64} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-white/80 mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        {/* Badges */}
        <div className="flex items-center justify-between">
          {item.pickup_available && (
            <motion.div
              className="flex items-center space-x-2 text-white bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <MapPin size={14} />
              <span>Pickup Available</span>
            </motion.div>
          )}
          <span className="text-xs text-white/60">
            {new Date(item.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

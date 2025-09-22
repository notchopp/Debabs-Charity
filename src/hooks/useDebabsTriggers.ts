'use client'

import { useEffect, useState } from 'react'
import { useTriggerOS } from './useTriggerOS'

// Hook for scroll-based triggers
export function useScrollTriggers() {
  const { addHotTrigger, removeHotTrigger } = useTriggerOS()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Highlight Donate CTA if user scrolls halfway down homepage
      const halfwayPoint = window.innerHeight / 2
      if (currentScrollY > halfwayPoint) {
        addHotTrigger('highlight-donate-cta')
      } else {
        removeHotTrigger('highlight-donate-cta')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [addHotTrigger, removeHotTrigger])

  return { scrollY }
}

// Hook for item viewing behavior triggers
export function useItemViewTriggers() {
  const { addSmartTrigger, removeSmartTrigger } = useTriggerOS()
  const [viewedItems, setViewedItems] = useState<Set<string>>(new Set())
  const [categoryViews, setCategoryViews] = useState<Map<string, number>>(new Map())

  const trackItemView = (itemId: string, category: string) => {
    setViewedItems(prev => new Set([...prev, itemId]))
    
    // Track category views
    setCategoryViews(prev => {
      const newMap = new Map(prev)
      const currentCount = newMap.get(category) || 0
      newMap.set(category, currentCount + 1)
      return newMap
    })
  }

  useEffect(() => {
    // Auto-suggest most popular categories
    const mostPopularCategory = Array.from(categoryViews.entries())
      .sort(([,a], [,b]) => b - a)[0]?.[0]
    
    if (mostPopularCategory) {
      addSmartTrigger(`suggest-category-${mostPopularCategory}`)
    }
  }, [categoryViews, addSmartTrigger])

  useEffect(() => {
    // If user views >3 clothing items → highlight clothing filter
    const clothingViews = categoryViews.get('clothing') || 0
    if (clothingViews > 3) {
      addSmartTrigger('highlight-clothing-filter')
    } else {
      removeSmartTrigger('highlight-clothing-filter')
    }
  }, [categoryViews, addSmartTrigger, removeSmartTrigger])

  return { viewedItems, categoryViews, trackItemView }
}

// Hook for local items detection
export function useLocalItemsTrigger() {
  const { addHotTrigger, removeHotTrigger } = useTriggerOS()
  const [localItemsCount, setLocalItemsCount] = useState(0)

  const checkLocalItems = async () => {
    // In a real implementation, this would check for items in user's area
    // For now, we'll simulate with a random number
    const count = Math.floor(Math.random() * 10)
    setLocalItemsCount(count)
    
    if (count > 0) {
      addHotTrigger('pulse-pickup-filter')
    } else {
      removeHotTrigger('pulse-pickup-filter')
    }
  }

  useEffect(() => {
    checkLocalItems()
    // Check periodically
    const interval = setInterval(checkLocalItems, 30000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return { localItemsCount, checkLocalItems }
}

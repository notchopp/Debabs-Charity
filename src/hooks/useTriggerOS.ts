'use client'

import { useState, useEffect, useCallback } from 'react'

// TriggerOS Logic Hook for DeBabs Charity
export function useTriggerOS() {
  const [triggers, setTriggers] = useState({
    hot: new Set<string>(),
    smart: new Set<string>(),
    sight: new Set<string>(),
    reflex: new Set<string>()
  })

  // Hot Triggers - Immediate user interaction based
  const addHotTrigger = useCallback((triggerId: string) => {
    setTriggers(prev => ({
      ...prev,
      hot: new Set([...prev.hot, triggerId])
    }))
  }, [])

  const removeHotTrigger = useCallback((triggerId: string) => {
    setTriggers(prev => {
      const newHot = new Set(prev.hot)
      newHot.delete(triggerId)
      return { ...prev, hot: newHot }
    })
  }, [])

  // Smart Triggers - Behavior pattern based
  const addSmartTrigger = useCallback((triggerId: string) => {
    setTriggers(prev => ({
      ...prev,
      smart: new Set([...prev.smart, triggerId])
    }))
  }, [])

  const removeSmartTrigger = useCallback((triggerId: string) => {
    setTriggers(prev => {
      const newSmart = new Set(prev.smart)
      newSmart.delete(triggerId)
      return { ...prev, smart: newSmart }
    })
  }, [])

  // Sight Triggers - Visual/UI state based
  const addSightTrigger = useCallback((triggerId: string) => {
    setTriggers(prev => ({
      ...prev,
      sight: new Set([...prev.sight, triggerId])
    }))
  }, [])

  const removeSightTrigger = useCallback((triggerId: string) => {
    setTriggers(prev => {
      const newSight = new Set(prev.sight)
      newSight.delete(triggerId)
      return { ...prev, sight: newSight }
    })
  }, [])

  // Reflex Triggers - Automatic response based
  const addReflexTrigger = useCallback((triggerId: string) => {
    setTriggers(prev => ({
      ...prev,
      reflex: new Set([...prev.reflex, triggerId])
    }))
  }, [])

  const removeReflexTrigger = useCallback((triggerId: string) => {
    setTriggers(prev => {
      const newReflex = new Set(prev.reflex)
      newReflex.delete(triggerId)
      return { ...prev, reflex: newReflex }
    })
  }, [])

  // Check if trigger is active
  const isTriggerActive = useCallback((triggerId: string, type?: 'hot' | 'smart' | 'sight' | 'reflex') => {
    if (type) {
      return triggers[type].has(triggerId)
    }
    return Object.values(triggers).some(triggerSet => triggerSet.has(triggerId))
  }, [triggers])

  return {
    triggers,
    addHotTrigger,
    removeHotTrigger,
    addSmartTrigger,
    removeSmartTrigger,
    addSightTrigger,
    removeSightTrigger,
    addReflexTrigger,
    removeReflexTrigger,
    isTriggerActive
  }
}

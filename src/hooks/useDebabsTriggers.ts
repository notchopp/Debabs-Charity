'use client'

import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export function useScrollTriggers() {
  const { scrollY } = useScroll()
  const [scrollYValue, setScrollYValue] = useState(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrollYValue(latest)
  })

  return { scrollY: scrollYValue }
}


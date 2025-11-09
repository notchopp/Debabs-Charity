'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Heart, Info, List, Menu, X, ChevronLeft } from 'lucide-react'

const navItems = [
  { href: '/home', label: 'Browse', icon: Package },
  { href: '/donate', label: 'Donate', icon: Heart },
  { href: '/about', label: 'About', icon: Info },
  { href: '/donations', label: 'My Donations', icon: List },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  // Update main content margin when sidebar collapses
  useEffect(() => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.style.marginLeft = isCollapsed ? '80px' : '200px'
    }
  }, [isCollapsed])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Collapse Toggle (Desktop) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex fixed left-[200px] top-6 z-40 p-2 bg-white/90 backdrop-blur-md rounded-r-lg shadow-lg border-l border-neutral-200 transition-all"
        style={{ left: isCollapsed ? '80px' : '200px' }}
      >
        <ChevronLeft 
          size={20} 
          className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-br from-[#00A86B] via-[#1A4CC7] to-[#00A86B] z-40 transform transition-all duration-300 shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        animate={{ width: isCollapsed ? '80px' : '200px' }}
        initial={false}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <Link href="/home" className="mb-8">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="text-[#1A4CC7]" size={24} fill="currentColor" />
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <h1 className="text-xl font-semibold text-white">DeBabs</h1>
                    <p className="text-xs text-white/80">Charity</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/home' && pathname?.startsWith(item.href))
              
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white/20 backdrop-blur-md text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          className="font-medium whitespace-nowrap"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="pt-6 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs text-white/60 text-center">
                  Made with ❤️ for the community
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

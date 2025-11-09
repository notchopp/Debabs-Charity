'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package, Heart, Info, List, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Browse', icon: Package },
  { href: '/donate', label: 'Donate', icon: Heart },
  { href: '/about', label: 'About', icon: Info },
  { href: '/donations', label: 'My Donations', icon: List },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-xl border-r border-neutral-200 z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        initial={false}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <Link href="/" className="mb-12">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#00A86B] to-[#1A4CC7] rounded-xl flex items-center justify-center">
                <Heart className="text-white" size={24} fill="currentColor" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-secondary">DeBabs</h1>
                <p className="text-xs text-neutral-500">Charity</p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname?.startsWith(item.href))
              
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00A86B]/10 to-[#1A4CC7]/10 text-[#1A4CC7]'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon size={20} className={isActive ? 'text-[#1A4CC7]' : ''} />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="pt-6 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              Made with ❤️ for the community
            </p>
          </div>
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


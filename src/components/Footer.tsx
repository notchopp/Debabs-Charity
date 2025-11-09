'use client'

import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/items', label: 'Available Items' },
    { href: '/donate', label: 'Donate Item' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-secondary text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Logo variant="full" size="lg" className="mb-4" />
              <p className="text-neutral-300 mb-6 max-w-md leading-relaxed">
                DeBabs connects communities through meaningful donations. 
                Find items you need, donate what you can spare, and make a difference together.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-neutral-300">
                  <Mail size={16} />
                  <span>hello@debabs.org</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-300">
                  <Phone size={16} />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-300">
                  <MapPin size={16} />
                  <span>123 Community St, City, State 12345</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-neutral-700 hover:bg-accent rounded-lg flex items-center justify-center transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-r-lg text-sm font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-neutral-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-neutral-400 text-sm mb-4 md:mb-0">
            <span>© {currentYear} DeBabs Charity. Made with</span>
            <Heart className="text-highlight" size={16} fill="currentColor" />
            <span>for the community.</span>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}


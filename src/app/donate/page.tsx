'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, MapPin, CheckCircle, AlertCircle, Heart, Package, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function DonatePage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    description: '',
    pickup_available: false,
    image: null as File | null
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const categories = [
    'Clothing',
    'Furniture', 
    'Electronics',
    'Books',
    'Toys',
    'Kitchen',
    'Sports',
    'Other'
  ]

  const conditions = [
    'Excellent',
    'Good', 
    'Fair',
    'Needs Repair'
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Help Your Community',
      description: 'Your donations directly help families and individuals in need'
    },
    {
      icon: Package,
      title: 'Reduce Waste',
      description: 'Give items a second life instead of sending them to landfills'
    },
    {
      icon: Users,
      title: 'Build Connections',
      description: 'Connect with your neighbors and strengthen community bonds'
    },
    {
      icon: CheckCircle,
      title: 'Easy Process',
      description: 'Simple donation process with pickup options available'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      let imageUrl = null

      // Upload image if provided
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `donations/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, formData.image)

        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(filePath)
        
        imageUrl = data.publicUrl
      }

      // Insert item into database
      const { error } = await supabase
        .from('items')
        .insert([{
          title: formData.title,
          category: formData.category,
          condition: formData.condition,
          description: formData.description,
          pickup_available: formData.pickup_available,
          image_url: imageUrl
        }])

      if (error) throw error

      setStatus('success')
      setFormData({
        title: '',
        category: '',
        condition: '',
        description: '',
        pickup_available: false,
        image: null
      })
    } catch (error) {
      console.error('Error submitting donation:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="mx-auto text-highlight mb-4" size={64} />
            <h3 className="text-2xl font-bold text-secondary mb-2">Thank You!</h3>
            <p className="text-neutral-500 mb-6">
              Your donation has been submitted successfully. It will be reviewed and made available to the community soon.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="btn-primary"
            >
              Donate Another Item
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
            Donate an Item
          </h1>
          <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
            Help your community by donating items you no longer need. 
            Every donation makes a difference in someone's life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-secondary mb-8">
              Why Donate?
            </h2>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <benefit.icon className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-500">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Guidelines */}
            <motion.div
              className="mt-12 p-6 bg-highlight/10 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Donation Guidelines
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-highlight mt-1 flex-shrink-0" size={16} />
                  <span>Items should be in good, usable condition</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-highlight mt-1 flex-shrink-0" size={16} />
                  <span>Clean and sanitize items before donating</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-highlight mt-1 flex-shrink-0" size={16} />
                  <span>Include all parts and accessories</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-highlight mt-1 flex-shrink-0" size={16} />
                  <span>Provide accurate descriptions and photos</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary mb-6">
                Donation Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Item Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="input-field"
                    placeholder="e.g., Vintage Coffee Table"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Category and Condition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      required
                      className="input-field"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Condition *
                    </label>
                    <select
                      name="condition"
                      required
                      className="input-field"
                      value={formData.condition}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Condition</option>
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    className="input-field"
                    placeholder="Describe the item, its features, and any relevant details..."
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Item Photo
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-accent transition-colors">
                    <Upload className="mx-auto text-neutral-400 mb-2" size={32} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-accent font-medium">Click to upload</span>
                      <span className="text-neutral-500"> or drag and drop</span>
                    </label>
                    {formData.image && (
                      <p className="text-sm text-neutral-500 mt-2">
                        Selected: {formData.image.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pickup Available */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="pickup_available"
                    id="pickup_available"
                    checked={formData.pickup_available}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-accent border-neutral-300 rounded focus:ring-accent"
                  />
                  <label htmlFor="pickup_available" className="flex items-center space-x-2 cursor-pointer">
                    <MapPin className="text-accent" size={16} />
                    <span className="text-sm font-medium text-secondary">
                      Available for pickup
                    </span>
                  </label>
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <motion.div
                    className="flex items-center space-x-2 text-error bg-error/10 p-4 rounded-xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={20} />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Donation'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

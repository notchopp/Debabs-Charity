'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Check, X } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function DonateForm() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    pickup_available: false,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      let imageUrl: string | null = null

      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('item_images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('item_images')
          .getPublicUrl(filePath)

        imageUrl = publicUrl
      }

      // Insert item into database
      const { error: insertError } = await supabase
        .from('items')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            image_url: imageUrl,
            pickup_available: formData.pickup_available,
          }
        ])

      if (insertError) throw insertError

      setSubmitStatus('success')
      
      // Reset form
      setFormData({
        name: '',
        title: '',
        description: '',
        pickup_available: false,
      })
      setImageFile(null)
      setPreview(null)

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)

    } catch (error: any) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Name (Optional) */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Your Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
          placeholder="John Doe"
        />
      </div>

      {/* Item Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
          Item Title <span className="text-red-300">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
          placeholder="e.g., Vintage Coffee Table"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
          Description <span className="text-red-300">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all resize-none"
          placeholder="Describe the item, its condition, and why you're donating it..."
        />
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-secondary mb-2">
          Item Image
        </label>
        <div className="space-y-4">
          {preview && (
            <motion.div
              className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-neutral-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null)
                  setImageFile(null)
                }}
                className="absolute top-2 right-2 p-2 bg-white/20 backdrop-blur-md rounded-full shadow-lg hover:bg-white/30 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </motion.div>
          )}
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-white/50 transition-colors bg-white/5 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="text-white/70 mb-2" size={32} />
              <p className="mb-2 text-sm text-white/80">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-white/60">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              id="image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* Pickup Available */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="pickup_available"
          name="pickup_available"
          checked={formData.pickup_available}
          onChange={handleInputChange}
          className="w-5 h-5 text-[#1A4CC7] border-white/30 rounded focus:ring-white/30 bg-white/10"
        />
        <label htmlFor="pickup_available" className="text-sm font-medium text-white">
          Pickup available for this item
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || !formData.title || !formData.description}
        className="w-full text-lg py-4 bg-white text-[#1A4CC7] rounded-xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <span className="flex items-center space-x-2">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Submitting...</span>
          </span>
        ) : (
          <span className="flex items-center space-x-2">
            <span>Submit Donation</span>
            <Check size={20} />
          </span>
        )}
      </motion.button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          className="p-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2">
            <Check size={20} />
            <span>Thank you! Your donation has been submitted successfully.</span>
          </div>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          className="p-4 bg-red-500/20 backdrop-blur-md border border-red-300/30 rounded-xl text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2">
            <X size={20} />
            <span>{errorMessage || 'An error occurred. Please try again.'}</span>
          </div>
        </motion.div>
      )}
    </motion.form>
  )
}


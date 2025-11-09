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
        <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
          Your Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="input-field"
          placeholder="John Doe"
        />
      </div>

      {/* Item Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-secondary mb-2">
          Item Title <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="input-field"
          placeholder="e.g., Vintage Coffee Table"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-secondary mb-2">
          Description <span className="text-error">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={5}
          className="input-field resize-none"
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
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-neutral-100 transition-colors"
              >
                <X size={20} className="text-secondary" />
              </button>
            </motion.div>
          )}
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-accent transition-colors bg-neutral-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="text-neutral-500 mb-2" size={32} />
              <p className="mb-2 text-sm text-neutral-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-neutral-400">PNG, JPG, GIF up to 10MB</p>
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
          className="w-5 h-5 text-accent border-neutral-300 rounded focus:ring-accent"
        />
        <label htmlFor="pickup_available" className="text-sm font-medium text-secondary">
          Pickup available for this item
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || !formData.title || !formData.description}
        className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="p-4 bg-highlight/10 border border-highlight rounded-lg text-highlight"
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
          className="p-4 bg-error/10 border border-error rounded-lg text-error"
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


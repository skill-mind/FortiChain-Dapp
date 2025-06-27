"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import type { Report } from "../type/Report" 

interface ProvideMoreDetailsModalProps {
  report: Report
  isOpen: boolean
  onClose: () => void
  onSubmit: (details: string) => void
}

export const ProvideMoreDetailsModal: React.FC<ProvideMoreDetailsModalProps> = ({
  report,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const minLength = 10
  const maxLength = 1000
  const isValid = details.length >= minLength && details.length <= maxLength

  const getCharacterCountColor = () => {
    if (details.length === 0) return "text-gray-400"
    if (details.length < minLength) return "text-red-400"
    if (details.length > maxLength) return "text-red-400"
    return "text-green-400"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid) {
      setError(`Please provide details between ${minLength} and ${maxLength} characters.`)
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onSubmit(details)
      setDetails("")
      onClose()
    } catch (err) {
      setError("Failed to submit details. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setDetails("")
      setError("")
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl mx-4 bg-[#161113] border border-[#464043] rounded-[20px] shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#464043]">
              <div>
                <h2 className="text-xl font-sora font-semibold text-white">Provide More Details</h2>
                <p className="text-sm text-[#B5B3B4] mt-1">
                  Report ID: {report.id} - {report.projectName}
                </p>
              </div>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 text-[#B5B3B4] hover:text-white hover:bg-[#2D272B] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Report Summary */}
              <div className="mb-6 p-4 bg-[#110D0F] border border-[#464043] rounded-lg">
                <h3 className="text-sm font-medium text-white mb-2">Report Summary</h3>
                <p className="text-sm text-[#B5B3B4] mb-2">
                  <span className="font-medium">Title:</span> {report.title}
                </p>
                <p className="text-sm text-[#B5B3B4] mb-2">
                  <span className="font-medium">Severity:</span> {report.severity}
                </p>
                <p className="text-sm text-[#B5B3B4]">
                  <span className="font-medium">Status:</span> {report.status}
                </p>
              </div>

              {/* Details Input */}
              <div className="mb-4">
                <label htmlFor="details" className="block text-sm font-medium text-white mb-2">
                  Additional Details <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value)
                    setError("")
                  }}
                  placeholder="Please provide additional context, clarifications, or any other relevant information about this report..."
                  className="w-full h-32 px-4 py-3 bg-[#110D0F] border border-[#464043] rounded-lg text-white placeholder-[#666] resize-none focus:outline-none focus:border-[#0000FF] focus:ring-1 focus:ring-[#0000FF] transition-colors"
                  disabled={isSubmitting}
                />

                {/* Character Counter */}
                <div className="flex justify-between items-center mt-2">
                  <div className={`text-xs ${getCharacterCountColor()}`}>
                    {details.length}/{maxLength} characters
                    {details.length < minLength && (
                      <span className="ml-2">(Minimum {minLength} characters required)</span>
                    )}
                  </div>
                  {isValid && (
                    <div className="flex items-center gap-1 text-green-400">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs">Valid</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-red-400">{error}</span>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#464043]">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-[#B5B3B4] hover:text-white hover:bg-[#2D272B] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="px-6 py-2 bg-[#0000FF] hover:bg-[#0000CC] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Details"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiInfo, FiCopy, FiCheck } from 'react-icons/fi'
import { validateSequence, sampleSequences, formatSequence } from '../lib/utils'
import toast from 'react-hot-toast'

interface SequenceInputProps {
  onSubmit: (sequence: string) => void
  isLoading: boolean
}

export default function SequenceInput({ onSubmit, isLoading }: SequenceInputProps) {
  const [sequence, setSequence] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    const formatted = formatSequence(sequence)
    setCharCount(formatted.length)
  }, [sequence])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validation = validateSequence(sequence)
    if (!validation.isValid) {
      setError(validation.error || 'Invalid sequence')
      toast.error(validation.error || 'Invalid sequence')
      return
    }

    setError('')
    onSubmit(formatSequence(sequence))
  }

  const handleSampleClick = (sampleSequence: string) => {
    setSequence(sampleSequence)
    setError('')
    toast.success('Sample sequence loaded')
  }

  const handleCopy = async () => {
    if (sequence) {
      await navigator.clipboard.writeText(sequence)
      setCopied(true)
      toast.success('Sequence copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      id="sequence-input-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="relative">
            <textarea
              value={sequence}
              onChange={(e) => {
                setSequence(e.target.value.toUpperCase())
                setError('')
              }}
              placeholder="Enter epitope sequence (e.g., ESSALAAAQAMASAAAFETA)"
              className={`w-full min-h-[200px] p-6 pr-16 rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg border-2 ${
                error
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400'
              } focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 sequence-input resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
              disabled={isLoading}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            
            {/* Character counter */}
            <div className="absolute bottom-4 right-4 text-sm text-cyan-600 dark:text-cyan-400">
              {charCount} aa
            </div>

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              disabled={!sequence}
            >
              {copied ? (
                <FiCheck className="text-green-500 dark:text-green-400" />
              ) : (
                <FiCopy className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400" />
              )}
            </button>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -bottom-6 left-0 text-sm text-danger-600 dark:text-danger-400 flex items-center gap-1"
              >
                <FiInfo />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sample sequences */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Try a sample sequence:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sampleSequences.map((sample, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => handleSampleClick(sample.sequence)}
                className="text-left p-4 rounded-xl bg-white/60 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 border border-gray-300 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 group backdrop-blur-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {sample.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {sample.description}
                </div>
                <div className="font-mono text-xs text-gray-500 dark:text-gray-500 mt-2 truncate">
                  {sample.sequence}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={isLoading || !sequence}
          className={`w-full py-4 px-8 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
            isLoading || !sequence
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white transform hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/25'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-400 dark:border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <FiSend className="text-xl" />
              Predict Resistance
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
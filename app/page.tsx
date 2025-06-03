'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import SequenceInput from './components/SequenceInput'
import PredictionResults from './components/PredictionResults'
import EducationalContent from './components/EducationalContent'
import FloatingParticles from './components/FloatingParticles'
import { PredictionResponse } from './types'
import { predictResistance } from './lib/api'
import toast from 'react-hot-toast'

export default function Home() {
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePredict = async (sequence: string) => {
    setIsLoading(true)
    setPredictions(null)

    try {
      const result = await predictResistance(sequence)
      setPredictions(result)
      toast.success('Prediction completed successfully!')
    } catch (error) {
      console.error('Prediction error:', error)
      toast.error('Failed to predict resistance. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <FloatingParticles />
      
      <Hero />
      
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 px-4 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="gradient-text">Analyze Epitope Sequences</span>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Enter an epitope sequence to predict antibiotic resistance across 11 different antibiotics
            </motion.p>
          </div>

          <SequenceInput onSubmit={handlePredict} isLoading={isLoading} />

          {(predictions || isLoading) && (
            <PredictionResults
              predictions={predictions}
              isLoading={isLoading}
            />
          )}

          <EducationalContent />
        </div>
      </motion.section>
    </div>
  )
}
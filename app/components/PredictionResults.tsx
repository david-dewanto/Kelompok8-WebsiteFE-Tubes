'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { FiShield, FiAlertTriangle, FiInfo, FiDownload } from 'react-icons/fi'
import { PredictionResponse } from '../types'
import { antibioticInfo, calculateResistancePercentage, getResistanceColor } from '../lib/utils'
import { useState } from 'react'

interface PredictionResultsProps {
  predictions: PredictionResponse | null
  isLoading: boolean
}

const COLORS = {
  Resistant: '#ef4444',
  Susceptible: '#22c55e',
}

export default function PredictionResults({ predictions, isLoading }: PredictionResultsProps) {
  const [selectedAntibiotic, setSelectedAntibiotic] = useState<string | null>(null)

  if (!predictions && !isLoading) return null

  const resistancePercentage = predictions ? calculateResistancePercentage(predictions.predictions) : 0
  
  // Prepare data for charts
  const pieData = predictions ? [
    {
      name: 'Resistant',
      value: Object.values(predictions.predictions).filter(s => s === 'Resistant').length,
    },
    {
      name: 'Susceptible',
      value: Object.values(predictions.predictions).filter(s => s === 'Susceptible').length,
    },
  ] : []

  const radarData = predictions ? antibioticInfo.map(anti => ({
    antibiotic: anti.name,
    resistance: predictions.predictions[anti.key as keyof typeof predictions.predictions] === 'Resistant' ? 100 : 0,
    fullMark: 100,
  })) : []

  const handleDownloadResults = () => {
    if (!predictions) return

    const csvContent = [
      ['Antibiotic', 'Status'],
      ...Object.entries(predictions.predictions).map(([antibiotic, status]) => [antibiotic, status]),
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `antibiotic-resistance-results-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12 space-y-8"
    >
      {/* Summary Card */}
      <div className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-600">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">
            Prediction Results
          </h3>
          {predictions && (
            <button
              onClick={handleDownloadResults}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <FiDownload />
              Download CSV
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {/* Loading skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 loading-skeleton rounded-xl" />
              <div className="h-64 loading-skeleton rounded-xl" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="h-32 loading-skeleton rounded-xl" />
              ))}
            </div>
          </div>
        ) : predictions ? (
          <div className="space-y-8">
            {/* Overall resistance summary */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
              <div className="text-5xl font-bold mb-2">
                <span className={resistancePercentage > 50 ? 'text-danger-600' : 'text-accent-600'}>
                  {resistancePercentage}%
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Overall Resistance Rate
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {resistancePercentage > 50 
                  ? 'High resistance detected across multiple antibiotics'
                  : resistancePercentage > 20
                  ? 'Moderate resistance detected'
                  : 'Low resistance detected'
                }
              </p>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Resistance Distribution
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Radar Chart */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Resistance Profile
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                      dataKey="antibiotic"
                      tick={{ fontSize: 10 }}
                      className="text-gray-600 dark:text-gray-300"
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Resistance"
                      dataKey="resistance"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Individual antibiotic results */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {antibioticInfo.map((antibiotic) => {
                const status = predictions.predictions[antibiotic.key as keyof typeof predictions.predictions]
                const isResistant = status === 'Resistant'
                const isSelected = selectedAntibiotic === antibiotic.key

                return (
                  <motion.div
                    key={antibiotic.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAntibiotic(isSelected ? null : antibiotic.key)}
                    className={`antibiotic-card cursor-pointer ${
                      isResistant ? 'resistant' : 'susceptible'
                    } ${isSelected ? 'ring-4 ring-primary-500' : ''}`}
                    layout
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-800 dark:text-white">
                        {antibiotic.name}
                      </h5>
                      {isResistant ? (
                        <FiAlertTriangle className="text-red-600 dark:text-danger-400 text-xl" />
                      ) : (
                        <FiShield className="text-green-600 dark:text-accent-400 text-xl" />
                      )}
                    </div>
                    <p className={`text-sm font-medium ${
                      isResistant ? 'text-red-700 dark:text-danger-400' : 'text-green-700 dark:text-accent-400'
                    }`}>
                      {status}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-400 mt-1">
                      {antibiotic.class}
                    </p>
                    
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600"
                        >
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            {antibiotic.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Info section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <FiInfo className="text-blue-600 dark:text-blue-400 text-xl mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    About These Results
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    These predictions are based on machine learning analysis of epitope sequences.
                    Results should be validated with laboratory testing before making clinical decisions.
                    The model analyzes k-mer patterns (k=6) in the sequence to predict resistance patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}
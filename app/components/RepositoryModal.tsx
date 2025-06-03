'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { FiX, FiGithub, FiCode, FiServer, FiCpu, FiExternalLink } from 'react-icons/fi'

interface RepositoryModalProps {
  isOpen: boolean
  onClose: () => void
}

const repositories = [
  {
    id: 'frontend',
    title: 'Frontend Repository',
    description: 'Next.js application with stunning 3D DNA visualizations and modern UI',
    icon: FiCode,
    url: 'https://github.com/david-dewanto/Kelompok8-WebsiteFE-Tubes',
    tech: ['Next.js 14', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'backend',
    title: 'Backend Repository',
    description: 'FastAPI server with machine learning model integration and API endpoints',
    icon: FiServer,
    url: 'https://github.com/david-dewanto/Kelompok8-WebsiteBE-Tubes',
    tech: ['FastAPI', 'Python', 'ML Integration', 'REST API', 'CORS'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'model',
    title: 'ML Model Repository',
    description: 'Machine learning model for predicting antibiotic resistance from epitope sequences',
    icon: FiCpu,
    url: 'https://github.com/david-dewanto/Kelompok8-ModelMachineLearning-Tubes',
    tech: ['Machine Learning', 'Python', 'Scikit-learn', 'K-mer Analysis', 'Bioinformatics'],
    color: 'from-purple-500 to-pink-500'
  }
]

export default function RepositoryModal({ isOpen, onClose }: RepositoryModalProps) {
  const handleRepositoryClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-900 border border-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-white flex items-center gap-3"
                  >
                    <FiGithub className="text-3xl" />
                    Choose Repository
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    onClick={onClose}
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <p className="text-gray-300 mb-8">
                  Select which repository you'd like to explore. Each repository contains different components of the Antibiotic Resistance Predictor system.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {repositories.map((repo, index) => (
                    <motion.div
                      key={repo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <button
                        onClick={() => handleRepositoryClick(repo.url)}
                        className="w-full p-6 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 transition-all duration-300 text-left group-hover:scale-105"
                      >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${repo.color} flex items-center justify-center mb-4`}>
                          <repo.icon className="text-2xl text-white" />
                        </div>
                        
                        <h4 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                          {repo.title}
                          <FiExternalLink className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          {repo.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {repo.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                      🧬 Antibiotic Resistance Predictor - Open Source Project
                    </p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
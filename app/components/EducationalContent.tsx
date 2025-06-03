'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiBook, FiActivity, FiShield, FiTrendingUp } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'

const educationalSections = [
  {
    id: 'what-is-resistance',
    title: 'What is Antibiotic Resistance?',
    icon: FiShield,
    content: `Antibiotic resistance occurs when bacteria develop the ability to survive exposure to antibiotics that were designed to kill them or stop their growth. This is a natural evolutionary process accelerated by the misuse and overuse of antibiotics. When resistant bacteria survive treatment, they can multiply and spread their resistance genes to other bacteria.`,
    highlights: [
      'Natural evolutionary process',
      'Accelerated by antibiotic misuse',
      'Can spread between bacteria',
      'Major global health threat',
    ],
  },
  {
    id: 'epitope-sequences',
    title: 'Understanding Epitope Sequences',
    icon: FiActivity,
    content: `An epitope is a specific region of an antigen that is recognized by antibodies or immune cells. Epitope sequences are short amino acid chains that can reveal important information about protein structure and function. In the context of antibiotic resistance, analyzing these sequences helps predict how bacteria might respond to different antibiotics.`,
    highlights: [
      'Short amino acid chains',
      'Recognized by immune system',
      'Reveal protein information',
      'Predict bacterial response',
    ],
  },
  {
    id: 'how-prediction-works',
    title: 'How Does the Prediction Work?',
    icon: FiTrendingUp,
    content: `Our AI model uses advanced machine learning algorithms to analyze epitope sequences. It breaks down sequences into k-mers (subsequences of length k=6) and identifies patterns associated with resistance. The model has been trained on thousands of known resistance patterns to achieve high accuracy in predictions.`,
    highlights: [
      'K-mer analysis (k=6)',
      'Pattern recognition',
      'Machine learning model',
      'Trained on known data',
    ],
  },
  {
    id: 'clinical-importance',
    title: 'Clinical Importance',
    icon: FiBook,
    content: `Rapid identification of antibiotic resistance is crucial for effective treatment. Traditional laboratory methods can take days or weeks, while our AI-powered predictions provide results in seconds. This can help healthcare providers make more informed decisions about antibiotic selection, potentially saving lives and reducing the spread of resistant bacteria.`,
    highlights: [
      'Rapid results (seconds vs days)',
      'Informed treatment decisions',
      'Reduces trial-and-error',
      'Helps combat resistance spread',
    ],
  },
]

interface AccordionItemProps {
  section: typeof educationalSections[0]
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ section, isOpen, onToggle }: AccordionItemProps) {
  const Icon = section.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-cyan-100/80 dark:bg-cyan-900/50 border border-cyan-400/50 dark:border-cyan-500/30">
            <Icon className="text-xl text-cyan-600 dark:text-cyan-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {section.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className="text-xl text-gray-600 dark:text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
              {section.content}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-200"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  {highlight}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function EducationalContent() {
  const [openSection, setOpenSection] = useState<string | null>('what-is-resistance')
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.section
      ref={ref}
      id="educational-content"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-20 py-20"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">Learn More</span>
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Understanding antibiotic resistance and how AI can help combat this global health threat
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto space-y-4"
      >
        {educationalSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.1 * index }}
          >
            <AccordionItem
              section={section}
              isOpen={openSection === section.id}
              onToggle={() => setOpenSection(openSection === section.id ? null : section.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        <div className="text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/30 backdrop-blur-lg border border-gray-300 dark:border-gray-600">
          <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
            700,000+
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Annual deaths from antibiotic resistance globally
          </p>
        </div>
        <div className="text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/30 backdrop-blur-lg border border-gray-300 dark:border-gray-600">
          <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
            &lt;1 min
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            AI prediction time vs days for traditional methods
          </p>
        </div>
        <div className="text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/30 backdrop-blur-lg border border-gray-300 dark:border-gray-600">
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
            85%+
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Model accuracy on validation datasets
          </p>
        </div>
      </motion.div>
    </motion.section>
  )
}
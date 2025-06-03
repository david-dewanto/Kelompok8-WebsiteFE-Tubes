'use client'

import Lottie from 'lottie-react'
import { motion } from 'framer-motion'

// DNA Animation data (simplified for demonstration)
const dnaAnimationData = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 60,
  "w": 200,
  "h": 200,
  "nm": "DNA Loading",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "DNA Strand",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": {
          "a": 1,
          "k": [
            { "t": 0, "s": [0], "e": [360] },
            { "t": 60, "s": [360] }
          ]
        },
        "p": { "a": 0, "k": [100, 100, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "el",
              "s": { "a": 0, "k": [30, 30] },
              "p": { "a": 0, "k": [0, -50] }
            },
            {
              "ty": "st",
              "c": { "a": 0, "k": [0.059, 0.647, 0.914, 1] },
              "o": { "a": 0, "k": 100 },
              "w": { "a": 0, "k": 4 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.059, 0.647, 0.914, 0.5] },
              "o": { "a": 0, "k": 50 }
            }
          ]
        }
      ]
    }
  ]
}

interface LoadingAnimationProps {
  text?: string
}

export default function LoadingAnimation({ text = "Analyzing sequence..." }: LoadingAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center p-8"
    >
      <div className="relative w-48 h-48">
        {/* Custom DNA-like loading animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="dna-loader">
            <div className="helix">
              <div className="helix-particle particle-1"></div>
              <div className="helix-particle particle-2"></div>
              <div className="helix-particle particle-3"></div>
              <div className="helix-particle particle-4"></div>
            </div>
          </div>
        </div>
        
        {/* Alternative: Lottie animation */}
        {/* <Lottie 
          animationData={dnaAnimationData}
          loop={true}
          autoplay={true}
        /> */}
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300"
      >
        {text}
      </motion.p>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        className="mt-4 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
      />
    </motion.div>
  )
}

// Add these styles to globals.css
const loadingStyles = `
.dna-loader {
  width: 100px;
  height: 100px;
  position: relative;
}

.helix {
  width: 100%;
  height: 100%;
  position: relative;
  animation: rotate 2s linear infinite;
}

.helix-particle {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #0ea5e9, #ec4899);
}

.particle-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: particle-float-1 2s ease-in-out infinite;
}

.particle-2 {
  top: 33%;
  left: 0;
  animation: particle-float-2 2s ease-in-out infinite;
}

.particle-3 {
  top: 66%;
  right: 0;
  animation: particle-float-3 2s ease-in-out infinite;
}

.particle-4 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: particle-float-4 2s ease-in-out infinite;
}

@keyframes particle-float-1 {
  0%, 100% { transform: translate(-50%, 0) scale(1); }
  50% { transform: translate(-50%, -10px) scale(1.2); }
}

@keyframes particle-float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10px, 0) scale(1.2); }
}

@keyframes particle-float-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-10px, 0) scale(1.2); }
}

@keyframes particle-float-4 {
  0%, 100% { transform: translate(-50%, 0) scale(1); }
  50% { transform: translate(-50%, 10px) scale(1.2); }
}
`
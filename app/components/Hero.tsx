'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import * as THREE from 'three'

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  const helixPoints = []
  const radius = 2
  const height = 8
  const turns = 3
  const pointsPerTurn = 20

  for (let i = 0; i <= turns * pointsPerTurn; i++) {
    const t = i / (turns * pointsPerTurn)
    const angle = t * Math.PI * 2 * turns
    const y = (t - 0.5) * height
    
    // First strand
    helixPoints.push({
      x: Math.cos(angle) * radius,
      y: y,
      z: Math.sin(angle) * radius,
      strand: 1,
    })
    
    // Second strand (offset by PI)
    helixPoints.push({
      x: Math.cos(angle + Math.PI) * radius,
      y: y,
      z: Math.sin(angle + Math.PI) * radius,
      strand: 2,
    })
  }

  return (
    <group ref={groupRef}>
      {helixPoints.map((point, index) => (
        <Sphere
          key={index}
          position={[point.x, point.y, point.z]}
          args={[0.15, 16, 16]}
        >
          <meshStandardMaterial
            color={point.strand === 1 ? '#0ea5e9' : '#ec4899'}
            emissive={point.strand === 1 ? '#0ea5e9' : '#ec4899'}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      ))}
      
      {/* Connecting bars */}
      {helixPoints
        .filter((_, i) => i % 4 === 0 && i % 2 === 0)
        .map((point, index) => {
          if (index >= helixPoints.length / 4) return null
          const nextPoint = helixPoints[index * 2 + 1]
          if (!nextPoint) return null
          
          return (
            <mesh
              key={`bar-${index}`}
              position={[
                (point.x + nextPoint.x) / 2,
                point.y,
                (point.z + nextPoint.z) / 2,
              ]}
              rotation={[0, Math.atan2(nextPoint.z - point.z, nextPoint.x - point.x), 0]}
            >
              <boxGeometry args={[radius * 2, 0.1, 0.1]} />
              <meshStandardMaterial
                color="#22c55e"
                emissive="#22c55e"
                emissiveIntensity={0.3}
                metalness={0.5}
                roughness={0.5}
              />
            </mesh>
          )
        })}
    </group>
  )
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3, 64, 64]} />
      <MeshDistortMaterial
        color="#0ea5e9"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-accent-900/20" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
          <Suspense fallback={null}>
            <DNAHelix />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="gradient-text">Antibiotic Resistance</span>
            <br />
            <span className="text-gray-800 dark:text-white">Predictor</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Harness the power of AI to predict antibiotic resistance from epitope sequences
            with unprecedented accuracy and speed
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => {
                document.getElementById('sequence-input-section')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary-500/25"
            >
              Start Analysis
            </button>
            <button
              onClick={() => {
                document.getElementById('educational-content')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-gray-800 dark:text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
        >
          <FiArrowDown className="text-3xl text-gray-600 dark:text-gray-400" />
        </motion.div>
      </div>

      {/* Floating orb for mobile (since 3D might be heavy) */}
      <div className="absolute top-20 right-10 w-32 h-32 hidden lg:block">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <FloatingOrb />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
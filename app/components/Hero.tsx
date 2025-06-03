'use client'

import { useRef, Suspense, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Sphere, 
  Cylinder,
  MeshDistortMaterial,
  Float,
  Stars,
  Sparkles,
  PerspectiveCamera,
  useTexture,
  Environment,
  Text
} from '@react-three/drei'
import { motion } from 'framer-motion'
import { FiArrowDown, FiPlay } from 'react-icons/fi'
import * as THREE from 'three'

// DNA Base Pairs - Vibrant colors for better contrast
const basePairs = [
  { base1: 'A', base2: 'T', color1: '#3b82f6', color2: '#06b6d4', accent1: '#60a5fa', accent2: '#22d3ee' },
  { base1: 'G', base2: 'C', color1: '#8b5cf6', color2: '#a855f7', accent1: '#a78bfa', accent2: '#c084fc' },
  { base1: 'C', base2: 'G', color1: '#ec4899', color2: '#f43f5e', accent1: '#f472b6', accent2: '#fb7185' },
  { base1: 'T', base2: 'A', color1: '#10b981', color2: '#14b8a6', accent1: '#34d399', accent2: '#2dd4bf' },
]

// Advanced DNA Double Helix Component
function DNADoubleHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()
  const [hoveredBase, setHoveredBase] = useState<number | null>(null)
  
  // Generate helix data
  const helixData = useMemo(() => {
    const data = []
    const radius = 2
    const height = 12
    const turns = 4
    const basePairsPerTurn = 10
    const totalPairs = turns * basePairsPerTurn
    
    for (let i = 0; i < totalPairs; i++) {
      const t = i / totalPairs
      const angle = t * Math.PI * 2 * turns
      const y = (t - 0.5) * height
      const basePair = basePairs[i % basePairs.length]
      
      data.push({
        position1: new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        ),
        position2: new THREE.Vector3(
          Math.cos(angle + Math.PI) * radius,
          y,
          Math.sin(angle + Math.PI) * radius
        ),
        angle,
        basePair,
        index: i
      })
    }
    return data
  }, [])
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += 0.002
      
      // Mouse interaction
      const targetRotationX = mouse.y * 0.2
      const targetRotationZ = mouse.x * 0.1
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.z += (targetRotationZ - groupRef.current.rotation.z) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ambient particles */}
      <Sparkles
        count={100}
        scale={20}
        size={2}
        speed={0.5}
        color="#0ea5e9"
        opacity={0.5}
      />
      
      {/* DNA Strands - Sugar-phosphate backbone */}
      {[0, Math.PI].map((offset, strandIndex) => {
        const points = helixData.map((data) => {
          const angle = data.angle + offset
          return new THREE.Vector3(
            Math.cos(angle) * 2,
            data.position1.y,
            Math.sin(angle) * 2
          )
        })
        
        const curve = new THREE.CatmullRomCurve3(points)
        const tubeGeometry = new THREE.TubeGeometry(curve, 200, 0.1, 8, false)
        
        return (
          <mesh key={`strand-${strandIndex}`} geometry={tubeGeometry}>
            <meshStandardMaterial
              color={strandIndex === 0 ? '#0ea5e9' : '#ec4899'}
              emissive={strandIndex === 0 ? '#0ea5e9' : '#ec4899'}
              emissiveIntensity={0.3}
              metalness={0.6}
              roughness={0.4}
            />
          </mesh>
        )
      })}
      
      {/* Base Pairs */}
      {helixData.map((data, index) => {
        const isHovered = hoveredBase === index
        const scale = isHovered ? 1.2 : 1
        
        return (
          <group key={`base-pair-${index}`}>
            {/* Connection between bases */}
            <mesh
              position={[
                (data.position1.x + data.position2.x) / 2,
                data.position1.y,
                (data.position1.z + data.position2.z) / 2,
              ]}
              rotation={[0, data.angle + Math.PI / 2, 0]}
              onPointerOver={() => setHoveredBase(index)}
              onPointerOut={() => setHoveredBase(null)}
            >
              <boxGeometry args={[4, 0.08, 0.08]} />
              <meshStandardMaterial
                color={isHovered ? data.basePair.accent1 : '#22c55e'}
                emissive={isHovered ? data.basePair.accent1 : '#22c55e'}
                emissiveIntensity={isHovered ? 0.6 : 0.3}
                metalness={0.5}
                roughness={0.5}
              />
            </mesh>
            
            {/* Base molecules */}
            <Float
              speed={2}
              rotationIntensity={isHovered ? 0.5 : 0.1}
              floatIntensity={isHovered ? 0.5 : 0.1}
            >
              <Sphere
                position={data.position1}
                args={[0.25 * scale, 16, 16]}
              >
                <meshStandardMaterial
                  color={isHovered ? data.basePair.accent1 : data.basePair.color1}
                  emissive={isHovered ? data.basePair.accent1 : data.basePair.color1}
                  emissiveIntensity={isHovered ? 0.6 : 0.4}
                  metalness={0.7}
                  roughness={0.3}
                />
              </Sphere>
            </Float>
            
            <Float
              speed={2}
              rotationIntensity={isHovered ? 0.5 : 0.1}
              floatIntensity={isHovered ? 0.5 : 0.1}
            >
              <Sphere
                position={data.position2}
                args={[0.25 * scale, 16, 16]}
              >
                <meshStandardMaterial
                  color={isHovered ? data.basePair.accent2 : data.basePair.color2}
                  emissive={isHovered ? data.basePair.accent2 : data.basePair.color2}
                  emissiveIntensity={isHovered ? 0.6 : 0.4}
                  metalness={0.7}
                  roughness={0.3}
                />
              </Sphere>
            </Float>
            
            {/* Base pair labels */}
            {isHovered && (
              <>
                <Text
                  position={[data.position1.x, data.position1.y + 0.5, data.position1.z]}
                  fontSize={0.3}
                  color={data.basePair.accent1}
                  anchorX="center"
                  anchorY="middle"
                >
                  {data.basePair.base1}
                </Text>
                <Text
                  position={[data.position2.x, data.position2.y + 0.5, data.position2.z]}
                  fontSize={0.3}
                  color={data.basePair.accent2}
                  anchorX="center"
                  anchorY="middle"
                >
                  {data.basePair.base2}
                </Text>
              </>
            )}
          </group>
        )
      })}
    </group>
  )
}

// Floating Genetic Code Background
function GeneticCodeBackground() {
  const codes = ['ATCG', 'GCTA', 'TGCA', 'CAGT', 'ACTG', 'GTAC']
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y -= 0.01
        if (child.position.y < -10) {
          child.position.y = 10
        }
        child.rotation.y = state.clock.elapsedTime * 0.1 + i
      })
    }
  })
  
  return (
    <group ref={groupRef}>
      {codes.map((code, i) => (
        <Text
          key={i}
          fontSize={0.5}
          position={[
            (Math.random() - 0.5) * 20,
            Math.random() * 20 - 10,
            -5 - Math.random() * 5
          ]}
          color="#0ea5e9"
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={0.1}
        >
          {code}
        </Text>
      ))}
    </group>
  )
}

// Molecule Orb
function MoleculeOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      
      const scale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[2, 4]} />
        <MeshDistortMaterial
          color="#0ea5e9"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#0ea5e9"
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Orbiting particles */}
      <group>
        {[...Array(6)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 3,
              0,
              Math.sin((i / 6) * Math.PI * 2) * 3
            ]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#ec4899"
              emissive="#ec4899"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-accent-500/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent" />
      </div>
      
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#22c55e" />
          
          {/* Background elements */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          
          <Suspense fallback={null}>
            {/* Main DNA Helix */}
            <DNADoubleHelix />
            
            {/* Floating genetic codes */}
            <GeneticCodeBackground />
            
            {/* Interactive controls */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
              enableDamping
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content with enhanced background for better readability */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl -m-8 dark:bg-black/40" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 py-12"
        >
          {/* Title with enhanced typography and better contrast */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            <span className="inline-block bg-gradient-to-r from-blue-600 via-cyan-600 to-gray-800 dark:from-blue-400 dark:via-cyan-300 dark:to-white bg-clip-text text-transparent drop-shadow-lg">
              Antibiotic
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-gray-800 dark:from-purple-400 dark:via-pink-300 dark:to-white bg-clip-text text-transparent drop-shadow-lg">
              Resistance
            </span>
            <br />
            <span className="text-gray-800 dark:text-white drop-shadow-lg">Predictor</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-700 dark:text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)' }}
          >
            Harness the power of <span className="text-cyan-600 dark:text-cyan-300 font-semibold drop-shadow-md">AI</span> and{' '}
            <span className="text-pink-600 dark:text-pink-300 font-semibold drop-shadow-md">machine learning</span> to predict
            antibiotic resistance from epitope sequences with unprecedented accuracy
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
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FiPlay className="group-hover:animate-pulse" />
                Start Analysis
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button
              onClick={() => {
                document.getElementById('educational-content')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              className="group px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/30 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>

          {/* Stats preview with better contrast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-300 drop-shadow-lg">11</div>
              <div className="text-xs md:text-sm text-gray-700 dark:text-white drop-shadow-md">Antibiotics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 drop-shadow-lg">&lt;1s</div>
              <div className="text-xs md:text-sm text-gray-700 dark:text-white drop-shadow-md">Prediction Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-300 drop-shadow-lg">95%+</div>
              <div className="text-xs md:text-sm text-gray-700 dark:text-white drop-shadow-md">Accuracy</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
        >
          <FiArrowDown className="text-3xl text-gray-600 dark:text-gray-400 animate-bounce" />
        </motion.div>
      </div>

      {/* Floating Molecule Orbs */}
      <div className="absolute top-20 right-10 w-48 h-48 hidden xl:block">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <MoleculeOrb />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
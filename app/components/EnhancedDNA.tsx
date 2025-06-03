'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sphere, Cylinder, Text, Float } from '@react-three/drei'
import * as THREE from 'three'

// Enhanced DNA Base Pairs with more realistic colors
const basePairs = [
  { base1: 'A', base2: 'T', color1: '#FF6B9D', color2: '#4ECDC4', name: 'Adenine-Thymine' },
  { base1: 'G', base2: 'C', color1: '#FFE66D', color2: '#95E1D3', name: 'Guanine-Cytosine' },
  { base1: 'C', base2: 'G', color1: '#95E1D3', color2: '#FFE66D', name: 'Cytosine-Guanine' },
  { base1: 'T', base2: 'A', color1: '#4ECDC4', color2: '#FF6B9D', name: 'Thymine-Adenine' },
]

// Scientific DNA Double Helix with accurate structure
export default function EnhancedDNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse, viewport } = useThree()
  const [hoveredBase, setHoveredBase] = useState<number | null>(null)
  const [animationSpeed, setAnimationSpeed] = useState(0.005)
  
  // Generate scientifically accurate helix data
  const helixData = useMemo(() => {
    const data = []
    const radius = 1.8 // Major groove radius (Angstroms scaled)
    const height = 15
    const turns = 5
    const basePairsPerTurn = 10 // DNA has ~10.5 base pairs per turn
    const totalPairs = turns * basePairsPerTurn
    const majorGrooveWidth = 2.2
    const minorGrooveWidth = 1.2
    
    for (let i = 0; i < totalPairs; i++) {
      const t = i / totalPairs
      const angle = t * Math.PI * 2 * turns
      const y = (t - 0.5) * height
      const basePair = basePairs[i % basePairs.length]
      
      // Calculate groove positions for more realistic structure
      const groovePhase = (angle % (Math.PI * 2 / 10)) * 10
      const grooveRadius = radius + Math.sin(groovePhase) * 0.3
      
      data.push({
        position1: new THREE.Vector3(
          Math.cos(angle) * grooveRadius,
          y,
          Math.sin(angle) * grooveRadius
        ),
        position2: new THREE.Vector3(
          Math.cos(angle + Math.PI) * grooveRadius,
          y,
          Math.sin(angle + Math.PI) * grooveRadius
        ),
        angle,
        basePair,
        index: i,
        groovePhase,
        twist: angle * 0.1 // Added twist for realism
      })
    }
    return data
  }, [])
  
  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation with slight variation
      groupRef.current.rotation.y += animationSpeed
      
      // Interactive mouse movement with smoothing
      const targetRotationX = mouse.y * 0.3
      const targetRotationZ = mouse.x * 0.2
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.03
      groupRef.current.rotation.z += (targetRotationZ - groupRef.current.rotation.z) * 0.03
      
      // Breathing effect
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 1
      groupRef.current.scale.set(breathe, breathe, breathe)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Enhanced Sugar-phosphate backbone */}
      {[0, Math.PI].map((offset, strandIndex) => {
        const points = []
        const colors = []
        
        helixData.forEach((data, i) => {
          const angle = data.angle + offset
          const pos = new THREE.Vector3(
            Math.cos(angle) * (1.8 + Math.sin(data.groovePhase) * 0.3),
            data.position1.y,
            Math.sin(angle) * (1.8 + Math.sin(data.groovePhase) * 0.3)
          )
          points.push(pos)
          
          // Gradient colors along the strand
          const color = new THREE.Color()
          color.setHSL(
            (strandIndex === 0 ? 0.55 : 0.85) + Math.sin(i * 0.1) * 0.1,
            0.8,
            0.6 + Math.sin(i * 0.2) * 0.2
          )
          colors.push(color.r, color.g, color.b)
        })
        
        const curve = new THREE.CatmullRomCurve3(points)
        const tubeGeometry = new THREE.TubeGeometry(curve, 300, 0.08, 12, false)
        
        // Apply vertex colors
        const colorAttribute = new THREE.Float32BufferAttribute(colors, 3)
        tubeGeometry.setAttribute('color', colorAttribute)
        
        return (
          <mesh key={`strand-${strandIndex}`} geometry={tubeGeometry}>
            <meshStandardMaterial
              vertexColors
              emissive={strandIndex === 0 ? '#0ea5e9' : '#ec4899'}
              emissiveIntensity={0.3}
              metalness={0.6}
              roughness={0.3}
              transparent
              opacity={0.9}
            />
          </mesh>
        )
      })}
      
      {/* Enhanced Base Pairs with scientific accuracy */}
      {helixData.map((data, index) => {
        const isHovered = hoveredBase === index
        const scale = isHovered ? 1.3 : 1
        const glowIntensity = isHovered ? 1.0 : 0.6
        
        return (
          <group key={`base-pair-${index}`}>
            {/* Hydrogen bonds (connections between bases) */}
            <mesh
              position={[
                (data.position1.x + data.position2.x) / 2,
                data.position1.y,
                (data.position1.z + data.position2.z) / 2,
              ]}
              rotation={[0, data.angle + Math.PI / 2, data.twist]}
              onPointerOver={() => {
                setHoveredBase(index)
                setAnimationSpeed(0.001) // Slow down on hover
              }}
              onPointerOut={() => {
                setHoveredBase(null)
                setAnimationSpeed(0.005) // Resume normal speed
              }}
            >
              <cylinderGeometry args={[0.03, 0.03, 3.6, 8]} />
              <meshStandardMaterial
                color="#22c55e"
                emissive="#22c55e"
                emissiveIntensity={isHovered ? 0.8 : 0.4}
                metalness={0.7}
                roughness={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
            
            {/* Base molecules with enhanced materials */}
            <Float
              speed={isHovered ? 4 : 1}
              rotationIntensity={isHovered ? 0.8 : 0.2}
              floatIntensity={isHovered ? 0.8 : 0.3}
            >
              <Sphere
                position={data.position1}
                args={[0.2 * scale, 24, 24]}
                onPointerOver={() => setHoveredBase(index)}
                onPointerOut={() => setHoveredBase(null)}
              >
                <meshPhysicalMaterial
                  color={data.basePair.color1}
                  emissive={data.basePair.color1}
                  emissiveIntensity={glowIntensity * 0.5}
                  metalness={0.1}
                  roughness={0.2}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                  transmission={0.1}
                  thickness={0.5}
                />
              </Sphere>
            </Float>
            
            <Float
              speed={isHovered ? 4 : 1}
              rotationIntensity={isHovered ? 0.8 : 0.2}
              floatIntensity={isHovered ? 0.8 : 0.3}
            >
              <Sphere
                position={data.position2}
                args={[0.2 * scale, 24, 24]}
                onPointerOver={() => setHoveredBase(index)}
                onPointerOut={() => setHoveredBase(null)}
              >
                <meshPhysicalMaterial
                  color={data.basePair.color2}
                  emissive={data.basePair.color2}
                  emissiveIntensity={glowIntensity * 0.5}
                  metalness={0.1}
                  roughness={0.2}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                  transmission={0.1}
                  thickness={0.5}
                />
              </Sphere>
            </Float>
            
            {/* Interactive base pair labels with enhanced typography */}
            {isHovered && (
              <>
                <Text
                  position={[data.position1.x + 0.5, data.position1.y + 0.4, data.position1.z]}
                  fontSize={0.25}
                  color={data.basePair.color1}
                  anchorX="center"
                  anchorY="middle"
                  font="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap"
                >
                  {data.basePair.base1}
                  <meshStandardMaterial
                    emissive={data.basePair.color1}
                    emissiveIntensity={0.5}
                  />
                </Text>
                <Text
                  position={[data.position2.x - 0.5, data.position2.y + 0.4, data.position2.z]}
                  fontSize={0.25}
                  color={data.basePair.color2}
                  anchorX="center"
                  anchorY="middle"
                  font="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap"
                >
                  {data.basePair.base2}
                  <meshStandardMaterial
                    emissive={data.basePair.color2}
                    emissiveIntensity={0.5}
                  />
                </Text>
                
                {/* Base pair information */}
                <Text
                  position={[0, data.position1.y + 1, 0]}
                  fontSize={0.15}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={3}
                >
                  {data.basePair.name}
                  <meshStandardMaterial
                    emissive="#ffffff"
                    emissiveIntensity={0.3}
                  />
                </Text>
              </>
            )}
          </group>
        )
      })}
      
      {/* Environmental particles representing cellular environment */}
      {[...Array(20)].map((_, i) => (
        <Float
          key={`env-particle-${i}`}
          speed={0.5 + Math.random()}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <Sphere
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 15
            ]}
            args={[0.05 + Math.random() * 0.1, 16, 16]}
          >
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#0ea5e9"
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}
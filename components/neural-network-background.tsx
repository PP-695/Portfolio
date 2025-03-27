"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { useNeuralNetworkStore } from "@/lib/store"

// Neural Network Node component
const Neuron = ({ position, color, pulseSpeed = 1, size = 0.15 }) => {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { animationSpeed } = useNeuralNetworkStore()

  useEffect(() => {
    if (ref.current) {
      ref.current.scale.set(size, size, size)
    }
  }, [size])

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        // Pulse effect
        const t = Date.now() * 0.001 * pulseSpeed * animationSpeed
        const scale = size * (1 + 0.1 * Math.sin(t))
        ref.current.scale.set(scale, scale, scale)

        // Glow effect when hovered
        if (hovered) {
          ref.current.material.emissiveIntensity = 2 + Math.sin(t * 2) * 0.5
        } else {
          ref.current.material.emissiveIntensity = 1 + Math.sin(t) * 0.2
        }
      }
    }, 16)

    return () => clearInterval(interval)
  }, [hovered, pulseSpeed, size, animationSpeed])

  return (
    <mesh
      ref={ref}
      position={[position.x, position.y, position.z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
    </mesh>
  )
}

// Connection between neurons
const Connection = ({ start, end, color, thickness = 0.02 }) => {
  const ref = useRef<THREE.Mesh>(null)
  const { animationSpeed, algorithm } = useNeuralNetworkStore()

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        const t = Date.now() * 0.001 * animationSpeed

        // Different animation based on algorithm
        if (algorithm === "wave") {
          // Wave-like pulse traveling along the connection
          const distance = Math.sqrt(
            Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2) + Math.pow(end.z - start.z, 2),
          )
          const wave = Math.sin(t * 2 - distance * 2) * 0.5 + 0.5
          ref.current.material.opacity = wave
          ref.current.material.emissiveIntensity = 1 + wave
        } else {
          // Default pulse
          const pulse = Math.sin(t) * 0.3 + 0.7
          ref.current.material.opacity = pulse
          ref.current.material.emissiveIntensity = pulse * 2
        }
      }
    }, 16)

    return () => clearInterval(interval)
  }, [start, end, animationSpeed, algorithm])

  // Calculate the midpoint and direction
  const direction = new THREE.Vector3(end.x - start.x, end.y - start.y, end.z - start.z)
  const length = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2) + Math.pow(direction.z, 2))
  const midPoint = new THREE.Vector3(
    start.x + direction.x * 0.5,
    start.y + direction.y * 0.5,
    start.z + direction.z * 0.5,
  )

  // Calculate rotation to align cylinder with the connection
  const quaternion = new THREE.Quaternion()
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())

  return (
    <mesh ref={ref} position={[midPoint.x, midPoint.y, midPoint.z]} quaternion={quaternion}>
      <cylinderGeometry args={[thickness, thickness, length, 6, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent={true}
        opacity={0.7}
        toneMapped={false}
      />
    </mesh>
  )
}

// Neural Network Scene
const NeuralNetworkScene = () => {
  const [neurons, setNeurons] = useState<{ position: THREE.Vector3; color: string }[]>([])
  const [connections, setConnections] = useState<{ start: THREE.Vector3; end: THREE.Vector3; color: string }[]>([])
  const { layers, density } = useNeuralNetworkStore()

  // Generate neural network
  useEffect(() => {
    const newNeurons = []
    const newConnections = []
    const layerCount = layers
    const neuronsPerLayer = Math.floor(5 + density * 10)
    const colors = [
      "#00ffff", // cyan
      "#ff00ff", // magenta
      "#00ff99", // neon green
      "#ff3366", // neon pink
    ]

    // Create neurons in layers
    for (let layer = 0; layer < layerCount; layer++) {
      const layerZ = (layer - (layerCount - 1) / 2) * 4
      const layerColor = colors[layer % colors.length]

      for (let i = 0; i < neuronsPerLayer; i++) {
        const angle = (i / neuronsPerLayer) * Math.PI * 2
        const radius = 2 + Math.random() * 1
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        newNeurons.push({
          position: new THREE.Vector3(x, y, layerZ),
          color: layerColor,
        })

        // Connect to next layer (if not the last layer)
        if (layer < layerCount - 1) {
          // Connect to random neurons in the next layer
          const connectionsCount = 1 + Math.floor(Math.random() * 2)
          for (let c = 0; c < connectionsCount; c++) {
            const nextLayerIndex = (layer + 1) * neuronsPerLayer + Math.floor(Math.random() * neuronsPerLayer)
            if (nextLayerIndex < layerCount * neuronsPerLayer && newNeurons[nextLayerIndex]) {
              newConnections.push({
                start: new THREE.Vector3(x, y, layerZ),
                end: newNeurons[nextLayerIndex].position,
                color: layerColor,
              })
            }
          }
        }
      }
    }

    setNeurons(newNeurons)
    setConnections(newConnections)
  }, [layers, density])

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {neurons.map((neuron, index) => (
        <Neuron
          key={`neuron-${index}`}
          position={neuron.position}
          color={neuron.color}
          pulseSpeed={0.5 + Math.random() * 0.5}
          size={0.1 + Math.random() * 0.1}
        />
      ))}

      {connections.map((connection, index) => (
        <Connection
          key={`connection-${index}`}
          start={connection.start}
          end={connection.end}
          color={connection.color}
          thickness={0.02 + Math.random() * 0.02}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export default function NeuralNetworkBackground() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <NeuralNetworkScene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90 pointer-events-none" />
    </div>
  )
}


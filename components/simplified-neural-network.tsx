"use client"

import { useEffect, useRef } from "react"
import { useNeuralNetworkStore } from "@/lib/store"

export default function SimplifiedNeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { animationSpeed, layers, density, algorithm } = useNeuralNetworkStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Neural network parameters with cybersecurity theme
    const layerCount = layers
    const neuronsPerLayer = Math.floor(5 + density * 15)
    const colors = [
      "#b76cfd", // Vibrant purple
      "#24b0b7", // Cool teal
    ]
    
    // Background
    const drawBackground = () => {
      ctx.fillStyle = "#1b1b1b" // Deep dark base
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Generate particles for data flow simulation
    const particles = []
    const particleCount = 50 + Math.floor(density * 100)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: 0.1 + Math.random() * 0.3
      })
    }

    // Generate neurons
    const neurons = []
    for (let layer = 0; layer < layerCount; layer++) {
      const layerX = (canvas.width * (layer + 1)) / (layerCount + 1)
      const layerColor = colors[layer % colors.length]

      for (let i = 0; i < neuronsPerLayer; i++) {
        const y = (canvas.height * (i + 1)) / (neuronsPerLayer + 1)
        neurons.push({
          x: layerX,
          y,
          color: layerColor,
          size: 2.5 + Math.random() * 3,
          pulseSpeed: 0.5 + Math.random() * 1.5,
          glowIntensity: 0.7 + Math.random() * 0.3
        })
      }
    }

    // Generate connections with gradient capability
    const connections = []
    for (let layer = 0; layer < layerCount - 1; layer++) {
      const startIdx = layer * neuronsPerLayer
      const endIdx = (layer + 1) * neuronsPerLayer

      for (let i = 0; i < neuronsPerLayer; i++) {
        const from = neurons[startIdx + i]

        // Connect to 1-3 neurons in the next layer
        const connectionsCount = 1 + Math.floor(Math.random() * 2)
        for (let c = 0; c < connectionsCount; c++) {
          const toIdx = endIdx + Math.floor(Math.random() * neuronsPerLayer)
          if (neurons[toIdx]) {
            connections.push({
              from,
              to: neurons[toIdx],
              fromColor: from.color,
              toColor: neurons[toIdx].color,
              width: 0.5 + Math.random() * 1,
              pulseOffset: Math.random() * Math.PI * 2, // Random phase offset
              dataFlow: [], // Will hold data particles flowing along this connection
              dataFlowRate: 0.2 + Math.random() * 0.6 // Different rates for different connections
            })
            
            // Add 0-3 data particles on this connection
            const particleCount = Math.floor(Math.random() * 4)
            for (let p = 0; p < particleCount; p++) {
              connections[connections.length - 1].dataFlow.push({
                position: Math.random(), // Position along the line (0-1)
                speed: 0.001 + Math.random() * 0.003, // Speed of the particle
                size: 1.5 + Math.random(), // Particle size
                opacity: 0.6 + Math.random() * 0.4 // Particle opacity
              })
            }
          }
        }
      }
    }

    // Animation loop
    let animationId
    const animate = () => {
      // Draw background
      drawBackground()
      
      // Update and draw ambient particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX * animationSpeed
        particle.y += particle.speedY * animationSpeed
        
        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.fill()
      })

      // Draw connections
      connections.forEach((conn) => {
        const t = Date.now() * 0.001 * animationSpeed

        // Draw the line with gradient between the two colors
        const gradient = ctx.createLinearGradient(conn.from.x, conn.from.y, conn.to.x, conn.to.y)
        gradient.addColorStop(0, conn.fromColor)
        gradient.addColorStop(1, conn.toColor)
        
        ctx.beginPath()
        ctx.moveTo(conn.from.x, conn.from.y)
        ctx.lineTo(conn.to.x, conn.to.y)

        // Different animation based on algorithm
        if (algorithm === "wave") {
          // Wave-like pulse traveling along the connection
          const distance = Math.sqrt(Math.pow(conn.to.x - conn.from.x, 2) + Math.pow(conn.to.y - conn.from.y, 2))
          const wave = Math.sin(t * 2 - distance * 0.01 + conn.pulseOffset) * 0.5 + 0.5
          ctx.strokeStyle = gradient
          ctx.globalAlpha = wave * 0.8
          ctx.lineWidth = conn.width
        } else {
          // Default pulse with gradient
          const pulse = Math.sin(t + conn.pulseOffset) * 0.3 + 0.7
          ctx.strokeStyle = gradient
          ctx.globalAlpha = pulse * 0.8
          ctx.lineWidth = conn.width
        }

        ctx.stroke()
        ctx.globalAlpha = 1
        
        // Draw data flow particles along connections
        conn.dataFlow.forEach(particle => {
          // Update position
          particle.position += particle.speed * animationSpeed
          if (particle.position > 1) {
            particle.position = 0 // Reset when reaching the end
          }
          
          // Calculate position along the line
          const x = conn.from.x + (conn.to.x - conn.from.x) * particle.position
          const y = conn.from.y + (conn.to.y - conn.from.y) * particle.position
          
          // Draw glowing particle
          ctx.beginPath()
          ctx.arc(x, y, particle.size, 0, Math.PI * 2)
          
          // Use gradient color based on position
          const particleColor = particle.position < 0.5 ? conn.fromColor : conn.toColor
          ctx.fillStyle = particleColor
          ctx.globalAlpha = particle.opacity
          ctx.fill()
          
          // Add glow effect
          const glowSize = particle.size * 3
          const glow = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
          glow.addColorStop(0, particleColor)
          glow.addColorStop(1, "rgba(255,255,255,0)")
          ctx.fillStyle = glow
          ctx.globalAlpha = particle.opacity * 0.6
          ctx.fill()
          
          ctx.globalAlpha = 1
        })
      })

      // Draw neurons
      neurons.forEach((neuron) => {
        const t = Date.now() * 0.001 * neuron.pulseSpeed * animationSpeed
        const size = neuron.size * (1 + 0.3 * Math.sin(t))

        // Draw main neuron
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
        ctx.fillStyle = neuron.color
        ctx.fill()

        // Soft white glow around nodes
        const glowIntensity = neuron.glowIntensity * (0.8 + 0.2 * Math.sin(t))
        const innerGlow = 5 + 3 * Math.sin(t)
        const outerGlow = 15 + 5 * Math.sin(t * 0.7)
        
        // Inner glow (colored)
        const innerGradient = ctx.createRadialGradient(
          neuron.x, neuron.y, size, 
          neuron.x, neuron.y, innerGlow
        )
        innerGradient.addColorStop(0, neuron.color)
        innerGradient.addColorStop(1, "rgba(255,255,255,0)")
        
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, innerGlow, 0, Math.PI * 2)
        ctx.fillStyle = innerGradient
        ctx.globalAlpha = glowIntensity * 0.8
        ctx.fill()
        
        // Outer glow (white)
        const outerGradient = ctx.createRadialGradient(
          neuron.x, neuron.y, innerGlow, 
          neuron.x, neuron.y, outerGlow
        )
        outerGradient.addColorStop(0, "rgba(255,255,255,0.5)")
        outerGradient.addColorStop(1, "rgba(255,255,255,0)")
        
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, outerGlow, 0, Math.PI * 2)
        ctx.fillStyle = outerGradient
        ctx.globalAlpha = glowIntensity * 0.4
        ctx.fill()
        
        ctx.globalAlpha = 1
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Add interactivity - neurons follow mouse with cybersecurity-themed interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = e.clientY

      // Make some neurons follow the mouse
      for (let i = 0; i < neurons.length; i += 5) {
        // Only affect every 5th neuron for performance
        const neuron = neurons[i]
        const dx = mouseX - neuron.x
        const dy = mouseY - neuron.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 250) {
          // Only affect neurons within 250px
          const angle = Math.atan2(dy, dx)
          const force = (1 - distance / 250) * 2.5 // Stronger effect when closer

          neuron.x += Math.cos(angle) * force
          neuron.y += Math.sin(angle) * force
          
          // Enhance glow when interacted with
          neuron.glowIntensity = Math.min(1.5, neuron.glowIntensity + 0.01)
        } else {
          // Gradually restore glow intensity
          neuron.glowIntensity = Math.max(0.7, neuron.glowIntensity - 0.005)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [animationSpeed, layers, density, algorithm])

  return <canvas ref={canvasRef} className="fixed inset-0 bg-black z-10" />
}


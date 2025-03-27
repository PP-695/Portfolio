"use client"

import { useState, useEffect } from "react"
import SimplifiedNeuralNetwork from "@/components/simplified-neural-network"
import HeroSection from "@/components/hero-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import ControlPanel from "@/components/control-panel"
import Header from "@/components/header"

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-cyan-400">Loading Portfolio...</h1>
          <p className="text-gray-400">Please wait while the neural network initializes</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <SimplifiedNeuralNetwork />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80 pointer-events-none" />
      <Header />
      <div className="container mx-auto px-4 relative z-10">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
      <ControlPanel />
    </main>
  )
}


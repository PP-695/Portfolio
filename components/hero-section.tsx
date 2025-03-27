"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Cybersecurity Specialist & Network Engineer"

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-start py-20" id="hero">
      <div className="max-w-3xl">
        <div className="inline-block px-4 py-1 mb-4 border border-cyan-500 text-cyan-400 rounded-full text-sm font-mono animate-pulse">
          PORTFOLIO v2.0
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          ALEX NEURAL
        </h1>
        <div className="h-8 mb-6">
          <p className="text-xl text-gray-300 font-mono">
            {typedText}
            <span className="animate-blink">|</span>
          </p>
        </div>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl">
          Specializing in advanced network security, penetration testing, and cryptographic systems. Building the secure
          digital infrastructure of tomorrow.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 rounded-md font-medium text-lg group transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 px-8 py-6 rounded-md font-medium text-lg transition-all duration-300"
            onClick={() => scrollToSection("projects")}
          >
            View Projects
          </Button>
        </div>
      </div>
    </section>
  )
}


"use client"

import { useState } from "react"
import { Sliders, ChevronUp, ChevronDown } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useNeuralNetworkStore } from "@/lib/store"

export default function ControlPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { animationSpeed, setAnimationSpeed, layers, setLayers, density, setDensity, algorithm, setAlgorithm } =
    useNeuralNetworkStore()

  return (
    <div
      className={`fixed bottom-0 right-0 z-20 transition-all duration-300 ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-3rem)]"}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-gray-900/80 backdrop-blur-sm border-t border-l border-gray-800 rounded-tl-lg px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors"
      >
        <div className="flex items-center">
          <Sliders className="h-4 w-4 mr-2" />
          Neural Network Controls
        </div>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </button>

      <div className="bg-gray-900/80 backdrop-blur-sm border-t border-l border-gray-800 rounded-tl-lg p-4 w-72">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Animation Speed</label>
            <Slider
              value={[animationSpeed]}
              min={0.1}
              max={2}
              step={0.1}
              onValueChange={(value) => setAnimationSpeed(value[0])}
              className="py-1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Network Layers</label>
            <Slider
              value={[layers]}
              min={2}
              max={5}
              step={1}
              onValueChange={(value) => setLayers(value[0])}
              className="py-1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>2</span>
              <span>5</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Neuron Density</label>
            <Slider
              value={[density]}
              min={0.2}
              max={1}
              step={0.1}
              onValueChange={(value) => setDensity(value[0])}
              className="py-1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Sparse</span>
              <span>Dense</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Animation Algorithm</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={algorithm === "pulse" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlgorithm("pulse")}
                className={algorithm === "pulse" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
              >
                Pulse
              </Button>
              <Button
                variant={algorithm === "wave" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlgorithm("wave")}
                className={algorithm === "wave" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
              >
                Wave
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


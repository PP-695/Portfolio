"use client"

import { create } from "zustand"

type NeuralNetworkStore = {
  animationSpeed: number
  setAnimationSpeed: (speed: number) => void
  layers: number
  setLayers: (layers: number) => void
  density: number
  setDensity: (density: number) => void
  algorithm: "pulse" | "wave"
  setAlgorithm: (algorithm: "pulse" | "wave") => void
}

export const useNeuralNetworkStore = create<NeuralNetworkStore>((set) => ({
  animationSpeed: 1.2,
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  layers: 4,
  setLayers: (layers) => set({ layers }),
  density: 0.8,
  setDensity: (density) => set({ density }),
  algorithm: "wave",
  setAlgorithm: (algorithm) => set({ algorithm }),
}))


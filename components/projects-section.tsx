"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "SecureNet Framework",
    description:
      "An advanced network security framework with real-time threat detection and automated response capabilities.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Security",
    technologies: ["C++", "Python", "Machine Learning"],
    link: "#",
    github: "#",
    details:
      "SecureNet is a comprehensive security solution that combines signature-based detection with machine learning algorithms to identify and mitigate network threats in real-time. The framework includes modules for traffic analysis, anomaly detection, and automated incident response.",
  },
  {
    id: 2,
    title: "CryptoVault",
    description:
      "A zero-knowledge encryption system for secure data storage and transmission across untrusted networks.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Cryptography",
    technologies: ["Rust", "WebAssembly", "Blockchain"],
    link: "#",
    github: "#",
    details:
      "CryptoVault implements advanced encryption algorithms and zero-knowledge proofs to ensure data confidentiality and integrity. The system includes a distributed architecture for key management and supports multi-factor authentication for access control.",
  },
  {
    id: 3,
    title: "NetGuardian",
    description: "An intelligent firewall system with adaptive rule generation based on network behavior analysis.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Networks",
    technologies: ["C++", "Docker", "Kubernetes"],
    link: "#",
    github: "#",
    details:
      "NetGuardian uses behavioral analysis to automatically generate and update firewall rules based on network traffic patterns. The system includes a machine learning component that continuously improves detection accuracy and reduces false positives over time.",
  },
  {
    id: 4,
    title: "Phantom VPN",
    description: "A high-performance VPN solution with advanced obfuscation techniques to bypass network restrictions.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Privacy",
    technologies: ["C", "OpenSSL", "Network Protocols"],
    link: "#",
    github: "#",
    details:
      "Phantom VPN implements custom obfuscation protocols to disguise VPN traffic as regular HTTPS traffic, making it difficult to detect and block. The system includes multi-hop routing and perfect forward secrecy to ensure maximum privacy and security.",
  },
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))]

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section className="py-20" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          Featured Projects
        </h2>
        <p className="text-white-400 mb-8 text-xl">Innovative solutions I've developed</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500 transition-all duration-300 group cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
              onClick={() => setSelectedProject(project)}
              style={{
                opacity: 1,
                transform: "translateY(0px)",
                transition: "opacity 0.3s, transform 0.3s",
              }}
            >
              <div className="relative overflow-hidden h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60" />
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-4 z-20">
                  <span className="bg-cyan-500/80 text-white text-xs px-2 py-1 rounded">{project.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              opacity: 1,
              transition: "opacity 0.3s",
            }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
              style={{
                opacity: 1,
                transition: "opacity 0.3s",
              }}
            />
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto relative z-10">
              <button
                className="absolute top-4 right-4 bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(null)
                }}
              >
                <X size={20} />
              </button>
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 text-cyan-400">{selectedProject.title}</h3>
                    <span className="bg-cyan-500/80 text-white text-xs px-2 py-1 rounded">
                      {selectedProject.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={selectedProject.github}
                      className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={selectedProject.link}
                      className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{selectedProject.details}</p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(selectedProject.link, "_blank")
                  }}
                >
                  View Live Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


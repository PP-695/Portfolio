"use client"

import { useState } from "react"

const skills = [
  { name: "C++", icon: "💻", category: "Languages" },
  { name: "Python", icon: "🐍", category: "Languages" },
  //{ name: "Rust", icon: "🦀", category: "Languages" },
  //{ name: "Network Security", icon: "🔒", category: "Security" },
  //{ name: "Penetration Testing", icon: "🛡️", category: "Security" },
  { name: "Cryptography", icon: "🔐", category: "Security" },
  //{ name: "Firewall Configuration", icon: "🧱", category: "Networks" },
  { name: "VPN Implementation", icon: "🌐", category: "Networks" },
  //{ name: "Intrusion Detection", icon: "👁️", category: "Security" },
  { name: "Malware Analysis", icon: "🦠", category: "Security" },
  { name: "Cloud Security", icon: "☁️", category: "Cloud" },
  { name: "Docker", icon: "🐳", category: "DevOps" },
  { name: "Deep Learning", icon: "🤖", category: "AI/ML" },
  { name: "Machine Learning", icon: "📊", category: "AI/ML" },
  { name: "Computer Vision", icon: "📷", category: "AI/ML" },
  { name: "Data Science", icon: "📈", category: "AI/ML" },
  { name: "Quantum Computing", icon: "⚛️", category: "AI/ML" },
  { name: "MERN Stack", icon: "🖥️", category: "Full Stack" },
  { name: "Next.js", icon: "⏭️", category: "Full Stack" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Express.js", icon: "🚀", category: "Backend" },
  { name: "MongoDB", icon: "🍃", category: "Database" },
  { name: "React", icon: "⚛️", category: "Frontend" },
];


export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))]

  const filteredSkills = activeCategory === "All" ? skills : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section className="py-20" id="skills">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          Technical Arsenal
        </h2>
        <p className="text-white-400 mb-8 text-xl">Specialized skills and technologies I've mastered</p>

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
              style={{
                opacity: 1,
                transform: "translateY(0px)",
                transition: "opacity 0.3s, transform 0.3s",
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <div className="text-3xl mb-3">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">{skill.name}</h3>
              <p className="text-gray-500 text-sm">{skill.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


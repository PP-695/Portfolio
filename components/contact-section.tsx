"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Twitter, Linkedin, Mail, Send, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  const [validationErrors, setValidationErrors] = useState<{
    name?: string[]
    email?: string[]
    message?: string[]
  }>({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })
    setValidationErrors({})

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          setValidationErrors(data.errors)
          setFormStatus({
            type: "error",
            message: "Please correct the errors in the form.",
          })
        } else {
          setFormStatus({
            type: "error",
            message: data.message || "Something went wrong. Please try again.",
          })
        }
      } else {
        setFormStatus({
          type: "success",
          message: "Thanks for your message! I'll get back to you soon.",
        })
        setFormState({ name: "", email: "", message: "" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, url: "https://github.com/PP-695", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/in/purandar-puneet-918b92192/", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, url: "mailto:purandarbalasa@gmail.com", label: "Email" },
  ]

  return (
    <section className="py-20" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          Get In Touch
        </h2>
        <p className="text-white-400 mb-12 text-xl">Have a project in mind? Let's collaborate</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-lg p-8 hover:border-cyan-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Send a Message</h3>

            {formStatus.type && (
              <Alert
                className={`mb-6 ${
                  formStatus.type === "success"
                    ? "bg-green-500/20 border-green-500 text-green-400"
                    : "bg-red-500/20 border-red-500 text-red-400"
                }`}
              >
                {formStatus.type === "success" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>{formStatus.type === "success" ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>{formStatus.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white-400 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className={`bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 ${
                      validationErrors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  {validationErrors.name && <p className="mt-1 text-sm text-red-400">{validationErrors.name[0]}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white-400 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className={`bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 ${
                      validationErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  {validationErrors.email && <p className="mt-1 text-sm text-red-400">{validationErrors.email[0]}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white-400 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none ${
                      validationErrors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  {validationErrors.message && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.message[0]}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 rounded-md font-medium transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Connect With Me</h3>
            <p className="text-white-400 mb-8">
              Feel free to reach out through any of these platforms. I'm always open to discussing new projects,
              creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="flex items-center gap-4 p-4 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-lg hover:border-cyan-500 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                >
                  <div className="bg-gray-800 p-3 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                    {link.icon}
                  </div>
                  <span className="font-medium group-hover:text-cyan-400 transition-colors">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


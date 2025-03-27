import { NextResponse } from "next/server"
import { z } from "zod"
import { sendContactEmail } from "@/lib/email-service"

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const { name, email, message } = result.data

    // Sanitize inputs (basic example - in production use a proper sanitizer)
    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 100),
      message: message.trim().slice(0, 5000),
    }

    // Send email
    const emailSent = await sendContactEmail(sanitizedData)

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: "Failed to send email. Please try again later." },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 },
    )
  }
}


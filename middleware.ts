import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Only apply to /api/contact
  if (path !== "/api/contact") {
    return NextResponse.next()
  }

  // Check for CSRF protection
  const referer = request.headers.get("referer")
  const host = request.headers.get("host")

  // Basic CSRF check - ensure the request is coming from our own site
  if (!referer || !referer.includes(host)) {
    return NextResponse.json({ success: false, message: "CSRF check failed" }, { status: 403 })
  }

  // Rate limiting - could be implemented with Redis or similar in production
  // For now, we'll use a simple header check
  const clientIp = request.headers.get("x-forwarded-for") || "unknown"

  // In a real implementation, you would check against a rate limit store
  // and block if too many requests from the same IP

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}


import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  
  // Check if we're accessing the API routes
  if (pathName.startsWith('/api/')) {
    // For API routes, check if the necessary environment variables are set
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";


    // Here we specifically check for the contact endpoint
    if (pathName === '/api/contact') {
      // Make sure all required env variables are present
      if (!serviceId || !templateId || !publicKey) {
        // Return a proper error response if any required env var is missing
        return NextResponse.json(
          { 
            success: false, 
            message: 'Email service is not properly configured' 
          },
          { status: 500 }
        );
      }
    }
  }

  // Continue with the request normally
  return NextResponse.next();
}

// Configure which paths this middleware runs on
export const config = {
  matcher: [
    // Apply to all API routes
    '/api/:path*',
  ],
};


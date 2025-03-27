import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Let's make sure we handle null values properly
  // The error is happening because somewhere we're passing a string|null to a function that expects string
  
  // If this is related to environment variables, we need to check them before using
  const pathName = request.nextUrl.pathname;
  
  // Example logic that safely handles null or undefined values
  if (pathName.startsWith('/api/')) {
    // For API routes, ensure proper handling of environment variables
    if (!process.env.EMAILJS_SERVICE_ID || 
        !process.env.EMAILJS_TEMPLATE_ID || 
        !process.env.EMAILJS_PUBLIC_KEY) {
      // Log the missing configuration (in development only)
      if (process.env.NODE_ENV === 'development') {
        console.warn('Missing EmailJS configuration');
      }
      
      // For API routes that need EmailJS, we can return a specific error
      if (pathName === '/api/contact') {
        return NextResponse.json(
          { success: false, message: 'Email service is not configured' },
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


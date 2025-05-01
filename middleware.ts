import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user')?.value
  const path = request.nextUrl.pathname

  // Handle protected routes
  if (path.startsWith('/admin') || path.startsWith('/dashboard') || path.startsWith('/bookings') || path.startsWith('/favorites')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const userData = JSON.parse(user)
      
      // Protect admin routes
      if (path.startsWith('/admin') && userData.userType !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // Protect user routes
      if ((path.startsWith('/dashboard') || path.startsWith('/bookings') || path.startsWith('/favorites')) && userData.userType !== 'user') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/bookings/:path*',
    '/favorites/:path*'
  ]
}
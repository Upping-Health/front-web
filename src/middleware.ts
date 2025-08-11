import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const signInURL = new URL('/login', request.url)
  const dashboardURL = new URL('/dashboard', request.url)

  const publicPaths = ['/login', '/register', '/accountRecovery']
  const currentPath = request.nextUrl.pathname

  if (currentPath === '/initial') return NextResponse.next()

  if (currentPath === '/') {
    return NextResponse.redirect(signInURL)
  }

  if (!token && !publicPaths.includes(currentPath)) {
    return NextResponse.redirect(signInURL)
  }
  if (token && publicPaths.includes(currentPath)) {
    return NextResponse.redirect(dashboardURL)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"
import { ROLE } from "./utils/types/roles";
import { jwtDecode } from "jwt-decode";



export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const signInURL = new URL('/login', request.url);
  const dashboardURL = new URL('/dashboard', request.url);

  const publicPaths = ['/login', '/register', '/accountRecovery'];
  const currentPath = request.nextUrl.pathname;
  
  if (currentPath === '/') {
    return NextResponse.redirect(signInURL);
  }

  if (!token && !publicPaths.includes(currentPath)) {
    return NextResponse.redirect(signInURL);
  }
  if (token && publicPaths.includes(currentPath)) {
    return NextResponse.redirect(dashboardURL);
  }

  return NextResponse.next();
  
  
}

export const config = {
  matcher: ['/', '/login', '/home', '/dashboard','/register','/accountRecovery']
}
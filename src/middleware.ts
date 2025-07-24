import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  const isAuthenticated = !!token;
  
  const isAuthPage = request.nextUrl.pathname === '/auth';
  const isHomePage = request.nextUrl.pathname === '/home' || request.nextUrl.pathname === '/';
  
  // If trying to access auth page while already authenticated
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  
  // If trying to access protected pages while not authenticated
  if (!isAuthPage && !isAuthenticated && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  
  // Redirect root to appropriate page based on auth status
  if (request.nextUrl.pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/home', request.url));
    } else {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
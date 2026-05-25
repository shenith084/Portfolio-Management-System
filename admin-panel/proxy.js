import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Routes that require authentication
const PROTECTED_PATHS = ['/dashboard'];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Check if the path needs protection
  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Get the JWT cookie
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    // No token — redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify the token
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    // Invalid or expired token — redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    const response = NextResponse.redirect(loginUrl);
    // Clear the invalid cookie
    response.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
    return response;
  }
}

export const config = {
  matcher: [
    // Match /dashboard and all sub-paths
    '/dashboard/:path*',
  ],
};

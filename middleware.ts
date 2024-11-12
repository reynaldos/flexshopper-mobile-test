import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_AUTH_TOKEN = process.env.API_AUTH_TOKEN;

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Only apply this middleware to API routes
  if (url.pathname.startsWith('/api')) {
    // Check for the secure token
    const token = request.headers.get('x-api-auth-token');

    if (token === API_AUTH_TOKEN) {
      return NextResponse.next(); // Allow the request
    }

    // If the token is missing or incorrect, return 401
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}
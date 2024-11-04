// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const noScript = url.searchParams.get('noScripts');

  if (noScript) {
    const response = NextResponse.next();
    response.cookies.set('noScripts', noScript);
    return response;
  }else{
    const response = NextResponse.next();
    response.cookies.delete('noScripts')
    return response;
  }

}

export const config = {
  matcher: '/:path*', // Apply middleware to all routes
};
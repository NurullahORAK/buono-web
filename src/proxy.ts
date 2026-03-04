// src/proxy.ts
import { NextResponse, type NextRequest } from 'next/server';

function basicAuthOk(req: NextRequest, user: string, pass: string) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return false;

  const decoded = atob(auth.slice(6));
  const [u, p] = decoded.split(':');
  return u === user && p === pass;
}

// Next.js 16 proxy export
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/studio')) {
    const user = process.env.STUDIO_BASIC_AUTH_USER;
    const pass = process.env.STUDIO_BASIC_AUTH_PASS;

    if (user && pass) {
      if (!basicAuthOk(req, user, pass)) {
        return new NextResponse('Auth required', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Studio"' },
        });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*'],
};

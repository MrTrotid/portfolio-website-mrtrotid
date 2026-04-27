import { NextRequest, NextResponse } from 'next/server';
import { siteUrl } from '@/lib/site';

const buildCsp = (nonce: string) => {
  if (process.env.NODE_ENV !== 'production') {
    const devDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' ws: wss: http: https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ];

    return devDirectives.join('; ');
  }

    const directives = [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
      "report-uri /api/csp-report",
      "report-to default",
  ];

  return directives.join('; ');
};

const generateNonce = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
};

const applySecurityHeaders = (response: NextResponse, nonce: string) => {
  response.headers.set('Content-Security-Policy', buildCsp(nonce));
  response.headers.set('X-Nonce', nonce);
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('Origin-Agent-Cluster', '?1');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Robots-Tag', 'index, follow');
  response.headers.set('Report-To', '{"group":"default","max_age":31536000,"endpoints":[{"url":"https://your-endpoint.com/csp-report"}],"include_subdomains":true}');
  response.headers.delete('Access-Control-Allow-Origin');
};

export const middleware = (request: NextRequest) => {
  const nonce = generateNonce();
  const hostname = request.headers.get('host');

  // If subdomain is resume.*, serve the resume PDF as the primary content.
  if (hostname?.startsWith('resume.')) {
    const url = request.nextUrl.clone();
    if (url.pathname === '/resume.pdf') {
      const response = NextResponse.next();
      applySecurityHeaders(response, nonce);

      if (request.nextUrl.pathname.startsWith('/api')) {
        response.headers.set('Access-Control-Allow-Origin', siteUrl);
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      }

      return response;
    }
    url.pathname = '/resume.pdf';
    const response = NextResponse.rewrite(url);
    applySecurityHeaders(response, nonce);

    if (request.nextUrl.pathname.startsWith('/api')) {
      response.headers.set('Access-Control-Allow-Origin', siteUrl);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    return response;
  }

  const response = NextResponse.next();
  applySecurityHeaders(response, nonce);

  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', siteUrl);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
};

export const config = {
  matcher: ['/(.*)', '/api/(.*)'],
};

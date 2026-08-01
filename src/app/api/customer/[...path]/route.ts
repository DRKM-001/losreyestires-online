import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const DEFAULT_API_BASE = 'https://api.tireraven.com/api/external/v1';
const MAX_BODY_BYTES = 32 * 1024;

const allowedRoutes: Array<{ method: string; pattern: RegExp }> = [
  { method: 'POST', pattern: /^auth\/(register|login|logout|logout_all|refresh|forgot-password|reset-password)$/ },
  { method: 'GET', pattern: /^profile$/ },
  { method: 'PATCH', pattern: /^profile$/ },
  { method: 'PATCH', pattern: /^profile\/password$/ },
  { method: 'GET', pattern: /^customer\/orders$/ },
  { method: 'GET', pattern: /^customer\/orders\/[A-Za-z0-9_-]{1,100}$/ },
];

function isAllowed(method: string, path: string): boolean {
  return allowedRoutes.some((route) => route.method === method && route.pattern.test(path));
}

function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return request.headers.get('sec-fetch-site') !== 'cross-site';

  const allowedOrigins = new Set([request.nextUrl.origin]);
  if (process.env.SITE_ORIGIN) {
    try {
      allowedOrigins.add(new URL(process.env.SITE_ORIGIN).origin);
    } catch {
      console.error('SITE_ORIGIN is not a valid URL');
    }
  }

  try {
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

async function proxyCustomerRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await context.params;
  const path = segments.join('/');

  if (!isAllowed(request.method, path)) {
    return NextResponse.json({ error: 'Customer API route not found' }, { status: 404 });
  }

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Cross-origin requests are not allowed' }, { status: 403 });
  }

  const apiKey = process.env.TIRERAVEN_API_KEY;
  if (!apiKey) {
    console.error('Customer API unavailable: TIRERAVEN_API_KEY is not configured');
    return NextResponse.json({ error: 'Customer services are temporarily unavailable' }, { status: 503 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request body is too large' }, { status: 413 });
  }

  let body: ArrayBuffer | undefined;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
    }
    body = await request.arrayBuffer();
    if (body.byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body is too large' }, { status: 413 });
    }
  }

  const apiBase = (process.env.TIRERAVEN_API_BASE || DEFAULT_API_BASE).replace(/\/$/, '');
  const upstreamUrl = new URL(`${apiBase}/${path}`);
  if (path === 'customer/orders') {
    const page = request.nextUrl.searchParams.get('page');
    const perPage = request.nextUrl.searchParams.get('per_page');
    if (page && /^\d{1,4}$/.test(page)) upstreamUrl.searchParams.set('page', page);
    if (perPage && /^\d{1,3}$/.test(perPage)) upstreamUrl.searchParams.set('per_page', perPage);
  }

  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
  });
  const authorization = request.headers.get('authorization');
  if (authorization?.startsWith('Bearer ')) {
    headers.set('Authorization', authorization);
  }

  try {
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body,
      cache: 'no-store',
    });
    const responseBody = await upstream.text();
    const contentType = upstream.headers.get('content-type') || 'application/json';

    return new NextResponse(responseBody, {
      status: upstream.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Customer API provider request failed', error);
    return NextResponse.json({ error: 'Customer services are temporarily unavailable' }, { status: 502 });
  }
}

export const GET = proxyCustomerRequest;
export const POST = proxyCustomerRequest;
export const PATCH = proxyCustomerRequest;

import type { NextConfig } from "next";

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'"] : []),
  'https://www.googletagmanager.com',
];

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${scriptSources.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://images.unsplash.com https://budstyres.com.au https://di-uploads-pod45.dealerinspire.com https://www.simivalleychryslerdodgejeepram.com https://summit4x4company.com https://assets.snapfinance.com https://www.google-analytics.com https://*.googleusercontent.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "worker-src 'self' blob:",
].join('; ');

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {},
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'budstyres.com.au',
      },
      {
        protocol: 'https',
        hostname: 'di-uploads-pod45.dealerinspire.com',
      },
      {
        protocol: 'https',
        hostname: 'www.simivalleychryslerdodgejeepram.com',
      },
      {
        protocol: 'https',
        hostname: 'summit4x4company.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.snapfinance.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default nextConfig;

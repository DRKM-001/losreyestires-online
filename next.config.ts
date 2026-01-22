import type { NextConfig } from "next";

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
    ],
  },
  webpack: (config: any, { isServer, nextRuntime }: any) => {
    // Fixes npm packages that depend on `node:` modules
    if (!isServer || nextRuntime === 'edge') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: false,
        crypto: false,
        buffer: false,
        util: false,
        net: false,
        tls: false,
        fs: false,
        child_process: false,
      };

      config.resolve.alias = {
        ...config.resolve.alias,
        'node:stream': false,
        'node:buffer': false,
        'node:crypto': false,
        'node:util': false,
        'node:net': false,
        'node:tls': false,
        'node:fs': false,
        'node:child_process': false,
      };
    }
    return config;
  },
};

export default nextConfig;

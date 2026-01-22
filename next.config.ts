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
};

export default nextConfig;

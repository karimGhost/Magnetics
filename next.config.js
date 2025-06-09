// next.config.js
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['placehold.co', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {},
  },
};

const withPWAConfig = withPWA({
  dest: 'public', // PWA-specific config
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development', // disable PWA in dev
});

export default withPWAConfig(nextConfig); // ✅ Wrap nextConfig

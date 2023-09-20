/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ['@acme/ui', 'mongoose'],
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.clerk.com',
      },
      {
        protocol: 'https',
        hostname: '**.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}
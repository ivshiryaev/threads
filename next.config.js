/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ['@acme/ui'],
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}
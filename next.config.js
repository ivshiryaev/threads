module.exports = {
  images: {
	experimental: {
		serverActions: true,
		serverComponentsExternalPackages: ['@acme/ui'],
	},
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
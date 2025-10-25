/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['firebasestorage.googleapis.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    removeConsole: true,
  },

  poweredByHeader: false,
  compress: true,
  output: 'standalone',
}

module.exports = nextConfig

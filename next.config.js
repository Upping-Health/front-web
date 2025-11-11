/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    removeConsole: true,
  },

  poweredByHeader: false,
  compress: true,
  output: 'standalone',
}

module.exports = nextConfig

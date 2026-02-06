/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    //removeConsole: false,
  },

  poweredByHeader: false,
  compress: true,
  output: 'standalone',
}

module.exports = nextConfig

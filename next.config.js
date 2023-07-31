/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/dispatch/:path*',
        destination: 'http://localhost/:path*',
      },
    ]
  }
}

module.exports = nextConfig

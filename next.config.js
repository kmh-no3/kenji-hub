/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/kenji-hub' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/kenji-hub/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'default',
    path: process.env.NODE_ENV === 'production' ? '/kenji-hub' : ''
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig

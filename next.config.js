/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.NODE_ENV === 'production' ? '/kenji-hub' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/kenji-hub/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'default',
    path: process.env.NODE_ENV === 'production' ? '/kenji-hub' : ''
  }
}

module.exports = nextConfig

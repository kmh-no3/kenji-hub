/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/kenji-hub',
  assetPrefix: '/kenji-hub/',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 
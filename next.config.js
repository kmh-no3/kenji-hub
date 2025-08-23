/** @type {import('next').NextConfig} */
const nextConfig = {
  // 開発環境では静的エクスポートを無効化
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    basePath: '/kenji-hub',
    assetPrefix: '/kenji-hub/',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  }),
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePathは開発環境と本番環境の両方で適用
  basePath: '/kenji-hub',
  assetPrefix: '/kenji-hub/',
  trailingSlash: true,
  
  // 本番環境でのみ静的エクスポートを有効化
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    images: {
      unoptimized: true,
    },
  }),
}

module.exports = nextConfig

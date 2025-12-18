/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePathは本番環境のみ適用（開発環境では無効）
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/kenji-hub',
    assetPrefix: '/kenji-hub/',
  }),
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

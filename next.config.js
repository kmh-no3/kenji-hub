/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages用の設定
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/kenji-hub' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/kenji-hub/' : '',
  trailingSlash: true,
  // 画像の最適化を無効化（静的エクスポート用）
  images: {
    unoptimized: true,
  },
  // 静的エクスポート時の設定
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

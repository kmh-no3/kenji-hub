import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export', // 静的HTMLを出力する
  basePath: isProd ? '/kenji-hub' : '',
  assetPrefix: isProd ? '/kenji-hub/' : '',
};

export default nextConfig;

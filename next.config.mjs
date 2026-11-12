/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  /* URLの末にスラッシュをつける */
  trailingSlash: true,

  reactCompiler: true,
  /* ホスティングサービス：Cloudflareにデプロイ */
  output: "export",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;

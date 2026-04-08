/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;

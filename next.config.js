/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        // Reduce file-watching load from large asset folders in dev.
        ignored: [
          "**/node_modules/**",
          "**/public/models/**",
          "**/public/products/**",
        ],
      };
    }

    return config;
  },
};

module.exports = nextConfig;

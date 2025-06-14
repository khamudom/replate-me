/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true,
  // This helps with dynamic routes in static exports
  experimental: {
    appDocumentPreloading: false,
  },
};

module.exports = nextConfig;

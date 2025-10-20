import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
      },
    ],
  },
  // Enable React strict mode for better error detection
  reactStrictMode: true,
  // Optimize for production
  swcMinify: true,
  // Configure i18n routing
  experimental: {
    optimizeCss: true,
  },
};

export default withNextIntl(nextConfig);


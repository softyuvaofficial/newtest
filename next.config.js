/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable environment variables to be used in the browser (NEXT_PUBLIC_)
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
    // Do NOT expose private keys here
  },

  // Images optimization (add your domains if you use external images)
  images: {
    domains: ['your-cdn-domain.com', 'supabase-storage-url.supabase.co'],
  },

  // Webpack custom config if needed
  webpack(config, options) {
    // Example: polyfill for Node modules if needed
    return config;
  },

  // Internationalization (if you want multiple languages)
  // i18n: {
  //   locales: ['en', 'hi'],
  //   defaultLocale: 'en',
  // },
};

module.exports = nextConfig;

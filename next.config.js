/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  images: {
    remotePatterns: [{ hostname: "loremflickr.com" }],
  },
};

module.exports = nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;
// next.config.js
const nextConfig = {
  webpack(config, options) {
    // Remove existing svg rule
    config.module.rules = config.module.rules.map(rule => {
      if (rule.test?.toString().includes('svg')) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    });

    // Add new rule for SVG using @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

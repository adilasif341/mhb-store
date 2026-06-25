import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "sg-test-11.slatic.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/collections/all",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/pages/contact",
        destination: "/order-tracking",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

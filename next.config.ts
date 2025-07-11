import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landingpage",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

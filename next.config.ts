import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: `/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/**`,
      },
    ],
  },
};

export default nextConfig;

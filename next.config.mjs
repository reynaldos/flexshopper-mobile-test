/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*).(png|jpg|jpeg|svg|webp)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
            port: "",
            pathname: "**",
          },
          {
            protocol: "http",
            hostname: "**",
            port: "",
            pathname: "**",
          },
        ],
      },
};

export default nextConfig;

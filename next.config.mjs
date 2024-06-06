/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "static01.nyt.com",
      },
    ],
  },
};

export default nextConfig;

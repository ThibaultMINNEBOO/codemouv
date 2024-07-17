/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ml1qc4etmbjtefmj.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;

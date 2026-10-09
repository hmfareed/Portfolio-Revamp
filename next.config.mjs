/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/projects/kaypacks',
        destination: '/projects/kayspacks',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

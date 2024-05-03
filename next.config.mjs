/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'congenial-space-engine-g7xqv9rvv7v2v496-3001.app.github.dev',
        'localhost:3000',
      ],
    },
  },
}

export default nextConfig

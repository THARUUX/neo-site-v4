/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neocreative.s3.eu-north-1.amazonaws.com',
        port: '', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'another-allowed-domain.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,  // Matches .glb and .gltf files
      type: 'asset/resource',  // Uses the built-in Asset Modules for static files
    });

    return config;
  },
};

export default nextConfig;

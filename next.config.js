/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'directus.mzz.design',
                port: '',
                pathname: '/assets/**',
            },
        ],
    },
}

module.exports = nextConfig

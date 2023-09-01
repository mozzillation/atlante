/** @type {import('next').NextConfig} */
const nextConfig = {
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

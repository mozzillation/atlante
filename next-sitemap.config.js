/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.VERCEL_URL || 'http://localhost:3000',
    generateRobotsTxt: true,
    exclude: ['/me', '/sitemaps/categories.xml', '/sitemaps/websites.xml', '/sitemaps/index.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.VERCEL_URL}/sitemaps/index.xml`,
            `${process.env.VERCEL_URL}/sitemaps/categories.xml`,
            `${process.env.VERCEL_URL}/sitemaps/websites.xml`,
        ],
    },
}

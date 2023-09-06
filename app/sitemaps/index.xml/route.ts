import { getServerSideSitemapIndex } from 'next-sitemap'

export async function GET(request: Request) {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')

    return getServerSideSitemapIndex([
        `${process.env.VERCEL_URL}/sitemaps/categories.xml`,
        `${process.env.VERCEL_URL}/sitemaps/websites.xml`,
    ])
}

import { getAllWebsitesQuery } from '@/client/queries'
import { getServerSideSitemap } from 'next-sitemap'

export const GET = async (request: Request) => {
    const websites = await getAllWebsitesQuery()

    return getServerSideSitemap(
        websites.map((website) => {
            return {
                loc: process.env.VERCEL_URL + '/w/' + website.id,
                lastmod: new Date(website.date_created!).toISOString(),
            }
        }),
    )
}

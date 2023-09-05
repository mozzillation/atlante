import { getAllCategoriesQuery, getAllWebsitesQuery } from '@/client/queries'
import { getServerSideSitemap } from 'next-sitemap'

export const GET = async (request: Request) => {
    const categories = await getAllCategoriesQuery()

    const types = categories.types.map((category) => {
        return {
            loc: process.env.VERCEL_URL + '/directory/' + category.collection + '/' + category.slug,
            lastmod: new Date().toISOString(),
        }
    })

    const styles = categories.types.map((category) => {
        return {
            loc: process.env.VERCEL_URL + '/directory/' + category.collection + '/' + category.slug,
            lastmod: new Date().toISOString(),
        }
    })

    return getServerSideSitemap([...styles, ...types])
}

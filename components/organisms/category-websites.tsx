import { getAllWebsitesQuery, getWebsitesByCategoryQuery } from '@/client/queries'
import InfiniteAllWebsites from './infinite-all-websites'
import { WebsiteWithSaves } from '@/types'
import InfiniteCategoryWebsites from './infinite-category-websites'

type Props = {
    collection: 'style' | 'type'
    slug: string
}
const CategoryWebsites: React.FC<Props> = async ({ collection, slug }) => {
    const websites = await getWebsitesByCategoryQuery({ collection, slug, page: 1 })

    return (
        <InfiniteCategoryWebsites initialWebsites={websites} collection={collection} slug={slug} />
    )
}

export default CategoryWebsites

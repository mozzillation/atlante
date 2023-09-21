import {
    generateCategoriesSlugs,
    getCategoryQuery,
    getWebsitesByCategoryQuery,
} from '@/client/queries'
import { CategoryDetails } from '@/components/organisms'
import InfiniteCategoryWebsites from '@/components/organisms/infinite-category-websites'
import WebsitesSkeleton from '@/components/skeletons/websites'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
    params: {
        category: string[]
    }
}

export const generateMetadata = async ({ params }: Props) => {
    const collection = params.category[0] as 'style' | 'type'
    const slug = params.category[1] as string

    const category = await getCategoryQuery({
        collection,
        slug,
    })

    if (!category) notFound()

    return {
        title: `All ${category.name} Websites`,
        description: `A collection of the best ${category.name.toLowerCase()} websites.`,
    }
}

export const generateStaticParams = async () => {
    const categories = await generateCategoriesSlugs()

    return categories.map((category) => ({
        category: [category.collection, category.slug],
    }))
}

const CategoryPage: React.FC<Props> = async ({ params }) => {
    const collection = params.category[0] as 'style' | 'type'
    const slug = params.category[1] as string

    const websites = await getWebsitesByCategoryQuery({ collection, slug, page: 1 })

    return (
        <>
            <Suspense fallback={<>loading..</>}>
                <CategoryDetails collection={collection} slug={slug} />
            </Suspense>
            <Suspense fallback={<WebsitesSkeleton />}>
                <InfiniteCategoryWebsites
                    collection={collection}
                    slug={slug}
                    key={slug}
                    initialWebsites={websites}
                />
            </Suspense>
        </>
    )
}

export default CategoryPage

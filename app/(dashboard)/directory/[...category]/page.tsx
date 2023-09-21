import { getCategoryQuery } from '@/client/queries'
import { CategoryDetails } from '@/components/organisms'
import CategoryWebsites from '@/components/organisms/category-websites'
import CategoryDetailsSkeleton from '@/components/skeletons/category-details'
import WebsitesSkeleton from '@/components/skeletons/websites'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamicParams = true
export const dynamic = 'force-dynamic'

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

const CategoryPage: React.FC<Props> = async ({ params }) => {
    const collection = params.category[0] as 'style' | 'type'
    const slug = params.category[1] as string

    if (!collection || !slug) notFound()

    return (
        <>
            <Suspense fallback={<CategoryDetailsSkeleton />}>
                <CategoryDetails collection={collection} slug={slug} key='header' />
            </Suspense>
            <Suspense fallback={<WebsitesSkeleton />}>
                <CategoryWebsites collection={collection} slug={slug} key='websites' />
            </Suspense>
        </>
    )
}

export default CategoryPage

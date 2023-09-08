import { generateCategoriesSlugs, getAllCategoriesQuery, getCategoryQuery } from '@/client/queries'
import { AllWebsites, CategoryDetails } from '@/components/organisms'
import CategoryWebsites from '@/components/organisms/category-websites'
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

const CategoryPage: React.FC<Props> = async ({ params }) => {
    const collection = params.category[0] as 'style' | 'type'
    const slug = params.category[1] as string

    return (
        <>
            <Suspense fallback={<>loading..</>}>
                <CategoryDetails collection={collection} slug={slug} />
            </Suspense>
            <Suspense fallback={<AllWebsites />}>
                <CategoryWebsites collection={collection} slug={slug} key={slug} />
            </Suspense>
        </>
    )
}

export default CategoryPage

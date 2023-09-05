import { generateCategoriesSlugs, getAllCategoriesQuery, getCategoryQuery } from '@/client/queries'
import { CategoryDetails } from '@/components/organisms'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

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
        description: category.description,
    }
}

const CategoryPage: React.FC<Props> = async ({ params }) => {
    const collection = params.category[0] as 'style' | 'type'
    const slug = params.category[1] as string

    return <CategoryDetails collection={collection} slug={slug} />
}

export default CategoryPage

import { generateCategoriesSlugs } from '@/client/queries'
import { CategoryList } from '@/components/organisms'
import GenericSkeleton from '@/components/skeletons/generic'
import { Suspense } from 'react'

export const metadata = {
    title: 'Directory',
}

export const generateStaticParams = async () => {
    const categories = await generateCategoriesSlugs()

    return categories.map((category) => ({
        category: [category.collection, category.slug],
    }))
}

const DirectoryPage = async () => {
    return (
        <Suspense fallback={<GenericSkeleton />}>
            <CategoryList />
        </Suspense>
    )
}

export default DirectoryPage

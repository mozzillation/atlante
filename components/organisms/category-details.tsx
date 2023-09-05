import { getCategoryQuery, getWebsitesByCategoryQuery } from '@/client/queries'
import { Grid, MiniWrapper, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import CategoryWebsites from './category-websites'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

type Props = {
    collection: 'style' | 'type'
    slug: string
}

const CategoryDetails: React.FC<Props> = async ({ collection, slug }) => {
    const category = await getCategoryQuery({ collection, slug })

    if (!category) notFound()

    return (
        <section id='category' data-id={category.id} className='py-4'>
            <div className='flex justify-center flex-col gap-10 items-center content-center'>
                <MiniWrapper>
                    <header className='tracking-wider'>
                        <div className='text-xs text-gray-400 leading-relaxed capitalize'>
                            {category.collection}
                        </div>
                        <h1 className='text-2xl  text-gray-950 leading-relaxed font-semibold'>
                            {category.name}
                        </h1>

                        <div className='text-lg text-gray-500 leading-relaxed'>
                            A collection of {category._count.website_category}{' '}
                            {category.name.toLowerCase()}{' '}
                            {category._count.website_category !== 1 ? 'websites' : 'website'}.
                        </div>
                    </header>
                </MiniWrapper>
            </div>
            <Suspense fallback={<>loading suspense</>}>
                <CategoryWebsites collection={collection} slug={slug} />
            </Suspense>
        </section>
    )
}

export default CategoryDetails

import { getCategoryQuery } from '@/client/queries'
import { MiniWrapper } from '../layout'
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
                    <header className='tracking-wider space-y-1'>
                        <div className='text-xs text-tertiary capitalize'>
                            {category.collection}
                        </div>
                        <h1 className='text-2xl font-medium'>{category.name}</h1>

                        <div className='text-lg text-secondary'>
                            A collection of {category._count.website_category}{' '}
                            {category.name.toLowerCase()}{' '}
                            {category._count.website_category !== 1 ? 'websites' : 'website'}.
                        </div>
                    </header>
                </MiniWrapper>
            </div>
        </section>
    )
}

export default CategoryDetails

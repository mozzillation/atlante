import { MiniWrapper, Wrapper } from '../layout'
import Link from 'next/link'
import { getAllCategoriesQuery } from '@/client/queries'

const CategoryList: React.FC = async () => {
    const categories = await getAllCategoriesQuery()

    return (
        <section className='py-4'>
            <Wrapper>
                <div className='space-y-8'>
                    <CategoryGroup name='Type'>
                        {categories?.types.map((category, index) => (
                            <CategoryItem
                                type={category.collection}
                                name={category.name}
                                slug={category.slug}
                                key={index}
                                _count={category._count.website_category}
                            />
                        ))}
                    </CategoryGroup>
                    <CategoryGroup name='Style'>
                        {categories?.styles.map((category, index) => (
                            <CategoryItem
                                type={category.collection}
                                name={category.name}
                                slug={category.slug}
                                key={index}
                                _count={category._count.website_category}
                            />
                        ))}
                    </CategoryGroup>
                </div>
            </Wrapper>
        </section>
    )
}

type CategoryGroupProps = {
    name: string
    children?: React.ReactNode
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({ children, name }) => {
    return (
        <section>
            <header className='tracking-wider '>
                <MiniWrapper>
                    <h2 className='text-2xl  text-gray-950 leading-relaxed font-semibold border-b-2 border-gray-100 pb-4 mb-2'>
                        {name}
                    </h2>
                </MiniWrapper>
            </header>
            <div>{children}</div>
        </section>
    )
}

type CategoryItemProps = {
    name: string
    slug: string
    type: string
    _count: number
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, slug, type, _count }) => {
    return (
        <Link href={`/directory/${type}/${slug}`}>
            <li className='list-none py-2 hover:bg-gray-100 rounded-lg transition-colors'>
                <MiniWrapper>
                    <div className='flex flex-row justify-between'>
                        <div className='text-sm tracking-wider'>{name}</div>
                        <div className='text-sm tracking-wider text-gray-400'>{_count}</div>
                    </div>
                </MiniWrapper>
            </li>
        </Link>
    )
}

export default CategoryList

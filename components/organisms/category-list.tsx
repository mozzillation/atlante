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
                        {categories?.types
                            .filter((category) => category._count.website_category > 0)
                            .map((category, index) => (
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
                        {categories?.styles
                            .filter((category) => category._count.website_category > 0)
                            .map((category, index) => (
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
                    <h2 className='text-2xl leading-relaxed font-medium border-b pb-4 mb-2'>
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
            <li className='list-none py-2 hover:bg-muted rounded-lg transition-colors'>
                <MiniWrapper>
                    <div className='flex flex-row justify-between'>
                        <div className='text-sm tracking-wider'>{name}</div>
                        <div className='text-sm tracking-wider text-tertiary'>{_count}</div>
                    </div>
                </MiniWrapper>
            </li>
        </Link>
    )
}

export default CategoryList

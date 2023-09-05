import { MiniWrapper, Wrapper } from '../layout'
import Link from 'next/link'
import { getAllCategoriesQuery } from '@/client/queries'

const CategoryList: React.FC = async () => {
    const categories = await getAllCategoriesQuery()

    return (
        <Wrapper>
            <CategoryGroup name='Type'>
                {categories?.types.map((category, index) => (
                    <CategoryItem
                        type={category.collection}
                        name={category.name}
                        slug={category.slug}
                        key={index}
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
                        // _count={style.website_style.length}
                    />
                ))}
            </CategoryGroup>
        </Wrapper>
    )
}

type CategoryGroupProps = {
    name: string
    children?: React.ReactNode
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({ children, name }) => {
    return (
        <section>
            <header>
                <h2>{name}</h2>
            </header>
            <div>{children}</div>
        </section>
    )
}

type CategoryItemProps = {
    name: string
    slug: string
    type: string
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, slug, type }) => {
    return (
        <Link href={`/directory/${type}/${slug}`}>
            <li className='list-none py-2 hover:bg-gray-100 rounded-lg transition-colors'>
                <MiniWrapper>
                    <div className='flex flex-row justify-between'>
                        <div className='text-sm tracking-wider'>{name}</div>
                    </div>
                </MiniWrapper>
            </li>
        </Link>
    )
}

export default CategoryList

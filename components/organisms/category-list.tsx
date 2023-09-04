'use client'

import { Categories } from '@/types'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import { MiniWrapper, Wrapper } from '../layout'
import Link from 'next/link'

const CategoryList: React.FC = () => {
    const { data: categories, isLoading, error } = useSWR<Categories>('/api/category/all', fetcher)

    if (error) return <>error</>
    if (isLoading) return <>loading...</>

    return (
        <Wrapper>
            <CategoryGroup name='Type'>
                {categories?.types.map((type, index) => (
                    <CategoryItem type='type' name={type.name} slug={type.slug} key={index} />
                ))}
            </CategoryGroup>
            <CategoryGroup name='Style'>
                {categories?.styles.map((style, index) => (
                    <CategoryItem type='style' name={style.name} slug={style.slug} key={index} />
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
        <Link href={`/${type}/slug`}>
            <li className='list-none py-2 hover:bg-gray-100 rounded-lg transition-colors'>
                <MiniWrapper>
                    <div className='text-sm tracking-wider'>{name}</div>
                </MiniWrapper>
            </li>
        </Link>
    )
}

export default CategoryList

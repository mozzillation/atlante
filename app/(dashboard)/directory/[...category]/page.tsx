import { notFound } from 'next/navigation'

type Props = {
    params: {
        category: string[]
    }
}

enum Group {
    'style',
    'type',
}

const CategoryPage: React.FC<Props> = ({ params }) => {
    const group = params.category[0] as 'style' | 'type'
    const slug = params.category[1] as string

    if (!group || !slug) notFound()

    return (
        <div>
            {group} {slug}
        </div>
    )
}

export default CategoryPage

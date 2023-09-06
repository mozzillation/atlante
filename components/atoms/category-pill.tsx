import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {
    name: string
    slug: string
    collection: string
}

const CategoryPill: React.FC<Props> = ({ name, slug, collection }) => {
    return (
        <Link href={`/directory/${collection}/${slug}`}>
            <Button size='sm'>{name}</Button>
        </Link>
    )
}

export default CategoryPill

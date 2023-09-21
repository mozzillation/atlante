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
            <Button size='sm' variant='ghost' className='bg-gray-50'>
                {name}
            </Button>
        </Link>
    )
}

export default CategoryPill

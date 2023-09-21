import { getAllWebsitesQuery } from '@/client/queries'
import InfiniteAllWebsites from './infinite-all-websites'

type Props = {
    page?: number
}

const AllWebsites: React.FC<Props> = async () => {
    const websites = await getAllWebsitesQuery(1)

    return <InfiniteAllWebsites initialWebsites={websites} />
}

export default AllWebsites

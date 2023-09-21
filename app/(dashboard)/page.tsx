import { getAllWebsitesQuery } from '@/client/queries'
import InfiniteAllWebsites from '@/components/organisms/infinite-all-websites'

export const revalidate = 0
export const dynamic = 'force-dynamic'

const Home = async () => {
    const websites = await getAllWebsitesQuery(1)

    return <InfiniteAllWebsites initialWebsites={websites} />
}

export default Home

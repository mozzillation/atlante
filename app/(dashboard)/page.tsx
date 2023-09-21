import { getAllWebsitesQuery } from '@/client/queries'
import { AllWebsites } from '@/components/organisms'
import InfiniteAllWebsites from '@/components/organisms/infinite-all-websites'
import WebsitesSkeleton from '@/components/skeletons/websites'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamic = 'auto'

const Home = async () => {
    const websites = await getAllWebsitesQuery(1)
    return (
        <Suspense fallback={<WebsitesSkeleton />}>
            <InfiniteAllWebsites initialWebsites={websites} />
        </Suspense>
    )
}

export default Home

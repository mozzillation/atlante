import { AllWebsites } from '@/components/organisms'
import WebsitesSkeleton from '@/components/skeletons/websites'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamic = 'force-dynamic'

const Home = async () => {
    return (
        <Suspense fallback={<WebsitesSkeleton />}>
            <AllWebsites />
        </Suspense>
    )
}

export default Home

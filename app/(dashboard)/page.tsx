import { AllWebsites } from '@/components/organisms'
import WebsitesSkeleton from '@/components/skeletons/websites'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamic = 'auto'

type Props = {
    searchParams: {
        page?: number
    }
}

const Home = async ({ searchParams }: Props) => {
    const { page } = searchParams

    return (
        <Suspense fallback={<WebsitesSkeleton />}>
            <AllWebsites page={page} />
        </Suspense>
    )
}

export default Home

import { AllWebsites } from '@/components/organisms'
import WebsitesSkeleton from '@/components/skeletons/websites'
import Link from 'next/link'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamic = 'force-dynamic'

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
            <Link href={`?page=2`}>Next</Link>
        </Suspense>
    )
}

export default Home

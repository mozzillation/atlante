import { getWebsiteQuery } from '@/client/queries'
import { SingleWebsite } from '@/components/organisms'
import GenericSkeleton from '@/components/skeletons/generic'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamic = 'force-static'

type Props = {
    params: {
        id: string
    }
}

export const generateMetadata = async ({ params }: Props) => {
    const { id } = params

    if (!id) notFound()

    const website = await getWebsiteQuery(id)

    return {
        title: website.name,
    }
}

const WebsitePage: React.FC<Props> = async ({ params }) => {
    const { id } = params

    if (!id) notFound()

    return (
        <Suspense fallback={<GenericSkeleton />}>
            <SingleWebsite id={id} />
        </Suspense>
    )
}

export default WebsitePage

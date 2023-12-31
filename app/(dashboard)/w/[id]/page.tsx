import { getWebsiteQuery } from '@/client/queries'
import { SingleWebsite } from '@/components/organisms'
import { notFound } from 'next/navigation'

export const revalidate = 0
export const dynamic = 'force-dynamic'

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

    return <SingleWebsite id={id} />
}

export default WebsitePage

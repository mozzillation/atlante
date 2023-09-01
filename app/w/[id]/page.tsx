import { SingleWebsite } from '@/components/organisms'
import { notFound } from 'next/navigation'

type Props = {
    params: {
        id: string
    }
}

const WebsitePage: React.FC<Props> = ({ params }) => {
    const { id } = params

    if (!id) notFound()

    return (
        <>
            <SingleWebsite id={id} />
        </>
    )
}

export default WebsitePage

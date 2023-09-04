import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { SaveWithWebsite } from '@/types'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getSavedWebsitesQuery } from '@/client/queries'
import { notFound } from 'next/navigation'

const getSavedWebsite = async () => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) notFound

    return await getSavedWebsitesQuery(session?.user.id)
}

const SavedWebsites: React.FC = async () => {
    const saves = await getSavedWebsite()

    return (
        <Wrapper>
            <Grid>
                {saves?.map((save, index) => (
                    <WebsiteCard {...save.website} key={save.website_id} user_id={save.user_id} />
                ))}
            </Grid>
        </Wrapper>
    )
}

export default SavedWebsites

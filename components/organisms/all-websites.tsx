import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllWebsitesQuery } from '@/client/queries'

const getAllWebsite = async (user_id: string | undefined) => {
    return await getAllWebsitesQuery(user_id)
}

const AllWebsites: React.FC = async () => {
    const session = await getServerSession(authOptions)
    const websites = await getAllWebsite(session?.user.id)

    return (
        <Wrapper>
            <Grid>
                {websites?.map((website, index) => (
                    <WebsiteCard {...website} key={website.id} user_id={session?.user.id} />
                ))}
            </Grid>
        </Wrapper>
    )
}

export default AllWebsites

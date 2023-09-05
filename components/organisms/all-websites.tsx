import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllWebsitesQuery } from '@/client/queries'

const AllWebsites: React.FC = async () => {
    const websites = await getAllWebsitesQuery()

    return (
        <Wrapper>
            <Grid>
                {websites?.map((website, index) => <WebsiteCard {...website} key={website.id} />)}
            </Grid>
        </Wrapper>
    )
}

export default AllWebsites

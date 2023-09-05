import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { getAllWebsitesQuery } from '@/client/queries'

const AllWebsites: React.FC = async () => {
    const websites = await getAllWebsitesQuery()

    return (
        <Wrapper>
            <Grid>
                {websites?.map((website, index) => <WebsiteCard {...website} key={index} />)}
            </Grid>
        </Wrapper>
    )
}

export default AllWebsites

import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { getAllWebsitesQuery } from '@/client/queries'

type Props = {
    page?: number
}

const AllWebsites: React.FC<Props> = async ({ page = 1 }) => {
    const websites = await getAllWebsitesQuery(page)

    return (
        <Wrapper>
            <Grid>
                {websites?.map((website, index) => <WebsiteCard {...website} key={index} />)}
            </Grid>
        </Wrapper>
    )
}

export default AllWebsites

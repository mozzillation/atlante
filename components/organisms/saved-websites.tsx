import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { getSavedWebsitesQuery } from '@/client/queries'

const SavedWebsites: React.FC = async () => {
    const saves = await getSavedWebsitesQuery()

    return (
        <Wrapper>
            <h2 className='text-xs tracking-widest text-gray-400 pt-4'>Saved Websites</h2>
            <Grid>
                {saves?.map((save, index) => <WebsiteCard {...save.website} key={index} />)}
            </Grid>
        </Wrapper>
    )
}

export default SavedWebsites

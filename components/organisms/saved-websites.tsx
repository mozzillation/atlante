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

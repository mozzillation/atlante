'use client'

import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { WebsiteWithSaves } from '@/types'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'

const SavedWebsites: React.FC = () => {
    const { data } = useSession()

    const {
        data: websites,
        isLoading,
        error,
    } = useSWR<WebsiteWithSaves[]>('/api/website/saved', fetcher)

    if (error) return <div>error</div>
    if (isLoading) return <div>isLoading</div>
    return (
        <Wrapper>
            <Grid>
                {websites?.map((website, index) => (
                    <WebsiteCard {...website} key={index} user_id={data?.user.id} />
                ))}
            </Grid>
        </Wrapper>
    )
}

export default SavedWebsites

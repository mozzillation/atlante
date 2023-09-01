'use client'

import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { WebsiteWithSaves } from '@/types'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { useSession } from 'next-auth/react'

const AllWebsites: React.FC = () => {
    const { data } = useSession()

    const {
        data: websites,
        isLoading,
        error,
    } = useSWR<WebsiteWithSaves[]>('/api/website/all', fetcher)

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

export default AllWebsites

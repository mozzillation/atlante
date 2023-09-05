import { getWebsitesByCategoryQuery } from '@/client/queries'
import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { Suspense } from 'react'

type Props = {
    collection: 'style' | 'type'
    slug: string
}

const CategoryWebsites: React.FC<Props> = async ({ collection, slug }) => {
    const websites = await getWebsitesByCategoryQuery({ collection, slug })

    return (
        <Wrapper>
            <Grid>
                {websites?.map((website, index) => <WebsiteCard {...website} key={index} />)}
            </Grid>
        </Wrapper>
    )
}

export default CategoryWebsites

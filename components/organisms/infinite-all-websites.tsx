'use client'

import { website } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { WebsiteWithSaves } from '@/types'
import { getAllWebsitesQuery } from '@/client/queries'

type Props = {
    initialWebsites: WebsiteWithSaves[] | undefined
}

const InfiniteAllWebsites: React.FC<Props> = ({ initialWebsites }) => {
    const [websites, setWebsites] = useState(initialWebsites)
    const [page, setPage] = useState(1)

    const [ref, inView] = useInView()

    const loadMore = async () => {
        const next = page + 1
        const websites = await getAllWebsitesQuery(next)

        if (websites.length) {
            setPage((prev) => prev + 1)
            setWebsites((prev) => [...(prev?.length ? prev : []), ...websites])
        }
    }

    useEffect(() => {
        if (inView) {
            loadMore()
        }
    }, [inView])

    return (
        <>
            <Wrapper>
                <Grid>
                    {websites?.map((website, index) => <WebsiteCard {...website} key={index} />)}
                    <div ref={ref}> end of page </div>
                </Grid>
            </Wrapper>
        </>
    )
}

export default InfiniteAllWebsites

'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Grid, Wrapper } from '../layout'
import { WebsiteCard } from '../cards'
import { WebsiteWithSaves } from '@/types'
import { getWebsitesByCategoryQuery } from '@/client/queries'
import InfiniteLoader from '../atoms/infinite-loader'

type Props = {
    initialWebsites: WebsiteWithSaves[] | undefined
    collection: 'style' | 'type'
    slug: string
}

const InfiniteCategoryWebsites: React.FC<Props> = ({ initialWebsites, collection, slug }) => {
    const [websites, setWebsites] = useState(initialWebsites)
    const [page, setPage] = useState(1)
    const [isEnd, setEnd] = useState<boolean>(false)

    const [ref, inView] = useInView()

    useEffect(() => {
        const loadMore = async () => {
            const next = page + 1
            const websites = await getWebsitesByCategoryQuery({
                collection,
                slug,
                page: next,
            })

            if (websites.length) {
                setPage((prev) => prev + 1)
                setWebsites((prev) => [...(prev?.length ? prev : []), ...websites])
            } else {
                setEnd(true)
            }
        }

        if (inView && !isEnd) {
            loadMore()
        }
    }, [inView, isEnd, page, slug, collection])

    return (
        <>
            <Wrapper>
                <Grid>
                    {websites?.map((website, index) => <WebsiteCard {...website} key={index} />)}
                    <InfiniteLoader ref={ref} isEnd={isEnd} />
                </Grid>
            </Wrapper>
        </>
    )
}

export default InfiniteCategoryWebsites

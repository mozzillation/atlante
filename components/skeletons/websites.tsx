'use client'

import { Wrapper, Grid } from '../layout'
import { Skeleton } from '../ui/skeleton'
import WebsiteCardSkeleton from './website-card'

type Props = {
    isSavedSection?: boolean
}

const WebsitesSkeleton: React.FC<Props> = ({ isSavedSection = false }) => {
    return (
        <Wrapper>
            {isSavedSection && (
                <div className='pt-4'>
                    <Skeleton className='w-20 h-4' />
                </div>
            )}
            <Grid>
                {[...Array(20)].map((_, index) => (
                    <WebsiteCardSkeleton key={index} />
                ))}
            </Grid>
        </Wrapper>
    )
}

export default WebsitesSkeleton

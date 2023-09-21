'use client'

import { MiniWrapper, Wrapper } from '../layout'
import { Skeleton } from '../ui/skeleton'

const SingleWebsiteSkeleton = () => {
    return (
        <div className='py-4'>
            <div className='flex justify-center flex-col space-y-4 items-center content-center'>
                <MiniWrapper>
                    <div className='space-y-1'>
                        <Skeleton className='w-10 h-4' />
                        <Skeleton className='w-32 h-8' />
                        <Skeleton className='w-40 h-7' />
                        <div className='flex justify-between items-center content-center'>
                            <Skeleton className='w-20 h-5' />
                            <Skeleton className='w-16 h-8' />
                        </div>
                    </div>
                </MiniWrapper>
                <Wrapper>
                    <Skeleton className='max-w-6xl aspect-video rounded-lg m-auto h-auto w-auto' />
                </Wrapper>
            </div>
        </div>
    )
}
export default SingleWebsiteSkeleton

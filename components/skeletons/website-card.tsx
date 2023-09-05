'use client'

import { Skeleton } from '../ui/skeleton'

const WebsiteCardSkeleton = () => {
    return (
        <article className='bg-white rounded-md overflow-hidden tracking-wide'>
            <header className='p-3 flex flex-row justify-between gap-1'>
                <Skeleton className='h-[16px] w-20' />
            </header>
            <figure className='aspect-video'>
                <Skeleton className='w-full h-full rounded-none' />
            </figure>
            <footer className='p-3 flex flex-row justify-between content-center items-center'>
                <Skeleton className='w-16 h-8' />
            </footer>
        </article>
    )
}

export default WebsiteCardSkeleton

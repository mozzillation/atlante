'use client'

import { forwardRef } from 'react'
import { cx } from 'class-variance-authority'

type Ref = HTMLDivElement
type LoaderProps = {
    isEnd: boolean
}

const InfiniteLoader = forwardRef<Ref, LoaderProps>(({ isEnd }, ref) => (
    <div
        className={cx(
            'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center text-gray-300 tracking-wider text-xs',
            !isEnd && 'animate-pulse',
        )}
        ref={ref}
    >
        {isEnd ? 'No more websites' : 'Loading'}
    </div>
))

InfiniteLoader.displayName = 'Loader'

export default InfiniteLoader

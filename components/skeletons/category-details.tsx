import { MiniWrapper } from '../layout'
import { Skeleton } from '../ui/skeleton'

const CategoryDetailsSkeleton = () => {
    return (
        <div className='py-4'>
            <div>
                <MiniWrapper>
                    <div className='space-y-1'>
                        <Skeleton className='w-10 h-4' />
                        <Skeleton className='w-32 h-8' />
                        <Skeleton className='w-40 h-7' />
                    </div>
                </MiniWrapper>
            </div>
        </div>
    )
}

export default CategoryDetailsSkeleton

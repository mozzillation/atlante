import { MiniWrapper } from '../layout'
import { Skeleton } from '../ui/skeleton'

const ProfileDetailsSkeleton = () => {
    return (
        <div className='py-4 space-y-4'>
            <MiniWrapper>
                <div className='flex gap-4 flex-row items-center content-center'>
                    <div>
                        <Skeleton className='w-20 h-20 rounded-full' />
                    </div>
                    <div>
                        <Skeleton className='w-32 h-7' />
                    </div>
                </div>
            </MiniWrapper>
        </div>
    )
}

export default ProfileDetailsSkeleton

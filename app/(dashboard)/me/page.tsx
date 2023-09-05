import { ProfileDetails, SavedWebsites } from '@/components/organisms'
import PageDetailsSkeleton from '@/components/skeletons/profile-details'
import WebsitesSkeleton from '@/components/skeletons/websites'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamic = 'force-dynamic'

const MePage = () => {
    return (
        <>
            <Suspense fallback={<PageDetailsSkeleton />}>
                <ProfileDetails />
            </Suspense>
            <Suspense fallback={<WebsitesSkeleton isSavedSection />}>
                <SavedWebsites />
            </Suspense>
        </>
    )
}

export default MePage

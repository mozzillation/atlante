import { ProfileDetails, SavedWebsites } from '@/components/organisms'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamic = 'force-dynamic'

const MePage = async () => {
    return (
        <>
            <ProfileDetails />
            <SavedWebsites />
        </>
    )
}

export default MePage

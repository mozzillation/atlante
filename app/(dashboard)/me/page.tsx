import { ProfileDetails, SavedWebsites } from '@/components/organisms'

export const dynamic = 'force-dynamic'

const MePage = () => {
    return (
        <>
            <ProfileDetails />

            <SavedWebsites />
        </>
    )
}

export default MePage

import { ProfileDetails, SavedWebsites } from '@/components/organisms'

export const revalidate = 0

const MePage = () => {
    return (
        <>
            <ProfileDetails />

            <SavedWebsites />
        </>
    )
}

export default MePage

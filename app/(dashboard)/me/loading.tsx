import ProfileDetailsSkeleton from '@/components/skeletons/profile-details'
import WebsitesSkeleton from '@/components/skeletons/websites'

const Loading = () => {
    return (
        <>
            <ProfileDetailsSkeleton />
            <WebsitesSkeleton isSavedSection />
        </>
    )
}

export default Loading

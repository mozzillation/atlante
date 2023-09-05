import PageDetailsSkeleton from '@/components/skeletons/profile-details'
import WebsiteCardSkeleton from '@/components/skeletons/website-card'
import WebsitesSkeleton from '@/components/skeletons/websites'

const Skeletons = async () => {
    return (
        <div>
            <PageDetailsSkeleton />
            <WebsitesSkeleton isSavedSection />
        </div>
    )
}

export default Skeletons

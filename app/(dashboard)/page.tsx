import { AllWebsites } from '@/components/organisms'

export const revalidate = 0
export const dynamic = 'force-dynamic'

const Home = async () => {
    return (
        <>
            <AllWebsites />
        </>
    )
}

export default Home

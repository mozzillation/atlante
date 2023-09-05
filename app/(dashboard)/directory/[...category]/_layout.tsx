import { generateCategoriesSlugs } from '@/client/queries'
import '../../../globals.css'

import { SessionContext } from '@/components/contexts'
import { PageLayout } from '@/components/organisms'

export const revalidate = 60

export const dynamicParams = true
export const dynamic = 'auto'

export const generateStaticParams = async () => {
    const categories = await generateCategoriesSlugs()

    return categories.map((category) => ({
        category: [category.collection, category.slug],
    }))
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
}

export default RootLayout

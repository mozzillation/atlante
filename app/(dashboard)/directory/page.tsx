import { generateCategoriesSlugs } from '@/client/queries'
import { CategoryList } from '@/components/organisms'

export const metadata = {
    title: 'Directory',
}

const DirectoryPage = async () => {
    return (
        <>
            <CategoryList />
        </>
    )
}

export default DirectoryPage

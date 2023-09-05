import { generateCategoriesSlugs } from '@/client/queries'
import { CategoryList } from '@/components/organisms'

const DirectoryPage = async () => {
    return (
        <>
            <CategoryList />
        </>
    )
}

export default DirectoryPage

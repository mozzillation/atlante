import '../globals.css'
import { SessionContext } from '@/components/contexts'
import { PageLayout } from '@/components/organisms'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionContext>
            <PageLayout>{children}</PageLayout>
        </SessionContext>
    )
}

export default RootLayout

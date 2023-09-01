'use client'
import { Header, Sidebar } from '../layout'

type Props = {
    children: React.ReactNode
}

const PageLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className='flex flex-row float-left w-full'>
            <Sidebar />
            <div className='w-full sticky top-0 min-h-[300vh]'>
                <Header />
                <main>{children}</main>
            </div>
        </div>
    )
}

export default PageLayout

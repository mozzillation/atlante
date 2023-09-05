'use client'
import { Header, Sidebar } from '../layout'

type Props = {
    children: React.ReactNode
}

const PageLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className='flex flex-row float-left w-full min-h-screen'>
            <Sidebar />
            <div className='w-full sticky top-0 bg-gray-50 flex flex-col '>
                <Header />
                <main className='relative h-full shrink'>{children}</main>
            </div>
        </div>
    )
}

export default PageLayout

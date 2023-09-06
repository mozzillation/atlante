'use client'

import { useSession } from 'next-auth/react'
import ProfileButton from './profile-button'
import HomeButton from '../../atoms/home-button'

const Sidebar: React.FC<{}> = () => {
    const session = useSession()

    return (
        <aside
            id='sidebar'
            className='sticky top-0 left-0 h-screen shrink-0 px-2 py-4 shadow-xl z-10 hidden md:flex justify-between items-start flex-col bg-background'
        >
            <HomeButton />
            {session.data?.user && (
                <ProfileButton
                    avatar={session.data.user.avatar}
                    first_name={session.data.user.first_name}
                />
            )}
        </aside>
    )
}

export default Sidebar

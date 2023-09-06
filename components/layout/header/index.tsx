'use client'

import { signOut, useSession } from 'next-auth/react'
import Wrapper from '../wrapper'
import SignInButton from './sign-in-button'
import SubmitButton from './submit-button'
import MobileMenu from './mobile-menu'
import NavItem from './nav-item'

type Props = {}

const Header: React.FC<Props> = () => {
    const session = useSession()

    return (
        <header className='py-4 bg-background sticky top-0 left-0 right-0 z-40'>
            <Wrapper>
                <div className='hidden md:flex flex-row justify-end'>
                    <nav className='flex justify-between content-center items-center w-max gap-2'>
                        <NavItem href='/directory'>Directory</NavItem>
                        {session.status === 'unauthenticated' && <SignInButton />}
                        <SubmitButton href='/submit' />
                    </nav>
                </div>

                <div className='flex md:hidden flex-row justify-between'>
                    <MobileMenu />
                </div>
            </Wrapper>
        </header>
    )
}

export default Header

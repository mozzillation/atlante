'use client'

import { signOut, useSession } from 'next-auth/react'
import Wrapper from '../wrapper'
import Button from './button'
import SignInButton from './sign-in-button'
import SubmitButton from './submit-button'
import Link from 'next/link'
import MobileMenu from './mobile-menu'

type Props = {}

const Header: React.FC<Props> = () => {
    const session = useSession()

    return (
        <header className='py-4 bg-white sticky top-0 left-0 right-0 z-40 shadow-sm'>
            <Wrapper>
                <div className='hidden md:flex flex-row justify-end'>
                    <nav className='flex justify-between content-center items-center w-max gap-2'>
                        <Button href='/directory'>Directory</Button>
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

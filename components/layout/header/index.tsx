'use client'

import { useSession } from 'next-auth/react'
import Wrapper from '../wrapper'
import Button from './button'
import SignInButton from './sign-in-button'
import SubmitButton from './submit-button'

type Props = {}

const Header: React.FC<Props> = () => {
    const session = useSession()

    return (
        <header className='py-4 bg-white'>
            <Wrapper>
                <div className='flex flex-row justify-end'>
                    <nav className='flex justify-between content-center items-center w-max gap-2'>
                        <Button href='/directory'>Directory</Button>
                        {session.status === 'unauthenticated' && <SignInButton />}
                        <SubmitButton href='/submit' />
                    </nav>
                </div>
            </Wrapper>
        </header>
    )
}

export default Header

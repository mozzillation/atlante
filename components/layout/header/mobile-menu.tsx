'use client'

import { List, Globe } from '@phosphor-icons/react'
import Link from 'next/link'

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Url } from 'next/dist/shared/lib/router/router'
import SubmitButton from './submit-button'
import SignInButton from './sign-in-button'
import { useSession } from 'next-auth/react'
import ProfileButton from './profile-button'

const MobileMenu: React.FC = () => {
    const session = useSession()

    return (
        <div className='flex flex-row justify-between w-full'>
            <Link href='/'>
                <button className='w-10 h-10 rounded-lg transition-colors flex items-center content-center justify-center'>
                    <Globe size={24} />
                </button>
            </Link>

            <Sheet>
                <SheetTrigger>
                    <div className='w-10 h-10 rounded-lg transition-colors flex items-center content-center justify-center'>
                        <List size={24} />
                    </div>
                </SheetTrigger>
                <SheetContent className='border-0 px-2 shadow-xl'>
                    <div className='flex h-full flex-col justify-between'>
                        <div className='space-y-2 flex flex-col'>
                            {session.status === 'authenticated' && (
                                <ProfileButton
                                    first_name={session.data.user.first_name}
                                    last_name={session.data.user.last_name}
                                    avatar={session.data.user.avatar}
                                />
                            )}
                            <MobileMenuItem href={'/'}>Explore</MobileMenuItem>
                            <MobileMenuItem href={'/directory'}>Directory</MobileMenuItem>
                        </div>

                        <div className='flex flex-col w-full space-y-2'>
                            {session.status === 'unauthenticated' && <SignInButton />}
                            <SheetClose asChild>
                                <SubmitButton href={'/submit'} />
                            </SheetClose>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

type MobileMenuItemProps = {
    href: Url
    children: React.ReactNode
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ href, children }) => {
    return (
        <SheetClose asChild>
            <Link href={href}>
                <div className='w-full text-xl tracking-wider'>{children}</div>
            </Link>
        </SheetClose>
    )
}

export default MobileMenu

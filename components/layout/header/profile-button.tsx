'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SheetClose } from '@/components/ui/sheet'
import { imageUrl } from '@/lib/image'
import Link from 'next/link'

type Props = {
    avatar: string | null
    first_name: string | null
    last_name: string | null
}

const ProfileButton: React.FC<Props> = ({ avatar, first_name, last_name }) => {
    return (
        <SheetClose asChild>
            <Link href='/me' passHref>
                <Avatar className='w-12 h-12 rounded-full shadow-md border-2 border-white'>
                    {avatar && <AvatarImage src={imageUrl(avatar, 'avatar')} />}
                    <AvatarFallback>{first_name?.slice(0, 1)}</AvatarFallback>
                </Avatar>
            </Link>
        </SheetClose>
    )
}

export default ProfileButton

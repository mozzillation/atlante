'use client'

import { imageUrl } from '@/lib/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type Props = {
    avatar: string | null
    first_name: string | null
}

const ProfileAvatar: React.FC<Props> = ({ avatar, first_name }) => {
    return (
        <Avatar className='w-20 h-20 flex items-center content-center justify-center rounded-full'>
            <AvatarImage src={imageUrl(avatar, 'avatar')} />

            <AvatarFallback>
                <div className='w-max h-max text-3xl text-muted-foreground'>
                    {first_name?.slice(0, 1)}
                </div>
            </AvatarFallback>
        </Avatar>
    )
}

export default ProfileAvatar

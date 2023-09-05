'use client'

import { imageUrl } from '@/utils/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type Props = {
    avatar: string | null
    first_name: string | null
}

const ProfileAvatar: React.FC<Props> = ({ avatar, first_name }) => {
    return (
        <Avatar className='w-20 h-20 flex items-center content-center justify-center border-2 border-white shadow-md rounded-lg bg-gray-100 text-gray-300'>
            <AvatarImage src={imageUrl(avatar, 'avatar')} />

            <AvatarFallback>
                <div className='w-max h-max text-3xl'>{first_name?.slice(0, 1)}</div>
            </AvatarFallback>
        </Avatar>
    )
}

export default ProfileAvatar

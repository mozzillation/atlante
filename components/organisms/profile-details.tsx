'use client'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { MiniWrapper } from '../layout'
import { Avatar, AvatarImage } from '../ui/avatar'
import { directus_users } from '@prisma/client'
import { imageUrl } from '@/utils/image'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = Partial<directus_users>

const ProfileDetails: React.FC<Props> = () => {
    const { data: user, isLoading, error } = useSWR('/api/profile', fetcher)

    if (error) return <>Error</>
    if (isLoading) return <>is loading</>

    return (
        <div>
            <MiniWrapper>
                <div className='flex gap-4 flex-row items-center content-center'>
                    <div>
                        <Avatar className='w-20 h-20 flex items-center content-center justify-center border-2 border-white shadow-md rounded-lg bg-gray-100 text-gray-300'>
                            <AvatarImage src={imageUrl(user.avatar, 'thumbnail')} />

                            <AvatarFallback>
                                <div className='w-max h-max text-2xl'>
                                    {user.first_name.slice(0, 1)}
                                </div>
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className='shrink w-full'>
                        <h2 className='text-lg tracking-wide'>
                            {user.first_name} {user.last_name}
                        </h2>
                    </div>

                    <div className='shrink-0'>
                        <DropdownMenu>
                            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='text-red-400 focus:text-red-400 focus:bg-red-100'>
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </MiniWrapper>
        </div>
    )
}

export default ProfileDetails

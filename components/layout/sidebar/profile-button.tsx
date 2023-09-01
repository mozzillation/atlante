'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { imageUrl } from '@/utils/image'
import { directus_users } from '@prisma/client'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

type Props = Partial<directus_users> & {}

const variants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
}

const ProfileButton: React.FC<Props> = ({ avatar, first_name }) => {
    return (
        <AnimatePresence>
            <Link href='/me'>
                <motion.div
                    variants={variants}
                    initial='initial'
                    animate='animate'
                    whileHover={{ scale: 1.05, y: -5 }}
                >
                    <Avatar className='w-[40px] h-[40px] rounded-lg shadow-md border-2 border-white'>
                        {avatar && <AvatarImage src={imageUrl(avatar, 'thumbnail')} />}
                        <AvatarFallback>{first_name?.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                </motion.div>
            </Link>
        </AnimatePresence>
    )
}

export default ProfileButton

'use client'

import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { website } from '@prisma/client'
import { imageUrl } from '@/utils/image'

import SaveButton from './save-button'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye } from '@phosphor-icons/react'
import { useState } from 'react'

dayjs.extend(relativeTime)

const hoverVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
}

const buttonVariants = {
    initial: {
        opacity: 0,
        scale: 0.8,
        y: 10,
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
    },
}

type Props = website & {
    isSaved: boolean
}

const WebsiteCard: React.FC<Props> = ({
    id,
    name,
    isSaved,
    thumbnail,
    url,
    date_created,
    ...props
}) => {
    const [isHovered, setHover] = useState<boolean>(false)

    return (
        <article
            id='website'
            className='bg-white rounded-md overflow-hidden tracking-wide border-2 border-gray-50'
        >
            <header className='p-3 flex flex-row justify-between'>
                <Link href={`/w/${id}`}>
                    <div className='text-xs font-semibold hover:text-gray-500 transition-colors'>
                        {name}
                    </div>
                </Link>
                <time className='text-xs text-gray-400'>{dayjs(date_created).fromNow()}</time>
            </header>
            <motion.div
                className='relative'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <a href={url} target='_blank' rel='noreferrer noopener'>
                    <motion.figure className='aspect-video bg-gray-50 relative border-t border-b border-gray-100'>
                        {thumbnail && (
                            <Image
                                src={imageUrl(thumbnail, 'thumbnail')}
                                fill={true}
                                alt={`Screenshot of ${url}`}
                            />
                        )}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    className='absolute top-0 left-0 right-0 bottom-0 flex justify-center content-center items-center bg-gray-950/50'
                                    variants={hoverVariants}
                                    initial='initial'
                                    animate='animate'
                                >
                                    <motion.div
                                        className='p-2 bg-white text-gray-950 rounded-full'
                                        variants={buttonVariants}
                                        initial='initial'
                                        animate='animate'
                                    >
                                        <Eye size={24} />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.figure>
                </a>
            </motion.div>

            <footer className='p-3 flex flex-row justify-between content-center items-center'>
                <SaveButton isSaved={isSaved} website_id={id} key={id} />
            </footer>
        </article>
    )
}

export default WebsiteCard

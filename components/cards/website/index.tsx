'use client'

import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { website } from '@prisma/client'
import { imageUrl } from '@/lib/image'

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
    blurData,
}) => {
    const [isHovered, setHover] = useState<boolean>(false)

    return (
        <article className='bg-card rounded-md overflow-hidden tracking-wide border'>
            <header className='p-3 flex flex-row justify-between gap-1'>
                <Link href={`/w/${id}`}>
                    <div className='text-primary text-xs font-semibold hover:text-accent transition-colors truncate w-full overflow-hidden'>
                        {name}
                    </div>
                </Link>
                <time className='text-xs text-tertiary truncate overflow-hidden '>
                    {dayjs(date_created).fromNow()}
                </time>
            </header>
            <motion.div
                className='relative px-3'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <a href={`${url}/?ref=atlante.gallery`} target='_blank' rel='noreferrer noopener'>
                    <motion.figure className='aspect-video relative border bg-border rounded overflow-hidden shadow-lg'>
                        {thumbnail && (
                            <Image
                                src={imageUrl(thumbnail, 'thumbnail')}
                                fill={true}
                                alt={`Screenshot of ${url}`}
                                placeholder='blur'
                                blurDataURL={blurData ?? undefined}
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            />
                        )}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    className='absolute top-0 left-0 right-0 bottom-0 flex justify-center content-center items-center bg-accent'
                                    variants={hoverVariants}
                                    initial='initial'
                                    animate='animate'
                                >
                                    <motion.div
                                        className='p-2 bg-background rounded-full'
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

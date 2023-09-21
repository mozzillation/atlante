'use client'

import { useState, useTransition } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { toggleSave } from '@/client/queries'
import { Bookmark, BookmarkSimple, HeartStraight } from '@phosphor-icons/react'

type Props = {
    isSaved: boolean
    website_id: string
}

const transition = {
    type: 'spring',
    duration: 0.25,
}

const variants = {
    initial: {
        y: 5,
    },
    animate: {
        y: 0,
    },
    exit: {
        y: -5,
    },
}

const SaveButton: React.FC<Props> = ({ website_id, isSaved }) => {
    const [status, setStatus] = useState<boolean>(isSaved)
    const [isPending, startTransition] = useTransition()

    const handleSave = async () => {
        startTransition(async () => {
            if (!website_id) return

            const res = await toggleSave({
                website_id,
                isSaved: status,
            })

            if (res) {
                setStatus((prev) => !prev)
            }
        })
    }

    return (
        <AnimatePresence initial={false}>
            <motion.div
                onClick={handleSave}
                layout
                transition={transition}
                className={`${
                    status
                        ? `bg-success text-success-foreground hover:bg-success/80 active:bg-success/70`
                        : `bg-muted text-muted-foreground hover:bg-muted/80 active:bg-muted/70`
                } w-fit p-2 rounded-md text-xs transition-all tracking-wider select-none ${
                    isPending ? `animate-pulse cursor-wait pointer-events-none` : `cursor-pointer`
                }`}
            >
                <LayoutGroup>
                    {status && (
                        <motion.div layout className='w-max'>
                            <motion.div
                                layout
                                variants={variants}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                className='flex flex-row gap-1'
                            >
                                <BookmarkSimple size={16} weight='duotone' />
                                <span>Saved</span>
                            </motion.div>
                        </motion.div>
                    )}

                    {!status && (
                        <motion.div layout className='w-max'>
                            <motion.div
                                layout
                                variants={variants}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                className='flex flex-row gap-1'
                            >
                                <BookmarkSimple size={16} />
                                <span>Save</span>
                            </motion.div>
                        </motion.div>
                    )}
                </LayoutGroup>
            </motion.div>
        </AnimatePresence>
    )
}

export default SaveButton

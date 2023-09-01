'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { revalidateTag } from 'next/cache'
import { mutate } from 'swr'

type Props = {
    isSaved: boolean
    user_id: string | undefined
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

const SaveButton: React.FC<Props> = ({ user_id, website_id, isSaved }) => {
    const [isPending, startTransition] = useTransition()
    const [cloneIsSaved, setSaved] = useState(isSaved)

    useMemo(() => {
        setSaved(isSaved)
    }, [isSaved])

    const handleSave = async () => {
        startTransition(async () => {
            if (!website_id) return

            if (!user_id) {
                // You must be authenticated
                // console.log('not valide')
                return
            }

            const res = await fetch('/api/save', {
                method: 'POST',
                body: JSON.stringify({
                    user_id,
                    website_id,
                    isSaved: cloneIsSaved,
                }),
            })

            setSaved((prev) => !prev)
            mutate('/api/website/saved')
        })
    }

    return (
        <AnimatePresence initial={false}>
            <motion.div
                onClick={handleSave}
                layout
                transition={transition}
                className={`${
                    cloneIsSaved
                        ? `bg-green-300 text-green-700 hover:bg-green-400 active:bg-green-500`
                        : `bg-gray-50 text-black hover:bg-gray-100 active:bg-gray-200`
                } w-fit p-2 rounded-md text-xs transition-colors select-none ${
                    isPending ? `opacity-50 cursor-wait` : `cursor-pointer`
                }`}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            >
                <LayoutGroup>
                    {cloneIsSaved && (
                        <motion.div layout className='w-max'>
                            <motion.div
                                layout
                                variants={variants}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                            >
                                Saved
                            </motion.div>
                        </motion.div>
                    )}

                    {!cloneIsSaved && (
                        <motion.div layout className='w-max'>
                            <motion.div
                                layout
                                variants={variants}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                            >
                                Save
                            </motion.div>
                        </motion.div>
                    )}
                </LayoutGroup>
            </motion.div>
        </AnimatePresence>
    )
}

export default SaveButton

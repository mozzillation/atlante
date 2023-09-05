'use client'

import { useTransition } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { toggleSave } from '@/client/queries'

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
    const [isPending, startTransition] = useTransition()

    const handleSave = async () => {
        startTransition(async () => {
            if (!website_id) return

            await toggleSave({
                website_id,
                isSaved,
            })
        })
    }

    return (
        <AnimatePresence initial={false}>
            <motion.div
                onClick={handleSave}
                layout
                transition={transition}
                className={`${
                    isSaved
                        ? `bg-green-300 text-green-700 hover:bg-green-400 active:bg-green-500`
                        : `bg-gray-50 text-black hover:bg-gray-100 active:bg-gray-200`
                } w-fit p-2 rounded-md text-xs transition-colors select-none ${
                    isPending ? `opacity-50 cursor-wait` : `cursor-pointer`
                }`}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            >
                <LayoutGroup>
                    {isSaved && (
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

                    {!isSaved && (
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

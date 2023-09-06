'use client'

import Link from 'next/link'
import { Globe } from '@phosphor-icons/react'

const HomeButton = () => {
    return (
        <Link href='/'>
            <button className='w-10 h-10 rounded-full bg-accent-foreground text-accent hover:bg-accent-foreground/80 active:bg-accent-foreground/70 transition-colors flex items-center content-center justify-center'>
                <Globe size={24} />
            </button>
        </Link>
    )
}

export default HomeButton

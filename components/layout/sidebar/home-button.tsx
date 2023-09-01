'use client'

import Link from 'next/link'
import { Globe } from '@phosphor-icons/react'

const HomeButton = () => {
    return (
        <Link href='/'>
            <button className='w-[40px] h-[40px] rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center content-center justify-center'>
                <Globe size={24} />
            </button>
        </Link>
    )
}

export default HomeButton

'use client'

import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

type Props = {
    href: Url
}

const SubmitButton: React.FC<Props> = ({ href }) => {
    return (
        <Link href={href}>
            <button
                className={`p-2 rounded-lg leading-6 text-xs transition-colors tracking-wider bg-black text-white hover:bg-gray-950 active:bg-gray-900`}
            >
                Submit a Website
            </button>
        </Link>
    )
}

export default SubmitButton

'use client'

import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
    href: string
}

const SubmitButton: React.FC<Props> = ({ href }) => {
    const router = useRouter()

    return (
        <button
            className={`p-2 rounded-lg leading-6 text-xs transition-colors tracking-wider bg-black text-white hover:bg-gray-950 active:bg-gray-900`}
            onClick={() => router.push(href)}
        >
            Submit a Website
        </button>
    )
}

export default SubmitButton

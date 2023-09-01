'use client'

import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

type Props = {
    children: React.ReactNode
    href: Url
}

const Button: React.FC<Props> = ({ children, href }) => {
    return (
        <Link href={href}>
            <button
                className={`p-2 rounded-lg leading-6 text-xs transition-colors tracking-wider hover:bg-gray-100 active:bg-gray-200`}
            >
                {children}
            </button>
        </Link>
    )
}

export default Button

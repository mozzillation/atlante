'use client'

import { Button } from '@/components/ui/button'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

type Props = {
    children: React.ReactNode
    href: Url
}

const NavItem: React.FC<Props> = ({ children, href }) => {
    return (
        <Link href={href}>
            <Button variant='ghost'>{children}</Button>
        </Link>
    )
}

export default NavItem

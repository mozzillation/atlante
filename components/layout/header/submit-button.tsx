'use client'

import { Button } from '@/components/ui/button'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
    href: string
}

const SubmitButton: React.FC<Props> = ({ href }) => {
    const router = useRouter()

    return <Button onClick={() => router.push(href)}>Submit a Website</Button>
}

export default SubmitButton

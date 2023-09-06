'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

const SignInButton: React.FC = () => {
    return (
        <Button variant='ghost' onClick={() => signIn('google')}>
            Sign In
        </Button>
    )
}

export default SignInButton

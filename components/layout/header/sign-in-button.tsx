'use client'

import { signIn } from 'next-auth/react'

const SignInButton: React.FC = () => {
    return (
        <button
            className={`p-2 rounded-lg leading-6 text-xs transition-colors tracking-wider bg-green-300 text-green-700 hover:bg-green-400 active:bg-green-500`}
            onClick={() => signIn('google')}
        >
            Sign In
        </button>
    )
}

export default SignInButton

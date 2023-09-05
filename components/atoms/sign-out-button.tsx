'use client'

import { signOut } from 'next-auth/react'

const SignOutButton: React.FC = () => {
    return (
        <button
            className={`p-2 rounded-lg text-xs transition-colors tracking-wider bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-300`}
            onClick={() => signOut()}
        >
            Sign Out
        </button>
    )
}

export default SignOutButton

'use client'

import { signIn } from 'next-auth/react'
import { MiniWrapper } from '../layout'

const SignIn: React.FC = () => {
    return (
        <div className='flex h-screen flex-row'>
            <aside className='w-full max-w-lg bg-white shadow-xl shrink-0 p-4 md:p-8'>
                <div className='h-full flex flex-col justify-between items-center content-center '>
                    <div className='w-full flex flex-col justify-center items-center content-center space-y-8 h-full'>
                        <header className='text-center max-w-prose w-full'>
                            <h1 className='text-2xl font-medium'>Welcome, stranger</h1>
                        </header>

                        <button
                            onClick={() =>
                                signIn('google', {
                                    callbackUrl: '/',
                                })
                            }
                            className='bg-white border-2 border-gray-100 text-xs p-2 rounded-lg tracking-widest font-medium hover:bg-gray-100 focus:bg-gray-200 focus:border-gray-200 transition-colors w-full max-w-xs'
                        >
                            Sign in with Google
                        </button>
                    </div>
                    <footer>
                        <p className='text-center text-xs tracking-wider text-gray-400'>
                            By logging in, you accept our Terms and Conditions and Privacy Policy
                        </p>
                    </footer>
                </div>
            </aside>
            <div className='bg-green-100 w-full'></div>
        </div>
    )
}

export default SignIn

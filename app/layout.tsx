import './globals.css'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: 'Atlante Gallery',
        template: '%s • Atlante Gallery',
    },
    description: 'Generated by create next app',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='en'>
            <body className={lexend.className}>{children}</body>
        </html>
    )
}

export default RootLayout

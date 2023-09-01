'use client'

import { SessionProvider } from 'next-auth/react'

type Props = {
    children: React.ReactNode
}

const SessionContext: React.FC<Props> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default SessionContext

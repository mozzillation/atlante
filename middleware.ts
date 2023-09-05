import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname

    if (path === '/') {
        return NextResponse.next()
    }

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    if (!session && path === '/me') {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    return NextResponse.next()
}

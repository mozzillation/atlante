import { getAllWebsitesQuery, getProfileQuery } from '@/client/queries'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export const GET = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user) return NextResponse.json({ message: 'No valid session' }, { status: 500 })

    const profile = await getProfileQuery(session.user.id)

    return NextResponse.json(profile)
}

import { getSavedWebsitesQuery } from '@/client/queries'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export const GET = async () => {
    const session = await getServerSession(authOptions)

    const websites = await getSavedWebsitesQuery(session?.user.id)

    return NextResponse.json(websites)
}

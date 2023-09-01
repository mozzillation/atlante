import prisma from '@/client/prisma'
import { getAllWebsitesQuery } from '@/client/queries'
import { WebsiteWithSaves } from '@/types'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export const GET = async () => {
    const session = await getServerSession(authOptions)

    const websites = await getAllWebsitesQuery(session?.user.id)

    return NextResponse.json(websites)
}

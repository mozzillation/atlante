import prisma from '@/client/prisma'
import { getAllWebsitesQuery, getWebsiteQuery } from '@/client/queries'
import { WebsiteWithSaves } from '@/types'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

type Params = {
    params: {
        id: string
    }
}

export const GET = async (req: Request, { params }: Params) => {
    const session = await getServerSession(authOptions)
    const { id } = params

    if (!id) return NextResponse.json({ error: 'Missing params' }, { status: 500 })

    const websites = await getWebsiteQuery({
        id,
        user_id: session?.user.id,
    })

    return NextResponse.json(websites)
}

import { toggleSave } from '@/client/queries'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
    const { website_id, user_id, isSaved } = await req.json()

    if (!website_id || !user_id)
        return NextResponse.json({ error: 'Missing params' }, { status: 500 })

    const action = await toggleSave({
        website_id,
        isSaved,
        user_id,
    })

    return NextResponse.json({ revalidated: true, now: Date.now() })
}

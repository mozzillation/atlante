import { setBlurUrl } from '@/client/queries'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
    const { asset_id, website_id } = await req.json()

    if (!asset_id || !website_id)
        return NextResponse.json({ message: 'No params provided' }, { status: 500 })

    const action = await setBlurUrl({ asset_id, website_id })

    return NextResponse.json(action)
}

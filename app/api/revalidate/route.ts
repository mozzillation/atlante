import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export const GET = async (request: NextRequest) => {
    const tag = request.nextUrl.searchParams.get('tag')
    if (!tag) {
        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: 'Missing tag to revalidate',
        })
    }

    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, now: Date.now() })
}

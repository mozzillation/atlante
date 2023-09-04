import { getAllCategoriesQuery } from '@/client/queries'
import { Categories } from '@/types'
import { NextResponse } from 'next/server'

export const GET = async () => {
    const categories = await getAllCategoriesQuery()

    return NextResponse.json(categories)
}

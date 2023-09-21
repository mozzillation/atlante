'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from './prisma'
import { SaveWithWebsite, WebsiteWithSaves, WebsiteWithSavesAndCategories } from '@/types'
import { directus_users, website } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { notFound, redirect } from 'next/navigation'

import { getPlaiceholder } from 'plaiceholder'
import { imageUrl } from '@/lib/image'
import { randomUUID } from 'crypto'

type SetBlurUrlProps = {
    website_id: string
    asset_id: string
}

const WEBSITES_PER_PAGE = 24

export const setBlurUrl = async ({ website_id, asset_id }: SetBlurUrlProps) => {
    if (!asset_id) throw new Error(`Failed to fetch ${asset_id}: no asset id provided`)

    try {
        const res = await fetch(imageUrl(asset_id, 'thumbnail'))

        if (!res.ok) throw new Error(`Failed to fetch ${asset_id}: ${res.status}`)

        const buffer = await res.arrayBuffer()

        const { base64 } = await getPlaiceholder(Buffer.from(buffer))

        return await prisma.website.update({
            where: {
                id: website_id,
            },
            data: {
                blurData: base64,
            },
        })
    } catch (err) {
        err
    }
}

export const getAllWebsitesQuery = async (page: number): Promise<WebsiteWithSaves[]> => {
    const session = await getServerSession(authOptions)

    return await prisma.website
        .findMany({
            where: {
                status: 'published',
            },
            include: {
                save: true,
            },
            orderBy: [
                {
                    date_created: 'desc',
                },
            ],
            take: WEBSITES_PER_PAGE,
            skip: page > 1 ? page * WEBSITES_PER_PAGE - WEBSITES_PER_PAGE : 0,
        })
        .then((res) => {
            if (session?.user.id) {
                const websites = res.map((website) => {
                    return {
                        ...website,
                        isSaved: website.save.some((i) => i.user_id === session.user.id),
                    }
                })

                return websites
            } else {
                const websites = res.map((website) => {
                    return {
                        ...website,
                        isSaved: false,
                    }
                })
                return websites
            }
        })
}

export const getSavedWebsitesQuery = async (): Promise<SaveWithWebsite[]> => {
    const session = await getServerSession(authOptions)

    if (!session?.user.id) notFound()

    return await prisma.save
        .findMany({
            where: {
                user_id: session.user.id,
                website: {
                    status: 'published',
                },
            },
            include: {
                website: true,
            },
            orderBy: {
                date_created: 'desc',
            },
        })
        .then((res) => {
            return res.map((save) => {
                return {
                    ...save,
                    website: {
                        ...save.website,
                        isSaved: true,
                    },
                }
            })
        })
}

type GetWebsiteQueryProps = {
    user_id: string | undefined
    id: string
}

export const getWebsiteQuery = async (id: string): Promise<WebsiteWithSavesAndCategories> => {
    const session = await getServerSession(authOptions)

    return await prisma.website
        .findUniqueOrThrow({
            where: {
                id,
            },
            include: {
                save: true,
                website_category: {
                    include: {
                        category: true,
                    },
                },
            },
        })
        .then((website) => {
            if (session?.user.id) {
                return {
                    ...website,
                    isSaved: website.save.some((i) => i.user_id === session?.user.id),
                }
            } else {
                return {
                    ...website,
                    isSaved: false,
                }
            }
        })
}

export const getProfileQuery = async (user_id: string): Promise<directus_users> => {
    return await prisma.directus_users.findUniqueOrThrow({
        where: {
            id: user_id,
        },
    })
}

type ToggleSaveFunction = {
    website_id: string
    isSaved: boolean
}

export const toggleSave = async ({ website_id, isSaved }: ToggleSaveFunction) => {
    const session = await getServerSession(authOptions)

    if (!session?.user.id) redirect('/sign-in')

    if (!website_id) throw 'Internal Error'

    let action

    if (isSaved) {
        action = await prisma.save.deleteMany({
            where: {
                website_id,
                user_id: session.user.id,
            },
        })
    } else {
        action = await prisma.save.create({
            data: {
                website_id,
                user_id: session.user.id,
                date_created: new Date(),
            },
        })
    }

    revalidatePath('/')
    return action
    // revalidatePath('/me')
    // revalidatePath('/directory')
}

export const getAllCategoriesQuery = async () => {
    return await prisma.category
        .findMany({
            include: {
                _count: {
                    select: {
                        website_category: true,
                    },
                },
            },
            where: {
                slug: {
                    not: undefined,
                },
            },
            orderBy: {
                name: 'asc',
            },
        })
        .then((res) => {
            const types = res.filter((category) => category.collection === 'type')
            const styles = res.filter((category) => category.collection === 'style')

            return {
                types,
                styles,
            }
        })
}

type GetCategoryQueryProps = {
    collection: 'style' | 'type'
    slug: string
}

export const getCategoryQuery = async ({ collection, slug }: GetCategoryQueryProps) => {
    return await prisma.category.findUnique({
        where: {
            slug,
            collection,
        },
        include: {
            _count: {
                select: {
                    website_category: true,
                },
            },
        },
    })
}

type GetWebsitesByQueryProps = {
    collection: 'style' | 'type'
    slug: string
    page: number
}

export const getWebsitesByCategoryQuery = async ({
    collection,
    slug,
    page,
}: GetWebsitesByQueryProps) => {
    const session = await getServerSession(authOptions)

    return await prisma.website
        .findMany({
            where: {
                website_category: {
                    some: {
                        category: {
                            collection,
                            slug,
                        },
                    },
                },
            },
            orderBy: [
                {
                    date_created: 'desc',
                },
            ],
            include: {
                save: true,
            },
            take: WEBSITES_PER_PAGE,
            skip: page > 1 ? page * WEBSITES_PER_PAGE - WEBSITES_PER_PAGE : 0,
        })
        .then((res) => {
            if (session?.user.id) {
                const websites = res.map((website) => {
                    return {
                        ...website,
                        isSaved: website.save.some((i) => i.user_id === session.user.id),
                    }
                })

                return websites
            } else {
                const websites = res.map((website) => {
                    return {
                        ...website,
                        isSaved: false,
                    }
                })
                return websites
            }
        })
}

export const generateCategoriesSlugs = async () => {
    return await prisma.category.findMany({
        where: {
            slug: {
                not: undefined,
            },
        },
    })
}

export const addSubmission = async (url: string) => {
    const action = await prisma.submission.create({
        data: {
            id: randomUUID(),
            url,
            date_created: new Date().toISOString(),
        },
    })

    if (action.id)
        await fetch(
            'https://directus.mzz.design/flows/trigger/e767e385-7afb-4dd5-902c-9dd606eca2b4',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.DIRECTUS_ADMIN}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: action.id,
                }),
            },
        )

    return action
}

export const getWebsiteSitemap = async (): Promise<website[]> => {
    const session = await getServerSession(authOptions)

    return await prisma.website.findMany({
        where: {
            status: 'published',
        },
        orderBy: [
            {
                date_created: 'desc',
            },
        ],
    })
}

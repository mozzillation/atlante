'use server'

import prisma from './prisma'
import { WebsiteWithSaves } from '@/types'
import { directus_users, style, type } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const getAllWebsitesQuery = async (
    user_id: string | undefined,
): Promise<WebsiteWithSaves[]> => {
    return await prisma.website
        .findMany({
            include: {
                save: true,
            },
            orderBy: [
                {
                    date_created: 'desc',
                },
            ],
        })
        .then((res) => {
            if (user_id) {
                const websites = res.map((website) => {
                    return {
                        ...website,
                        isSaved: website.save.some((i) => i.user_id === user_id),
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

export const getSavedWebsitesQuery = async (
    user_id: string | undefined,
): Promise<WebsiteWithSaves[]> => {
    if (!user_id) throw 'Not logged'

    return await prisma.website
        .findMany({
            where: {
                save: {
                    some: {
                        user_id: {
                            equals: user_id,
                        },
                    },
                },
            },
            include: {
                save: true,
            },
        })
        .then((res) => {
            return res.map((website) => {
                return {
                    ...website,
                    isSaved: website.save.some((i) => i.user_id === user_id),
                }
            })
        })
}

type GetWebsiteQueryProps = {
    user_id: string | undefined
    id: string
}

export const getWebsiteQuery = async ({
    user_id,
    id,
}: GetWebsiteQueryProps): Promise<WebsiteWithSaves> => {
    return await prisma.website
        .findUniqueOrThrow({
            where: {
                id,
            },
            include: {
                save: true,
                style: true,
                type: true,
            },
        })
        .then((website) => {
            return {
                ...website,
                isSaved: website.save.some((i) => i.user_id === user_id),
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
    user_id: string
    isSaved: boolean
}

export const toggleSave = async ({ website_id, user_id, isSaved }: ToggleSaveFunction) => {
    if (!website_id || !user_id) throw 'Internal Error'

    if (isSaved) {
        const action = await prisma.save.deleteMany({
            where: {
                website_id,
                user_id,
            },
        })
    } else {
        const action = await prisma.save.create({
            data: {
                website_id,
                user_id,
            },
        })
    }
}

export const getAllCategoriesQuery = async () => {
    const types = await prisma.type.findMany({
        orderBy: [
            {
                name: 'asc',
            },
        ],
    })
    const styles = await prisma.style.findMany({
        orderBy: [
            {
                name: 'asc',
            },
        ],
    })

    return {
        types,
        styles,
    }
}

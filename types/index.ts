import { category, save, website } from '@prisma/client'

export type WebsiteWithSaves = website & {
    isSaved: boolean
}

export type Categories = {
    types: category[]
    styles: category[]
}

export type SaveWithWebsite = save & {
    website: website & {
        isSaved: boolean
    }
}

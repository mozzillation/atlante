import { category, save, website, website_category } from '@prisma/client'

export type WebsiteWithSaves = website & {
    isSaved: boolean
    save: save[]
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

export type CategoryWithRelations = website_category & {
    category: category
}

export type WebsiteWithSavesAndCategories = website & {
    isSaved: boolean
    save: save[]
    website_category: CategoryWithRelations[]
}

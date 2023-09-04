import { style, type, website } from '@prisma/client'

export type WebsiteWithSaves = website & {
    isSaved: boolean
}

export type Categories = {
    types: type[]
    styles: style[]
}

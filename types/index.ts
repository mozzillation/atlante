import { website } from '@prisma/client'

export type WebsiteWithSaves = website & {
    isSaved: boolean
}

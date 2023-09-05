export const imageUrl = (path: string | null, key: string): string => {
    if (!path) return 'null'

    return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${path}?key=${key}`
}

export const placeholderUrl = (path: string): string => {
    return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${path}?key=blur`
}

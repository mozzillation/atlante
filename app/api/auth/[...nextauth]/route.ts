import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { nanoid } from 'nanoid'

import prisma from '@/client/prisma'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const user = await prisma.directus_users.findUniqueOrThrow({
                where: {
                    email: session.user.email,
                },
            })

            return {
                ...session,
                user,
            }
        },
        // async redirect({ url, baseUrl }) {
        //     if (url.startsWith('/')) return `${baseUrl}${url}`
        //     else if (new URL(url).origin === baseUrl) return url
        //     return baseUrl
        // },
        async signIn({ profile }) {
            const user = await prisma.directus_users.findUnique({
                where: {
                    email: profile?.email,
                },
            })

            if (!user && profile) {
                try {
                    const imagePayload = {
                        url: profile.picture,
                        data: {
                            folder: process.env.AVATAR_FOLDER, // Avatar Assets folder,
                            title: nanoid(),
                        },
                    }

                    const imageUpload = await fetch(
                        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/files/import`,
                        {
                            method: 'POST',
                            body: JSON.stringify(imagePayload),
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${process.env.DIRECTUS_ADMIN}`,
                            },
                            credentials: 'include',
                        },
                    )

                    const { data } = await imageUpload.json()

                    const payload = {
                        first_name: profile.given_name,
                        last_name: profile.family_name,
                        email: profile.email,
                        avatar: data.id,
                        provider: 'google',
                        external_identifier: profile.email,
                        role: process.env.USER_ROLE, // Basic User
                    }

                    const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/users`, {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${process.env.DIRECTUS_ADMIN}`,
                        },
                        credentials: 'include',
                    })

                    const user = await res.json()
                } catch (error) {
                    throw error
                }
            }

            return true
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

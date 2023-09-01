import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
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
                            folder: '39735b51-28f5-43a8-8fd5-e4d78b8e9e1a', // Avatar Assets folder,
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
                        role: '6a8575a2-c05a-4f49-90c6-7fc878029b23', // Basic User
                    }

                    const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}}/users`, {
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

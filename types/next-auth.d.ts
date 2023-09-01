import NextAuth from 'next-auth'
import { JWT, DefaultJWT, JWTOptions } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user: {
            first_name: string
            last_name: string
            email: string
            status: string
            id: string
            avatar: string
            access_token: string
            refresh_token: string
            expires: number
            error: string
        }
    }

    interface User {
        data: {
            access_token: string
            refresh_token: string
            expires: number
            error: string
        }
    }

    interface Profile {
        picture: string
        given_name: string
        family_name: string
        email: string
    }
}

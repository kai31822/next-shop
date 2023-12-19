import prisma from "@/prisma/client";
import { nanoid } from 'nanoid'
import { getServerSession, type NextAuthOptions } from "next-auth";
//CredentialsProvide
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

export const options: NextAuthOptions = {
    providers: [
        //google
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        //CredentialsProvider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch("http://localhost:3000/api/login", {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })

                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    //page
    pages: {
        signIn: '/login'
    },
    //debug
    debug: process.env.NODE_ENV === 'development',
    //session
    session: {
        strategy: "jwt",
    },
    //
    secret: process.env.NEXTAUTH_SECRET,
    // callbacks: {

    //     async session({ token, session }) {
    //         if (token) {
    //             session.user.id = token.id
    //             session.user.name = token.name
    //             session.user.email = token.email
    //             session.user.image = token.picture
    //             session.user.username = token.username
    //         }
    //         return session
    //     },
    //     async jwt({ user, token }) {
    //         const dbUser = await prisma.user.findFirst({
    //             where: {
    //                 email: token.email,
    //             }
    //         })

    //         if (!dbUser) {
    //             token.id = user!.id
    //             return token
    //         }
    //         if (!dbUser.username) {
    //             await prisma.user.update({
    //                 where: {
    //                     id: dbUser.id
    //                 },
    //                 data: {
    //                     username: nanoid(10)
    //                 }
    //             })
    //         }
    //         return {
    //             id: dbUser.id,
    //             name: dbUser.name,
    //             email: dbUser.email,
    //             picture: dbUser.image,
    //             username: dbUser.username
    //         }
    //     },
    //     redirect() {
    //         return '/'
    //     }
    // }
}

export const getAuthSession = () => {
    getServerSession(options)
}

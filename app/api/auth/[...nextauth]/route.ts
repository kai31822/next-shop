import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
// import bcrypt from 'bcrypt'


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    //
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied



        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid email or password')
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user || user?.password !== credentials.password)
          throw new Error('Invalid email or password')

        // const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)

        // if (!isCorrectPassword) { throw new Error('Invalid email or password') }

        return user

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
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }

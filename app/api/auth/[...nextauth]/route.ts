import NextAuth from "next-auth"
import { options } from './option'
// import bcrypt from 'bcrypt'


const handler = NextAuth(options)

export { handler as GET, handler as POST }

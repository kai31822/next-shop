import prisma from "@/prisma/client"
// import { signJWTAccessToken } from "@/app/lib/jwt"
import bcrypt from "bcrypt"
interface Requestbody {
    email: string
    password: string
}

export async function POST(reqest: Request) {
    const body: Requestbody = await reqest.json()
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }

    })
    //hash password
    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...WithoutPassword } = user
        // const accessToken = signJWTAccessToken(WithoutPassword)
        // const result = {
        //     ...WithoutPassword, accessToken
        // }
        // return new Response(JSON.stringify(result))
        return new Response(JSON.stringify(user))
    } else {
        return new Response(JSON.stringify(null))
    }

}

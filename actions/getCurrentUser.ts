import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/option";
import prisma from '@/prisma/client'



export async function getSession() {
    return await getServerSession(options)
}

export async function getCurrentUser() {
    try {
        const session = await getServerSession()

        if (!session?.user?.email) {
            return null
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        })
        if (!currentUser) {
            return null
        }
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified:currentUser.emailVerified?.toString()|| null,
        }

    } catch (error: any) {
        return null
    }
}

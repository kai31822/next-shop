import { Image } from "@/prisma/prisma-generated/client"
import { User } from '@/prisma/prisma-generated/client'

// export type User = {
//     "id": String,
//     "email": String,
//     "name": String,
//     "password": String,
//     "role": String,
//     "address": String,
//     "phone": number,
//     "emailVerified": string,
//     "image": Image,
//     "createdAt": String,
//     "updatedAt": String

// }

//

export type safeUser = Omit<User,
    'createdAt' | 'updatedAt' | 'emailVerified'> & {
        createdAt: string
        updatedAt: string
        emailVerified: string | null
    }

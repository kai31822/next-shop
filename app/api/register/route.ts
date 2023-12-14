import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from "next/server";
//zod
import { z } from 'zod';
// create account
export const createAccountSchema = z.object({
    name: z.string().min(1, 'Name is required.').max(25),
    email: z.string().min(1, 'Email is required.').max(25),
    password: z.string().min(8, 'Password is required.').max(25)
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    //we have to validate our request to make sure it doesn't have bed data
    const validation = createAccountSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
    //create New account
    const hashedpassword = bcrypt.hash(body.password, 10)
    const newUser = await prisma.user.create({
        data: { name: body.name, email: body.email, password: body.password }
    })
    //return data json
    return NextResponse.json(newUser, { status: 201 })
}

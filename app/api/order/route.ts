//products
import { NextRequest, NextResponse } from 'next/server';
//zod
import { z } from 'zod';
//prisma
import prisma from "@/prisma/client";
import { getCurrentUser } from '@/actions/getCurrentUser';

//PUT
export async function PUT(request: Request) {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error()
    }

    const body = await request.json()
    const { id, deliverStatus } = body

    const order = await prisma.order.update({
        where: {
            id: id
        },
        data: {
           deliverStatus
        }
    })
    return NextResponse.json(order)
}

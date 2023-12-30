import { NextRequest, NextResponse } from 'next/server';
//prisma
import prisma from "@/prisma/client";
import { getCurrentUser } from '@/actions/getCurrentUser';



export async function GET(request: NextRequest) {
    const product = await prisma.product.findUnique({
        where: {
            id: '8792fbc1-a99c-4243-b0b7-381818cdd242'
        },
    })
    return NextResponse.json(product, { status: 201 })
}


//delete
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error()
    }

    const product = await prisma?.product.delete({
        where: {
            id: params.id
        },
    })
    return NextResponse.json(product, { status: 201 })
}

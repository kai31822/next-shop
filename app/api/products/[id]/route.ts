import { NextRequest, NextResponse } from 'next/server';
//prisma
import prisma from "@/prisma/client";



export async function GET(request: NextRequest) {
    const product = await prisma.product.findUnique({
        where: {
            Product_ID: '8792fbc1-a99c-4243-b0b7-381818cdd242'
        },
    })
    return NextResponse.json(product, { status: 201 })
}

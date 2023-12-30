//products
import { NextRequest, NextResponse } from 'next/server';
//zod
import { z } from 'zod';
//prisma
import prisma from "@/prisma/client";
import { getCurrentUser } from '@/actions/getCurrentUser';

// createProducts
export const createProductsSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    brand: z.string(),
    quantity: z.number(),
    categoryId: z.number(),
    inStock: z.boolean(),
    image: z.object({
        color: z.string(),
        colorCode: z.string(),
        image: z.string()
    }),

});

//Create Products
export async function POST(request: NextRequest) {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error()
    }

    const body = await request.json();
    const validation = createProductsSchema.safeParse(body);
    //we have to validate our request to make sure it doesn't have bed data
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
    //create New Products
    const newProduct = await prisma.product.create({
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
            brand: body.brand,
            quantity: body.quantity,
            inStock: body.inStock,
            image: body.image,
            categoryId: body.categoryId

        }
    })
    //return data json
    return NextResponse.json(newProduct, { status: 201 })
}

//read Products
export async function GET() {
    const products = await prisma.product.findMany()
    return NextResponse.json(products, { status: 201 })
}

//PUT
export async function PUT(request: Request) {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error()
    }

    const body = await request.json()
    const { id, inStock } = body

    const product = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            inStock
        }
    })
    return NextResponse.json(product)
}

//products
import { NextRequest, NextResponse } from 'next/server';
//zod
import { z } from 'zod';
//prisma
import prisma from "@/prisma/client";

// createProducts
export const createProductsSchema = z.object({
    Product_name: z.string(),
    Product_description: z.string(),
    Price: z.number(),
    Product_quantity: z.number(),
    categoryId: z.number()
});

//Create Products
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createProductsSchema.safeParse(body);
    //we have to validate our request to make sure it doesn't have bed data
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
    //create New Products
    const newProduct = await prisma.product.create({
        data: {
            Product_name: body.Product_name,
            Product_description: body.Product_description,
            Price: body.Price,
            Product_quantity: body.Product_quantity,
            categoryId: body.categoryId

        }
    })
    //return data json
    return NextResponse.json(newProduct, { status: 201 })
}

//read Products
export async function GET() {
    const products= await prisma.product.findMany()
    return NextResponse.json(products, { status: 201 })
}


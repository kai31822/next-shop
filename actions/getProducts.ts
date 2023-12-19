import prisma from "@/prisma/client";

export interface ProductsParmas {
    categoryId?: string | null | number
    serchTerm?: string | null
}


const getProducts = async (params: ProductsParmas) => {
    try {
        const { categoryId, serchTerm } = params
        let serchString = serchTerm
        if (!serchString) {
            serchString = ''
        }
        let query: any = {}
        if (categoryId) {
            query.categoryId = categoryId
        }
        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: serchString,
                        },
                        description: {
                            contains: serchString,
                        }
                    }
                ]
            },
            include: {
                reviews: {
                    include: {
                        User: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })
        return products

    } catch (error: any) {
        throw new Error(error)
    }
}

export default getProducts

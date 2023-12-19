import prisma from '@/prisma/client'


const getOrders = async () => {
  try {
    const order = await prisma.order.findMany({
      include: {
        User: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return order

  } catch (error: any) {
    throw new Error(error)
  }
}

export default getOrders

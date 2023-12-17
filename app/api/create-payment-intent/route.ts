//npm i stripe
import Stripe from 'stripe'
import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'
import { CartProductType } from '@/app/(pages)/product/[productId]/ProductDetails'
import { getCurrentUser } from '@/actions/getCurrentUser'

const stripe = new Stripe(process.env.STRIPW_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
})

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity
        return acc + itemTotal
    }, 0)

    return totalPrice
}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()
    //check auth
    if (!currentUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items, payment_intent_id } = body
    const total = calculateOrderAmount(items) * 100
    //order data
    const orderData = {
        user: currentUser.id,
        amount: total,
        currency: 'twd',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items
    }

    if (payment_intent_id) {
        //
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
        if (current_intent) {
            const update_intent = await stripe.paymentIntents.update(
                payment_intent_id, { amount: total }
            )
        }
        //update the order
        const { existing_order, update_order } = await Promise.all([
            prisma.order.findFirst({
                where: { paymentIntentId: payment_intent_id }
            }),
            prisma.order.update({
                where: { paymentIntentId: payment_intent_id },
                data: {
                    amount: total,
                    products: items
                }
            })
        ])
        if (!existing_order) {
            return NextResponse.json({ error: 'Invalid Payment Intent' }, { status: 400 })
        }
        return NextResponse.json({ paymentIntent: update_order })

    } else {
        //create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'twd',
            automatic_payment_methods: { enabled: true }
        })
        //create the order
        orderData.paymentIntentId = paymentIntent.id
        await prisma.order.create({
            data: {
                user: orderData.user,
                amount: orderData.amount,
                currency: orderData.currency,
                status: orderData.status,
                deliverStatus: orderData.deliveryStatus,
                paymentIntentId: orderData.paymentIntentId,
                productId: orderData.products
            }
        })
        return NextResponse.json({ paymentIntent })
    }
}

'use client'
import Heading from '@/app/components/ui/product/Heading'
import Status from '@/app/components/ui/product/Status'
import formatPrice from '@/lib/formatPrice'
import { Order } from '@/prisma/prisma-generated/client'
import moment from 'moment'
import React from 'react'
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md'
import OrderItem from './OrderItem'

interface OrderDetailsProps {
    order: orderdata
}
type orderdata = {
    products: [{
        id: string;
        name: string;
        description: string;
        price: number;
        brand: string;
        inStock: boolean;
        quantity: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }];
    id: string;
    user: string;
    amount: number;
    currency: string;
    status: string;
    deliverStatus: string;
    paymentIntentId: string;
    Express_Address: string | null;
    Order_Email: string | null;
    Order_Phone: number | null;
    Order_City: string | null,
    Order_Postal_code: string | null,
    Order_Express_cost: string | null,
    createdAt: string,
    updatedAt: string,
    productId: string | null;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {

    return (
        <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
            <div>
                <Heading title='Order Details' />
            </div>
            {/* id */}
            <div>
                Order ID: {order.id}
            </div>
            {/* amount */}
            <div>
                Total Amount: <span className='font-bold'>{formatPrice(order.amount)}</span>
            </div>
            {/* payment status */}
            <div className='flex gap-2 items-center'>
                <div>Payment status:</div>
                <div>
                    {order.status === 'pending' ? <Status
                        text='pending'
                        icon={MdAccessTimeFilled}
                        bg='bg-slate-200'
                        color='text-slate-7000'
                    /> : order.status === 'complete' ? <Status
                        text='complete'
                        icon={MdDone}
                        bg='bg-green-200'
                        color='text-green-7000'
                    /> : <></>}
                </div>
            </div>
            {/* deliverStatus status */}
            <div className='flex gap-2 items-center'>
                <div>Delivery status:</div>
                <div>
                    {order.deliverStatus === 'pending' ? <Status
                        text='pending'
                        icon={MdAccessTimeFilled}
                        bg='bg-slate-200'
                        color='text-slate-7000'
                    /> : order.deliverStatus === 'despatched' ? <Status
                        text='despatched'
                        icon={MdDeliveryDining}
                        bg='bg-purple-200'
                        color='text-purple-7000'
                    /> : order.deliverStatus === 'delivered' ? <Status
                        text='delivered'
                        icon={MdDone}
                        bg='bg-green-200'
                        color='text-green-7000'
                    /> : <></>}
                </div>
            </div>
            {/* date */}
            <div>
                Date: {moment(order.createdAt).fromNow()}
            </div>
            {/* products */}
            <div>
                <h2 className='font-semibold mt-4 mb-2'>Products ordered</h2>
                <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center'>
                    <div className='col-span-2 justify-self-start'>Product</div>
                    <div className='justify-self-center'>Price</div>
                    <div className='justify-self-center'>QTY</div>
                    <div className='justify-self-end'>Total</div>
                </div>
                {order.productId &&
                    order.products.map((item) => {
                        // return <OrderItem key={item.id} item={item}/>
                        return <>
                        <div key={item.id}>{item.name}</div>
                        </>
                    })}
            </div>
        </div>
    )
}

export default OrderDetails

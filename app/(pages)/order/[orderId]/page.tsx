
import Container from '@/app/components/ui/Container';
import React from 'react'
import OrderDetails from './OrderDetails';
import getOrderById from '@/actions/getOrderById';
import NullData from '@/app/components/NullDate';

interface Iparams {
    orderId?: string
}


const Order = async ({ params }: { params: Iparams }) => {
    const order = await getOrderById(params)
    if(!order)return <NullData title='No Order' />
console.log(order);


    return (
        <div className='p-8'>
            <Container >
                <OrderDetails order={order} />
            </Container>
        </div>
    )
}

export default Order

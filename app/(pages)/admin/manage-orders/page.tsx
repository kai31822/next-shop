import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullDate'
import Container from '@/app/components/ui/Container'
import React from 'react'
import ManageOrderClient from './ManageOrderClinet'
import getOrders from '@/actions/getOrders'

const page = async() => {
    const orders = await getOrders()
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title='Oops! Access denied'></NullData>
    }

    return (
        <div className='pt-8'>
            <Container>
                <ManageOrderClient orders={orders} />
            </Container>
        </div>
    )
}

export default page

import Container from '@/app/components/ui/Container'
import React from 'react'
import ManageProductsClient from './ManageProductsClient'
import getProducts from '@/actions/getProducts'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullDate'


const ManageProducts = async () => {
    const products = await getProducts({ categoryId: null})
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title='Oops! Access denied'></NullData>
    }

    return (
        <div className='pt-8'>
            <Container>
                <ManageProductsClient products={products} />
            </Container>
        </div>
    )
}

export default ManageProducts

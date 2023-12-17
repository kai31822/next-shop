
import Container from '@/app/components/ui/Container'
import FormWrap from '@/app/components/ui/FormWrap'
import React from 'react'
import AddProductForm from './AddProductForm'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullDate'

const AddProduct = async() => {
const currentUser= await getCurrentUser()
if(!currentUser || currentUser.role !== "ADMIN"){
    return <NullData title='Oops! Access denied'></NullData>
}

    return (
        <div>
            <Container>
                <FormWrap>
                    <AddProductForm></AddProductForm>
                </FormWrap>
            </Container>
        </div>
    )
}

export default AddProduct

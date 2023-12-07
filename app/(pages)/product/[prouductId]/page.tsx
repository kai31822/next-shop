import Container from '@/app/components/ui/Container';
import React from 'react'
import ProductDetails from './ProductDetails';
import { product } from '@/lib/producttest';

interface Iparams {
  productId?: string
}


const ProudctInfo = ({ params }: { params: Iparams }) => {
  console.log(params);


  return (
    <div className='p-8'>
      <Container >
        <p>1</p>
        <ProductDetails product={product}/>
      </Container>
    </div>
  )
}

export default ProudctInfo

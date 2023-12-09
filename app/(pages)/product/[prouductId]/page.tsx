import Container from '@/app/components/ui/Container';
import React from 'react'
import ProductDetails from './ProductDetails';
import { product } from '@/lib/producttest';
import ListRating from './ListRating';

interface Iparams {
  productId?: string
}


const ProudctInfo = ({ params }: { params: Iparams }) => {
  console.log(params);


  return (
    <div className='p-8'>
      <Container >
        <ProductDetails product={product} />
        {/* reviews */}
        <div className='flex flex-col mt-20 gap-4'>
          <div className=''>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  )
}

export default ProudctInfo

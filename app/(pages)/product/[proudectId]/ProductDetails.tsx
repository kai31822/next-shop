'use client'
import Horizontal from '@/app/components/Horizontal';
import React from 'react'

interface ProductDetailsProps {
    product: Product
}
type Product = {
    Product_ID?: string;
    Product_name?: string;
    Product_description?: string;
    Price?: number;
    Image?: string;
    Product_quantity?: number;
    categoryId?: number;
};


const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {




    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <div>image</div>
            <div className='flex flex-col gap-1 text-slate-500 text-sm '>
                {/* name */}
                <h2 className='text-3xl font-medium text-slate-700'>{product.Product_name}</h2>
                <Horizontal />
                {/* description */}
                <div className='text-justify'>{product.Product_description}</div>
                <Horizontal />
                {/*  */}
                <div>
                    <span className='font-semibold'>CATEGORY:{product.categoryId}</span>
                </div>
                <div>
                    <span className='font-semibold'>Brand:{product.categoryId}</span>
                </div>
                <div className={product.Product_quantity ? 'text-teal-400' : 'text-rose-400'}>{product.Product_quantity ? 'In stock' : 'Out of stock'}
                </div>
                <Horizontal />
                <div>color</div>
                <Horizontal />
                <div>quantity</div>
                <Horizontal />
                <div>add to cart</div>
            </div>
        </div>
    )
}

export default ProductDetails

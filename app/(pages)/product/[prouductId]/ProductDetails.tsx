'use client'
import Horizontal from '@/app/components/Horizontal';
import SetColor from '@/app/components/ui/product/SetColor';
import SetQuantity from '@/app/components/ui/product/SetQuantity';
import React, { useCallback, useState } from 'react'

interface ProductDetailsProps {
    product: any
}
export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number
}
export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}
// interface Product {
//     Product_ID?: string
//     Product_name?: string
//     Product_description?: string
//     Price?: number
//     Image?: Imagetype
//     Product_quantity?: number
//     categoryId?: number
// }
// interface Imagetype {
//     color: string
//     image: string
// }


const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 5,
        price: product.price,
    })
    // console.log(cartProduct);

    //handleColorSelect
    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct((prev) => {
            return { ...prev, selectedImg: value };
        });
    }, [cartProduct.selectedImg])
    //handleQtyIncrease
    const handleQtyIncrease = useCallback(() => {
        //set maximum
        if (cartProduct.quantity === 999) {
            return
        }
        //
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 };
        });
    }, [cartProduct])
    //handleQtyDecrease
    const handleQtyDecrease = useCallback(() => {
        //set minimum
        if (cartProduct.quantity === 1) {
            return
        }
        //
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1 };
        });
    }, [cartProduct])


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <div>image</div>
            <div className='flex flex-col gap-1 text-slate-500 text-sm '>
                {/* name */}
                <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
                <Horizontal />
                {/* description */}
                <div className='text-justify'>{product.description}</div>
                <Horizontal />
                {/*  */}
                <div>
                    <span className='font-semibold'>CATEGORY:{product.category}</span>
                </div>
                <div>
                    <span className='font-semibold'>Brand:{product.brand}</span>
                </div>
                <div className={product.quantity ? 'text-teal-400' : 'text-rose-400'}>{product.quantity ? `In stock: ${product.quantity}` : 'Out of stock'}
                </div>
                <Horizontal />
                <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
                <Horizontal />
                <SetQuantity cartProduct={cartProduct} handleQtyDecrease={handleQtyDecrease} handleQtyIncrease={handleQtyIncrease} />
                <Horizontal />
                <div>add to cart</div>
            </div>
        </div>
    )
}

export default ProductDetails

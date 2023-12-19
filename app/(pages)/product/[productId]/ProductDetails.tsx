'use client'
import Horizontal from '@/app/components/Horizontal';
import Button from '@/app/components/ui/product/Button';
import ProductImage from '@/app/components/ui/product/ProductImage';
import SetColor from '@/app/components/ui/product/SetColor';
import SetQuantity from '@/app/components/ui/product/SetQuantity';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { MdCheckCircle } from 'react-icons/md';

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


const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartProducts } = useCart()
    //log test
    // console.log(cartProducts)
    const [isProductInCart, setIsProductInCart] = useState(false)
    //
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    })
    const router = useRouter()
    //log
    // console.log(cartProduct);
    //useEffect
    useEffect(() => {
        setIsProductInCart(false)
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => {
                return item.id === product.id
            })
            if (existingIndex > -1) {
                setIsProductInCart(true)

            }
            // log test
            // console.log(existingIndex);
        }
    }, [cartProducts])

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
            {/* image */}
            <ProductImage product={product} cartProduct={cartProduct} handleColorSelect={handleColorSelect} ></ProductImage>
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
                {/* isProductInCart */}
                {isProductInCart ? (
                    <>
                        <p className='mb-2 text-slate-400 flex items-center gap-1'>
                            <MdCheckCircle className='text-teal-400' size={20}></MdCheckCircle>
                            <span>Product Added To Cart</span>
                        </p>
                        <div className='max-w-[300px]'>
                            <Button label='View Cart' outline onClick={() => { router.push('/cart') }} />
                        </div>
                    </>
                ) : (
                    <>
                        <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
                        <Horizontal />
                        <SetQuantity cartProduct={cartProduct} handleQtyDecrease={handleQtyDecrease} handleQtyIncrease={handleQtyIncrease} />
                        <Horizontal />
                        <div className='max-w-[300px]'>
                            <Button label='Add To Cart' onClick={() => handleAddProductToCart(cartProduct)} />
                        </div>
                    </>
                )}
            </div>
        </div >
    )
}

export default ProductDetails

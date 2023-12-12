'use client'
import { CartProductType, SelectedImgType } from '@/app/(pages)/product/[productId]/ProductDetails'
import React from 'react'
import Image from 'next/image'
//
interface ProductImageProps {
    cartProduct: CartProductType
    product: any
    handleColorSelect: (value: SelectedImgType) => void
}
//
const ProductImage: React.FC<ProductImageProps> = ({
    cartProduct,
    product,
    handleColorSelect
}) => {
    return (
        <div className='grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
            {/* small img */}
            <div className='flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>{product.images.map((image: SelectedImgType) => {
                return (<div key={image.color} onClick={() => handleColorSelect(image)} className={`relative w-[80%] aspect-square rounded border-teal-300 ${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'}`}>
                    <Image src={image.image} alt={image.color} fill className='object-contain'></Image>
                </div>)
            })}</div>
            {/* big img */}
            <div className='col-span-5 relative aspect-squzre'>
                <Image fill src={cartProduct.selectedImg.image} alt={cartProduct.name} className='w-full h-full object-contain max-h--[500px] min-h-[300px] sm:min-h-[400px]'></Image>
            </div>
        </div>
    )
}

export default ProductImage

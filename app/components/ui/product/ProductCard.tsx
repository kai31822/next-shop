'use client'
import React from 'react'
import Image from 'next/image'
import truncateText from '@/lib/truncateText'
import formatPrice from '@/lib/formatPrice'
import { useRouter } from 'next/navigation'

interface ProudctCardProps {
    data: any
}

const ProductCard: React.FC<ProudctCardProps> = ({ data }: ProudctCardProps) => {
    const router = useRouter()
    return (
        <div className='col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm' onClick={()=>router.push(`product/${data.Product_ID}`)}>
            <div className='flex flex-col items-center w-full gap-1'>
                {/* image */}
                <div className='aspect-square overflow-hidden relative w-full '>
                    <Image src={data.Image} alt={data.Product_name} fill></Image>
                </div>
                {/* text */}
                <div className='mt-4'>{truncateText(data.Product_name)}</div>
                {/*  */}
                <div className='mt-4' title={data.Product_description}>{truncateText(data.Product_description)}</div>
                {/*  */}
                <div></div>
                {/* price */}
                <div className='font-semibold'>{formatPrice(data.Price)}</div>
            </div>
        </div>
    )
}

export default ProductCard

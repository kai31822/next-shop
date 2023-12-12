'use client'
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { CiShoppingCart } from 'react-icons/ci'
import React from 'react'

const CartCount = () => {
    const { cartTotalQty } = useCart()
    const route = useRouter()
    return (
        <div className='relative cursor-pointer' onClick={() => { route.push('/cart') }}>
            <div className='text-3xl'>
                <CiShoppingCart></CiShoppingCart>
            </div>
            <span className='absolute top-[-10px] right-[-10px] bg-slate-600 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm'>
                {cartTotalQty}
            </span>
        </div>
    )
}

export default CartCount

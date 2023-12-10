'use client'
import Button from '@/app/components/ui/product/Button'
import Heading from '@/app/components/ui/product/Heading'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import ItemContent from './ItemContent'

const CartClient = () => {
    const { cartProducts } = useCart()
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className='flex flex-col items-center'>
                <div className='text-2xl'>Your cart is empty</div>
                <div>
                    <Link href={"/"} className='text-slate-500 flex items-center gap-1  mt-2 '>
                        <MdArrowBack></MdArrowBack>
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Heading title='Shopping Cart' center></Heading>
            {/* table head */}
            <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8'>
                <div className='justify-self-center'>PRODUCT</div>
                <div className='justify-self-center'>PRICE</div>
                <div className='justify-self-center'>QUANTITY</div>
                <div className='justify-self-end'>TOTAL</div>
            </div>
            {/* table body */}
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return <ItemContent key={item.id} item={item} />
                })}
            </div>
            {/* table foot */}
            <div className='border-t-[50px] border-slate-200 py-4 flex justify-between gap-4'>
                <div className='w-[90px]'>
                    <Button label='Clear Cart' onClick={() => { }} small outline></Button>
                </div>
                <div className='text-sm flex flex-col gap-1 items-start'>
                    <div className='flex justify-between w-full text-base font-semibold'>
                        <span>Subtotal</span>
                        <span>$1,000</span>
                    </div>
                    <p className='text-slate-500'>Taxes and shopping calculate at checkout</p>
                    <Button label='Checkout' onClick={() => { }}></Button>
                    {/*  */}
                    <Link href={"/"} className='text-slate-500 flex items-center gap-1  mt-2 '>
                        <MdArrowBack></MdArrowBack>
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartClient

'use client'
import Heading from '@/app/components/ui/product/Heading'
import React from 'react'
import moment from 'moment'
import { Rating } from '@mui/material'
import Avatar from '@/app/components/ui/product/Avatar'
//
interface ListRatingProps {
    product: any

}
//
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
    return (
        <div>
            <Heading title='Product Review' />
            <div className='test-sm mt-2'>
                {product.reviews && product.reviews.map((review: any) => {
                    return <div key={review.id} className='max-w-300px'>
                        {/*  */}
                        <div className='flex gap-2 items-center'>
                            {/* avatar */}
                            <Avatar src={review.user.image} />
                            <div className='font-semibold'>{review?.user.name}</div>
                            {/* moment */}
                            <div className='font-light'>{moment(review.createDate).fromNow()}</div>
                        </div>
                        {/*  */}
                        <div className='mt-2'>
                            <Rating value={review.rating} readOnly></Rating>
                            <div className='ml-2'>{review.comment}</div>
                        </div>
                        <hr className='mt-4 mb-4' />
                    </div>
                })}
            </div>
        </div>
    )
}

export default ListRating

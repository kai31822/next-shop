import React from 'react'
import Container from '../Container'
import FooterList from './FooterList'
import Link from 'next/link'
//icon
import { MdFacebook } from 'react-icons/md'
import { AiFillTwitterCircle, AiFillInstagram, AiFillYoutube } from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='bg-slate-700 text-slate-200 text-sm mt-16 '>
      <Container>
        <div className='flex flex-col md:flex-row justify-between pt-16  pb-8'>
          {/* col-1 */}
          <FooterList>
            <h3 className='text-base font-bold'>Shop Categories</h3>
            <Link href='#'>Phones</Link>
            <Link href='#'>Laptops</Link>
            <Link href='#'>Watches</Link>
            <Link href='#'>Accessories</Link>
          </FooterList>
          {/* col-2 */}
          <FooterList>
            <h3 className='text-base font-bold'>Shop Categories</h3>
            <Link href='#'>Contact Us</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Return & Exchanges</Link>
            <Link href='#'>FAQs</Link>
          </FooterList>
          {/* col-3 */}
          <div className='w-full md:w-1/3 mb-6 md:mb-0'>
            <h3 className='text-base font-bold'>About Us</h3>
            <p className='mb-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut praesentium similique cumque ea officia molestias, perferendis maiores. Error, quis quae!</p>
            <p>&copy; {new Date().getFullYear()} kai. All rights resvered.</p>
          </div>
          {/* col-4 */}
          <FooterList>
            <h3 className='text-base font-bold'>Follow Us</h3>
            <div className='flex gap-2'>
              <Link href='#'><MdFacebook size={24} /></Link>
              <Link href='#'><AiFillTwitterCircle size={24} /></Link>
              <Link href='#'><AiFillInstagram size={24} /></Link>
              <Link href='#'><AiFillYoutube size={24} /></Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </div>
  )
}

export default Footer

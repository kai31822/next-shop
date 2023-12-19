'use client'
import React from 'react'
import Container from '../Container'
import Link from 'next/link';
import AdminItem from './AdminItem'
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from 'react-icons/md'
import { usePathname } from 'next/navigation'

const AdminNav = () => {
    const pathname = usePathname()

    return (
        <div className='w-full shadow-sm top-20 border-b-[1px] pt-4'>
            <Container>
                <div className='flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap'>
                    {/* 1 */}
                    <Link href='/admin'>
                        <AdminItem label='Summary' icon={MdDashboard} selected={pathname === '/admin'}></AdminItem>
                    </Link>
                    {/* 2 */}
                    <Link href='/admin/addproduct'>
                        <AdminItem label='Add Product' icon={MdLibraryAdd} selected={pathname === '/admin/addproduct'}></AdminItem>
                    </Link>
                    {/* 3 */}
                    <Link href='/admin/manage-products'>
                        <AdminItem label='Manage Product' icon={MdDns} selected={pathname === '/admin/manageproduct'}></AdminItem>
                    </Link>
                    {/* 4 */}
                    <Link href='/admin/manageorders'>
                        <AdminItem label='Manage Orders' icon={MdFormatListBulleted} selected={pathname === '/admin/manageorders'}></AdminItem>
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default AdminNav

'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
//link
import Link from 'next/link';
//ui
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Container from './Container';
import { Roboto } from 'next/font/google';
//font
const roboto = Roboto({ subsets: ['latin'], weight: ['300'] })

const Navbar = () => {
    const links = [
        { label: '配件', href: '/product' },
        { label: '產品情報', href: '/about' },
        { label: '門市資訊', href: '/storeinformation' },
    ];
    const currentPath = usePathname();

    return (

        <div className='sticky top-0 w-full z-10 shadow-sm bg-slate-200'>
            {/* advertisement*/}
            <div className='px-20 py-2 text-center bg-red-600 text-white font-semibold'>
                新品上市特別優惠!!!
            </div>
            {/* <nav className='fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'> */}
            <Container>
                <nav className='dark:border-gray-700'>
                    <div className='  flex flex-wrap items-center justify-between gap-3 md:gap-0'>
                        <Link href='/' className={`${roboto.className} font-bold text-2xl`}>Logo</Link>

                        <div className='hidden  sm:block'>
                            <ul className='flex space-x-6 '>
                                {/* dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger>依型號購買</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator /> */}
                                        <DropdownMenuItem>分類1</DropdownMenuItem>
                                        <DropdownMenuItem>分類2</DropdownMenuItem>
                                        <DropdownMenuItem>分類3</DropdownMenuItem>
                                        <DropdownMenuItem>分類4</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {/*  */}
                                {/* link */}
                                {links.map(link => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className={clsx({
                                                'text-teal-500': link.href === currentPath,
                                                'text-zinc-500': link.href !== currentPath,
                                                'hover:text-lime-500 transition-colors': true,
                                            })}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* cart / user */}
                        <div className='flex items-center gap-8 md:gap-12'>
                            <Link href='/cart'>Cartcount</Link>
                            <h1>UserMenu</h1>
                        </div>
                    </div>
                </nav >
            </Container>


        </div>

    );
};

export default Navbar;

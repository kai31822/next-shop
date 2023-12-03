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

const Navbar = () => {
    const links = [
        { label: '配件', href: '/proudect' },
        { label: '產品情報', href: '/about' },
        { label: '門市資訊', href: '/storeinformation' },
    ];
    const currentPath = usePathname();

    return (

        <div>
            {/* advertisement*/}
            <div className='px-20 py-2 text-center bg-red-600 text-white font-semibold'>
                新品上市特別優惠!!!
            </div>
            {/* <nav className='fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'> */}
            <nav className='dark:border-gray-700'>
                <div className='max-w-screen-xl  flex flex-wrap items-center justify-between  mx-auto p-4'>
                    <Link href='/'>Logo</Link>
                    <div className='hidden sm:ml-6 sm:block'>
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
                </div>
            </nav >
        </div>

    );
};

export default Navbar;

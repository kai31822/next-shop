'use client'
import React, { useCallback, useState } from 'react'
import Avatar from '../product/Avatar'
import { AiFillCaretDown } from 'react-icons/ai'
import Link from 'next/link'
import MenuItem from './MenuItem'
import { signOut } from 'next-auth/react'
import BackDrop from './BackDrop'
import { safeUser } from '@/lib/types'
//
interface UserMenuProps {
    currentUser: safeUser | null
}
//

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    //
    const [isOpen, setIsOpen] = useState(false)
    //
    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    return (
        <>
            <div className='relative z-30'>
                <div onClick={toggleOpen} className='p-2 border-[1px] border-slate-300 flex flex-row items-center justify-center gap-1  rounded-full cursor-pointer hover:shadow-md transition text-slatet-700'>
                    <Avatar src={currentUser?.image}></Avatar>
                    <AiFillCaretDown></AiFillCaretDown>
                </div>
                {/* open ! */}
                {isOpen && (
                    <div className='absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0  top-12 text-sm flex flex-col cursor-pointer'>
                        {/*  */}
                        {currentUser ?
                            <div>
                                <Link href='orders'>
                                    <MenuItem onClick={() => { }}>
                                        <div onClick={toggleOpen}>Your Orders</div>
                                    </MenuItem>
                                </Link>
                                <Link href='/admin'>
                                    <MenuItem onClick={() => { }}>
                                        <div onClick={toggleOpen}>Admin Dashboard</div>
                                    </MenuItem>
                                </Link>
                                <hr />
                                {/* log out */}
                                <MenuItem onClick={() => { }}>
                                    <div onClick={() => {
                                        toggleOpen()
                                        signOut()
                                    }
                                    }>Logout</div>
                                </MenuItem>
                            </div> :
                            < div >
                                <Link href='/login'>
                                    <MenuItem onClick={() => { }}>
                                        <div onClick={toggleOpen}>Login</div>
                                    </MenuItem>
                                </Link>
                                <Link href='/register'>
                                    <MenuItem onClick={() => { }}>
                                        <div onClick={toggleOpen}>Register</div>
                                    </MenuItem>
                                </Link>
                            </div>
                        }
                    </div>
                )}
            </div >
            {/* BackDrop ! */}
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    )
}

export default UserMenu

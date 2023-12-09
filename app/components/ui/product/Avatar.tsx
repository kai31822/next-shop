import React from 'react'
import Image from 'next/image'
//https://react-icons.github.io/react-icons/
import { FaUserCircle } from 'react-icons/fa'
//
interface AvatarProps {
    src?: string | null | undefined
}
//
const Avatar: React.FC<AvatarProps> = ({ src }) => {
    if (src) {
        return <Image src={src} alt='Avatar' className='rounded-full ' width={30} height={30} />
    }
    return (
        <FaUserCircle></FaUserCircle>
    )
}

export default Avatar

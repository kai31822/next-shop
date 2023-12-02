'use client';
import React from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Profile = () => {
    // const router = useRouter();
    // console.log(router);

    return (
        <div>
            <h1>my list of profiles</h1>
            <div>
                <ul>
                    <li>
                        <Link href={'/profile/1'}>Profile 1</Link>
                    </li>
                    {/* <li onClick={() => router.push('/profile/2')}>Profile 2</li> */}
                    <li>
                        <Link href={'/profile/2'}>Profile 2</Link>
                    </li>
                    <li>
                        <Link href={{ pathname: '/profile/3', query: { userName: 'user3' } }}>Profile 3</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;

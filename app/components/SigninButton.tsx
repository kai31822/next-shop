'use client';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const SigninButton = () => {
    const { data: session } = useSession();

    // console.log(session?.user);

    if (session && session.user) {
        return (
            <div className='flex gap-4 ml-auto'>
                <p className='text-sky-600'>
                    {session.user.name !== '' ? <UserAccountNav user={session.user} /> : <Link href='/dashboard'>{session.user.email}</Link>}
                </p>
                <button className='text-red-600' onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        );
    }

    return (
        <button className='text-green-600 ml-auto' onClick={() => signIn()}>
            Sign In
        </button>
    );
};

export default SigninButton;

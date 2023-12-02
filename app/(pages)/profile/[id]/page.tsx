'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ProfileID = () => {
    const params = useParams();

    return (
        <div>
            <h1>Profile page id: {params.id}</h1>
            <div>
                <Link href={'/profile'}>Back to main page</Link>
            </div>
        </div>
    );
};

export default ProfileID;

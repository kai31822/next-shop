'use client';
import React from 'react';
import { useParams } from 'next/navigation';

const IdPostPage = () => {
    const params = useParams();
    console.log(params.id);
    console.log(params.postId);
    return <div>IdPostPage</div>;
};

export default IdPostPage;

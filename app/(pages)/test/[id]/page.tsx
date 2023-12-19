//client
'use client';
import { useState, useEffect } from 'react';

type Post = {
    title?: string;
    description?: string;
};

const test = ({ params }: any) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    //get post
    const getPostById = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/posts/${params.id}`, {
                method: 'GET',
                next: {
                    revalidate: 5000,
                },
            });
            // debugger
            if (response) {
                const { post } = await response.json();
                if (post) setPost(post);
                //test
                // console.log(post);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getPostById();
    }, []);
    return (
        <div>
            {loading && <div>Loading...</div>}
            <div>
                {post && <h1>{post.title}</h1>}
                {post && <p>{post.description}</p>}
            </div>
        </div>
    );
};

export default test;
function async(id: any) {
    throw new Error('Function not implemented.');
}

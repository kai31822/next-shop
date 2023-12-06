'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
//ui
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
//for fetch data
type Product = {
    Product_ID?: string;
    Product_name?: string;
    Product_description?: string;
    Price?: number;
    Image?: string;
    Product_quantity?: number;
    categoryId?: number;
};

const AllProduct = () => {
    const router = useRouter()
    //check loading...
    const [loading, setLoading] = useState(false);
    //fetch data
    // const fetchDataFromApi = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch('/api/users', {
    //             headers: {
    //                 Accept: 'application/json',
    //                 method: 'GET',
    //             },
    //         });
    //         if (response) {
    //             const data = await response.json();
    //             console.log(data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    //fetch fake data
    const [data, setData] = useState<Product[] | undefined>();
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);
    if (loading) return <p>Loading...</p>;

    return (
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 gap-8 md:grid-cols-2 sm:grid-cols-1'>
            {data?.map(d => (
                <Card key={d.Product_ID} className='flex flex-col justify-between' >
                    <CardHeader className='flex-row gap-4 items-center '>
                        {/* avatar */}
                        <Avatar>
                            <AvatarImage src={`${d.Image ?? "./img/201992.jpg"} `} alt='product img' />
                            <AvatarFallback>{d.Product_name?.slice(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div>
                            <CardTitle>{d.Product_name}</CardTitle>
                            <CardDescription>description:{d.Product_description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>price:{d.Price}</p>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                        <Button onClick={() => router.push(`product/${d.Product_ID}`)}>view detail</Button>
                        <Badge variant='outline'>detail</Badge>
                    </CardFooter>
                </Card>
            ))}
            {/* <button onClick={fetchDataFromApi}>click</button> */}
        </div>
    );
};

export default AllProduct;

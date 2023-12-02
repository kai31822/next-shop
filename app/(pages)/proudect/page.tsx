'use client';
import React from 'react';
import { useState, useEffect } from 'react';
//ui
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
//for fetch fake data
type Product = {
    id?: number;
    product_name?: string;
    price?: number;
    description?: string;
};

const AllProduct = () => {
    //check loading...
    const [loading, setLoading] = useState(false);
    //fetch data
    const fetchDataFromApi = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/users', {
                headers: {
                    Accept: 'application/json',
                    method: 'GET',
                },
            });
            if (response) {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    //fetch fake data
    const [data, setData] = useState<Product[] | undefined>();
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:4000/product')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);
    if (loading) return <p>Loading...</p>;
    return (
        <div className='grid grid-cols-3 gap-8'>
            {data?.map(d => (
                <Card key={d.id} className='flex flex-col justify-between'>
                    <CardHeader className='flex-row gap-4 items-center '>
                        {/* avatar */}
                        <Avatar>
                            <AvatarImage src={`./img/201992.jpg`} alt='product img' />
                            <AvatarFallback>{d.product_name?.slice(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div>
                            <CardTitle>{d.product_name}</CardTitle>
                            <CardDescription>description:{d.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>price:{d.price}</p>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                        <Button>view detail</Button>
                        <Badge variant='outline'>detail</Badge>
                    </CardFooter>
                </Card>
            ))}
            {/* <button onClick={fetchDataFromApi}>click</button> */}
        </div>
    );
};

export default AllProduct;

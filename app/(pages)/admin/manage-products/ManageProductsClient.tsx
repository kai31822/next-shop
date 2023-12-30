'use client'
import { Product } from '@/prisma/prisma-generated/client'
import React, { useCallback } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import formatPrice from '@/lib/formatPrice'
import Heading from '@/app/components/ui/product/Heading'
import Status from '@/app/components/ui/product/Status'
import { MdCached, MdClose, MdDelete, MdDone, MdRemove, MdRemoveRedEye } from 'react-icons/md'
import ActionButton from '@/app/components/ui/product/ActionButton'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { constants } from 'buffer'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import firebaseApp from '@/lib/firebase'

export type Pd = {
    id: string;
    name: string;
    email: string | null;
    password: string;
    address: string | null;
    phone: number | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}
interface ManageProductsClientProps {
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
    products
}) => {
    //
    const route = useRouter()
    const storage = getStorage(firebaseApp)
    let rows: any = []
    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.categoryId,
                brand: product.brand,
                inStock: product.inStock,
                image: product.image
            }
        })
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'price', headerName: 'Price(NTD)', width: 100, renderCell: (params) => {
                return (<div className='font-bold text-slate-800'>
                    {params.row.price}
                </div>)
            }
        },
        { field: 'category', headerName: 'Category', width: 120 },
        { field: 'brand', headerName: 'Brand', width: 120 },
        {
            field: 'inStock', headerName: 'InStock', width: 120, renderCell: (params) => {
                return (<div >
                    {params.row.inStock === true ? <Status text='in stock' icon={MdDone} bg='bg-teal-200' color='text-teal-700' /> : <Status text='out of stock' icon={MdClose} bg='bg-rose-200' color='text-rose-700' />}
                </div>)
            }
        },
        {
            field: 'action', headerName: 'Action', width: 200, renderCell: (params) => {
                return (<div className='flex justify-between gap-4 w-full'>
                    <ActionButton icon={MdCached} onClick={() => { handleToggleStock(params.row.id, params.row.inStock) }} />
                    <ActionButton icon={MdDelete} onClick={() => { handleDelete(params.row.id,params.row.image)}} />
                    <ActionButton icon={MdRemoveRedEye} onClick={() => {route.push(`product/${params.row.id}`) }} />
                </div>)
            }
        },
    ]

    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put('/api/products', {
            id,
            inStock: !inStock
        }).then((res) => {
            toast.success('Product status changed')
            route.refresh()
        }).catch((err) => {
            toast.error('oops! Something went wrong')
            console.log(err);

        })
    }, [])

    const handleDelete = useCallback(async (id: string, image: any[]) => {
        toast('Deleting product, please wait!')
        const handleImageDelete = async () => {
            try {
                for (const item of image) {
                    if (item.image) {
                        const imageRef = ref(storage, item.image)
                        await deleteObject(imageRef)
                        console.log('image deleted', item.image);

                    }
                }
            } catch (error) {
                return console.log("Delete images error", error);

            }
        }
        await handleImageDelete()
        axios.delete(`/api/products/${id}`).then((res) => {
            toast.success('Product deleted')
            route.refresh()
        }).catch((err) => {
            toast.error('Failed to delete product')
            console.log(err);

        })
    }, [])


    //
    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className='mb-4 mt-8'>
                <Heading title='Manage Products' center></Heading>
            </div>
            {/* <div className='h-[600px] w-[100%]'></div> */}
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 9 },
                    },
                }}
                pageSizeOptions={[9, 20]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    )
}

export default ManageProductsClient

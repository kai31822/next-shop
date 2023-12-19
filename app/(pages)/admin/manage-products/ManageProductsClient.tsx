'use client'
import { Product } from '@/prisma/prisma-generated/client'
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import formatPrice from '@/lib/formatPrice'

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
        { field: 'id', headerName: 'Id', width: 220 },
        { field: 'name', headerName: 'Name', width: 220 },
        {
            field: 'price', headerName: 'Price(NTD)', width: 100, renderCell: (params) => {
                return (<div className='font-bold text-slate-800'>
                    {params.row.price}
                </div>)
            }
        },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        {
            field: 'inStock', headerName: 'InStock', width: 150, renderCell: (params) => {
                return (<div >
                    {params.row.inStock === true ? 'in stock' : ' out of stock'}
                </div>)
            }
        },
        {
            field: 'action', headerName: 'Action', width: 200, renderCell: (params) => {
                return (<div >
Action
                </div>)
            }
        },
    ]
    //
    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )
}

export default ManageProductsClient

'use client'
import { Order, User } from '@/prisma/prisma-generated/client'
import React, { useCallback } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import formatPrice from '@/lib/formatPrice'
import Heading from '@/app/components/ui/product/Heading'
import Status from '@/app/components/ui/product/Status'
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md'
import ActionButton from '@/app/components/ui/product/ActionButton'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import moment from 'moment'

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
interface ManageOrdersClientProps {
    orders: ExtendedOrder[]
}
type ExtendedOrder = Order & {
    user: User
}

const ManageOrderClient: React.FC<ManageOrdersClientProps> = ({
    orders
}) => {
    //
    const route = useRouter()
    let rows: any = []

    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createdAt).fromNow(),
                deliverStatus: order.deliverStatus,
            }
        })
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'customer', headerName: 'Customer Name', width: 130 },
        {
            field: 'amount', headerName: 'Amount(NTD)', width: 100, renderCell: (params) => {
                return (<div className='font-bold text-slate-800'>
                    {params.row.amount}
                </div>)
            }
        },
        //
        {
            field: 'paymentStatus', headerName: 'Payment Status', width: 120, renderCell: (params) => {
                return (<div >
                    {params.row.paymentStatus === "pending" ?
                        <Status text='pending' icon={MdAccessTimeFilled} bg='bg-teal-200' color='text-teal-700' />
                        : params.row.paymentStatus === "complete" ? (
                            <Status text='complete' icon={MdDone} bg='bg-green-200' color='text-green-700' />
                        ) : (
                            <></>
                        )}
                </div>)
            }
        },

        //
        {
            field: 'deliverStatus', headerName: 'Deliver Status', width: 120, renderCell: (params) => {
                return (<div >
                    {params.row.deliverStatus === "pending" ?
                        <Status text='pending' icon={MdAccessTimeFilled} bg='bg-teal-200' color='text-teal-700' />
                        : params.row.deliverStatus === "dispatched" ? (
                            <Status text='dispatched' icon={MdDeliveryDining} bg='bg-purple-200' color='text-purple-700' />
                        ) : params.row.deliverStatus === "delivered" ? (
                            <Status text='delivered' icon={MdDone} bg='bg-green-200' color='text-green-700' />
                        ) : (
                            <></>
                        )}
                </div>)
            }
        },
        { field: 'date', headerName: 'Date', width: 120 },
        //
        {
            field: 'action', headerName: 'Action', width: 200, renderCell: (params) => {
                return (<div className='flex justify-between gap-4 w-full'>
                    <ActionButton icon={MdDeliveryDining} onClick={() => { handleDispatch(params.row.id) }} />
                    <ActionButton icon={MdDone} onClick={() => { handleDeliver(params.row.id) }} />
                    <ActionButton icon={MdRemoveRedEye} onClick={() => { route.push(`/order/${params.row.id}`) }} />
                </div>)
            }
        },
    ]
    //
    const handleDispatch = useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            deliverStatus: 'dispatched'
        }).then((res) => {
            toast.success('Order Dispatched')
            route.refresh()
        }).catch((err) => {
            toast.error('oops! Something went wrong')
            console.log(err);
        })
    }, [])
    //
    const handleDeliver = useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            deliverStatus: 'delivered'
        }).then((res) => {
            toast.success('Order Delivered')
            route.refresh()
        }).catch((err) => {
            toast.error('oops! Something went wrong')
            console.log(err);
        })
    }, [])


    //
    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className='mb-4 mt-8'>
                <Heading title='Manage Orders' center></Heading>
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

export default ManageOrderClient

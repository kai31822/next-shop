"use client"
import React from 'react'
import type { Metadata } from 'next';
import AdminNav from '@/app/components/ui/admin/AdminNav';

export const matadata: Metadata = {
    title: 'Shop Admin',
    description: 'Shop Admin DashBoard',
    openGraph: {
        title: 'Shop Admin',
        description: 'Admin DashBoard',
      },
}

const Adminlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div>
                <AdminNav></AdminNav>
            </div>
            <div>{children}</div>
        </div>
    )
}

export default Adminlayout

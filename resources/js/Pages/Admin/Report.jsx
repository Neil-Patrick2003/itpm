import React from 'react'
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
const AdminDashboard = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Users" />
            <h1 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-gray-100">Analytics</h1>


        </AuthenticatedLayout>
    )
}

export default AdminDashboard

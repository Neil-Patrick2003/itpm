import React from 'react'
import {Head, Link} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
const AdminDashboard = () => {
    return (
        <AuthenticatedLayout

        >
            <Head title="Users" />

            <div className="p-4 h-screen p-4">
                <div className="flex flex-col h-full gap-4">
                    <div className="bg-white h-28 rounded-lg p-4">
                        <h1>Childrens Record</h1>
                    </div>
                    <div className="flex justify-between p-4">
                        back
                        <Link href="/childrens/create">Add new Record</Link>
                    </div>
                    <div className="bg-white h-full rounded-lg p-4">

                        <div></div>
                    </div>
                </div>


            </div>
        </AuthenticatedLayout>
    )
}

export default AdminDashboard

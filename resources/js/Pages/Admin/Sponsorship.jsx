import React, { useState } from 'react'
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';



const AdminDashboard = () => {
    const [isAddSponsorOpen, setIsSponsorOpen] = useState(false);
    const openAddSponsor = () => setIsSponsorOpen(true);
    const closeAddSponsor = () => setIsSponsorOpen(false);
    return (
        <AuthenticatedLayout>
            <Head title="Sponsors" />

            <div className='flex flex-col  w-full h-screen gap-2 sm:p-4 md:p-6'>
                <div className='h-28 sm:p-4 md:p-6 lg:p8 bg-white'>
                    <h1>Sponsorship</h1>
                </div>
                <div className='sm:p-4 md:p-6 lg:p8 bg-white h-full'>
                    All sponsor
                    <button onClick={openAddSponsor}>Add Sponsor</button>
                </div>
                <Modal show={isAddSponsorOpen} onClose={closeAddSponsor} maxWidth="2xl" closable={true}>
                    <div className='sm:p-2 md:p-4 lg:p-6'>
                        <h1 className='text-center'>Add Sponsor</h1>
                        <div>
                            <form action="">
                                <input type="text" />
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
            
        </AuthenticatedLayout>
    )
}

export default AdminDashboard
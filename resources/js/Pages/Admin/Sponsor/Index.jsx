import React, { useState } from 'react'
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';



const AdminDashboard = ({ sponsors }) => {
    const [isAddSponsorOpen, setIsSponsorOpen] = useState(false);
    const openAddSponsor = () => setIsSponsorOpen(true);
    const closeAddSponsor = () => setIsSponsorOpen(false);

    
    return (
        <AuthenticatedLayout>
            <Head title="Sponsors" />
            <div className='flex flex-col  w-full h-screen gap-2 sm:p-4 md:p-6'>
                <div className='flex flex-row justify-between h-28 sm:p-4 md:p-6 lg:p8 bg-white'>
                    <div>
                        <h1 className='sm:text-lg md:text-xl lg:text-2xl'>Sponsorship</h1>
                    </div>
                    <div>
                        <Link href='/sponsorships/create'>Add Sponsor</Link>
                    </div>
                </div>
                <div className='overflow-x-auto sm:p-4 md:p-6 lg:p8 bg-white h-full'>
                    All sponsor
                    <ul>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {sponsors.data.map(sponsor => (
                                <li key={sponsor.id}>
                                    <div className='flex border h-24 p-2 gap-2 rounded-md'>
                                        <div className='border rounded-full size-12'>Logo</div>
                                        <Link href={`/sponsorships/${sponsor.id}`}>
                                            <div className='flex flex-col'>
                                                <p className='font-bold text-lg'>{sponsor.name}</p>
                                                <span className='text-xs text-gray-600'>
                                                    {new Date(sponsor.created_at).toLocaleDateString('en-GB')}
                                                </span>                                        
                                            </div>  
                                        </Link>
                                        
                                    </div>
                                </li>
                            ))}
                        </div>
                        
                    </ul>
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
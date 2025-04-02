import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Show = ({ sponsor }) => {
  return (
    <AuthenticatedLayout>
        <div className='p-6'>
            <div className='bg-white h-screen'>
                <h1>Edit Sponsorship by {sponsor.name}</h1>
            </div>

        </div>
    </AuthenticatedLayout>
  )
}

export default Show

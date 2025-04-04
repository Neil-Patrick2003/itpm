import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';



const Show = ({ sponsor }) => {

  const { flash } = usePage().props; 
  return (
    <AuthenticatedLayout>
      
        <div className='p-4'>
        <FlashMessage/>  
            <div className='bg-white h-screen p-2 md:p-4 lg:p-6'>
              <center>
                <p className='text-center text-gray-600 font-semi-bold text-lg md:textxl lg:text-2xl'>{sponsor.name}</p>
                <p>Become a sponsor at {new Date(sponsor.created_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}</p>

              </center>
              <div>
                      <Link href={`/sponsorships/${sponsor.id}/donation`}>Add Sponsor</Link>
              </div>
                
              <div className='flex border p-2 gap-4 mt-12'>
                <div className='h-24 w-24 rounded-full border'>logo</div>
                <div className='flex flex-col gap-2 '>
                  <h1 >{sponsor.name}</h1>
                  <h2>{sponsor.email}</h2>
                  <h2>{sponsor.phone_number}</h2>
                </div>
              </div>
          
            </div>
        </div>
    </AuthenticatedLayout>
  )
}
export default Show

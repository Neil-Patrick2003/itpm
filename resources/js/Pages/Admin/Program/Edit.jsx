import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

const Edit = ( {program} ) => {
  return (
    <AuthenticatedLayout>
      <div className='h-screen'>
        <div className="">
          <div className="w-full mb-2 pt-6 sm:px-4 md:px-6">
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                    All Programs
                  </div>
              </div>
          </div>
          <div className="w-full h-full sm:px-4 md:px-6">
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                  <div className="p-6 text-gray-600">
                    <h1 className='font-bold text-green-600 text-xl'>Program: {program.title}.</h1>
                    <p className='mt-2 text-gray-600'>Description: {program.description}</p>
                    <hr/>
                    <div className='flex justify-between'>
                      <h1 className='font-bold text-lg'>Benificiaries</h1>
                      <button>Add Children</button>
                    </div>
                    

                    


                  </div>
              </div>
          </div>
        </div>
      </div>
      
    </AuthenticatedLayout>
  )
}

export default Edit

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import {IoPersonAddSharp} from "react-icons/io5";

const Edit = ( {program} ) => {
  return (
    <AuthenticatedLayout>
      <div className='h-screen py-4'>

          <div className="w-full">
              <div className="overflow-hidden h-28 bg-white shadow-sm dark:bg-gray-800">
                  <div className="p-6 text-gray-900 dark:text-gray-100">

                      <div className='flex justify-between'>
                          <h1>All Programs</h1>

                          <a href="/programs/create" className="text-green-600 hover:underline">
                              <button
                                  type="button"
                                  className="flex items-center justify-center bg-[#01DAA2] text-white rounded-full w-16 h-16 shadow-lg hover:bg-green-500 focus:outline-none transition-colors duration-300"
                              >
                                  <IoPersonAddSharp className="text-white text-2xl" />
                              </button>
                          </a>
                      </div>
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

    </AuthenticatedLayout>
  )
}

export default Edit

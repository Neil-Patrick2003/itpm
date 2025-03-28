import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

const Program = () => {
  return (
    
    <AuthenticatedLayout>
        <div className='flex w-full gap-2 h-screen sm:p-4 md:p-6'>
            <div className="overflow-hidden w-3/4 bg-white border shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    All Program
                    <div className='flex justify-end'>
                        <button>Create Program</button>
                    </div>
                    
                </div>
                

            </div>
            <div className="overflow-hidden w-1/4 bg-white border shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    Incoming Program
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default Program

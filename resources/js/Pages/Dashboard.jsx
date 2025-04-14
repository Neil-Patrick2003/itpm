import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {ChevronRightIcon, HomeIcon} from "@heroicons/react/20/solid/index.js";
import React from "react";
import {UserGroupIcon} from "@heroicons/react/16/solid";


export default function Dashboard({user, recordCount, underweightCount, normalCount, overweight_andObeseCount}) {



    return (
         <AuthenticatedLayout>
             <div className="flex flex-col h-screen">
                 <nav className="flex" aria-label="Breadcrumb">
                     <ol className="flex items-center space-x-4">
                         <li>
                             <Link href="/dasboard" className="flex gap-2 text-gray-400 hover:text-gray-500">
                                 <HomeIcon className="h-5 w-5" />
                                 <span className="">Dashboard</span>
                             </Link>
                         </li>
                     </ol>
                 </nav>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     <div className="flex justify-between items-center p-6 rounded-xl bg-gradient-to-br from-red-300 to-red-400 shadow-md">
                         {/* Left side: Text section */}
                         <div>
                             <p className="text-white text-sm font-medium">Total Records</p>
                             <h1 className="text-3xl font-bold text-white mt-1">{recordCount}</h1>
                         </div>


                         {/* Right side: Icon */}
                         <div className="bg-white/20 p-3 rounded-full">
                             <UserGroupIcon className="h-10 w-10 text-white" />
                         </div>
                     </div>
                     <div className="flex justify-between items-center p-6 rounded-xl bg-gradient-to-br from-green-300 to-green-400 shadow-md">
                         {/* Left side: Text section */}
                         <div>
                             <p className="text-white text-sm font-medium">Under Weight</p>
                             <h1 className="text-3xl font-bold text-white mt-1">{underweightCount}</h1>
                         </div>


                         {/* Right side: Icon */}
                         <div className="bg-white/20 p-3 rounded-full">
                             <UserGroupIcon className="h-10 w-10 text-white" />
                         </div>
                     </div>
                     <div className="flex justify-between items-center p-6 rounded-xl bg-gradient-to-br from-blue-300 to-blue-400 shadow-md">
                         {/* Left side: Text section */}
                         <div>
                             <p className="text-white text-sm font-medium">Total Records</p>
                             <h1 className="text-3xl font-bold text-white mt-1">{normalCount}</h1>
                         </div>


                         {/* Right side: Icon */}
                         <div className="bg-white/20 p-3 rounded-full">
                             <UserGroupIcon className="h-10 w-10 text-white" />
                         </div>
                     </div>
                     <div className="flex justify-between items-center p-6 rounded-xl bg-gradient-to-br from-violet-300 to-violet-400 shadow-md">
                         {/* Left side: Text section */}
                         <div>
                             <p className="text-white text-sm font-medium">Total Records</p>
                             <h1 className="text-3xl font-bold text-white mt-1">{recordCount}</h1>
                         </div>


                         {/* Right side: Icon */}
                         <div className="bg-white/20 p-3 rounded-full">
                             <UserGroupIcon className="h-10 w-10 text-white" />
                         </div>
                     </div>
                 </div>
                 <div className="flex justify-between items-center space-x-4">
                     Top Sponsors
                 </div>
             </div>







         </AuthenticatedLayout>
     )



}

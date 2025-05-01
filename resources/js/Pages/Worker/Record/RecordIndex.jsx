// import React, { useEffect, useState } from 'react';
// import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
// import { Head, Link, router } from "@inertiajs/react";
// import { debounce } from "lodash";
// import { ClipLoader } from 'react-spinners';
// import { motion, AnimatePresence } from 'framer-motion';
//
// const RecordIndex = ({ records, search = '', page = 1 }) => {
//     const [searchTerm, setSearchTerm] = useState(search || '');
//     const [loading, setLoading] = useState(false);
//
//     const calculateAge = (birth_date) => {
//         const birth = new Date(birth_date);
//         const today = new Date();
//         let age = today.getFullYear() - birth.getFullYear();
//         const m = today.getMonth() - birth.getMonth();
//         if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//             age--;
//         }
//         return age;
//     };
//
//     useEffect(() => {
//         if (search) setSearchTerm(search);
//     }, [search]);
//
//     const handleSearchTermChange = (value) => {
//         setSearchTerm(value);
//         setLoading(true);
//
//         debounce(() => {
//             router.get('/health_workers/records', { page, search: value }, {
//                 preserveState: true,
//                 replace: true,
//                 onFinish: () => setLoading(false),
//             });
//         }, 50)();
//     };
//
//     return (
//         <WorkerLayout>
//             <Head title="Records" />
//             <div className="p-4 min-h-screen">
//
//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//                     <div>
//                         <h1 className="text-lg font-semibold text-gray-900">Records</h1>
//                         <p className="mt-1 text-sm text-gray-700">All child monitoring records listed below.</p>
//                     </div>
//
//                     <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
//                         <motion.input
//                             initial={{ opacity: 0, x: 10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.4 }}
//                             value={searchTerm}
//                             type="text"
//                             placeholder="Search..."
//                             className="border-2 border-green-500 rounded-full h-10 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 w-full sm:w-64"
//                             onChange={(e) => handleSearchTermChange(e.target.value)}
//                         />
//                         <Link
//                             href="/health_workers/records/create"
//                             className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-green-500"
//                         >
//                             Add Record
//                         </Link>
//                     </div>
//                 </div>
//
//                 {/* Loading */}
//                 {loading && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="flex justify-center py-10"
//                     >
//                         <ClipLoader size={40} color="#22c55e" />
//                     </motion.div>
//                 )}
//
//                 {/* Empty State */}
//                 {!loading && records.data.length === 0 && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.4 }}
//                         className="text-center py-20 text-gray-500 border border-dashed border-gray-300 rounded-md"
//                     >
//                         <p className="text-lg font-medium mb-2">No records found</p>
//                         <p className="text-sm">Try adjusting your search terms or add a new record.</p>
//                     </motion.div>
//                 )}
//
//                 {/* Table */}
//                 {!loading && records.data.length > 0 && (
//                     <div className="overflow-x-auto rounded-md">
//                         <div className="inline-block min-w-full py-2 align-middle">
//                             <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
//                                 <table className="min-w-full divide-y divide-gray-300">
//                                     <thead className="bg-gray-50">
//                                     <tr>
//                                         {["Date", "Name", "Age", "Height (cm)", "Weight (kg)", "Gender", "Address", "Guardian", "Contact Number", "Action"]
//                                             .map((title) => (
//                                                 <th key={title} className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
//                                                     {title}
//                                                 </th>
//                                             ))}
//                                     </tr>
//                                     </thead>
//                                     <tbody className="bg-white divide-y divide-gray-200">
//                                     <AnimatePresence>
//                                         {records.data.map((record, index) => (
//                                             <motion.tr
//                                                 key={record.id}
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: 10 }}
//                                                 transition={{ delay: index * 0.03 }}
//                                                 className="hover:bg-green-50"
//                                             >
//                                                 <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(record.created_at).toLocaleDateString('en-GB')}</td>
//                                                 <td className="px-4 py-4 text-sm font-medium text-gray-600 whitespace-nowrap">{record.children_name}</td>
//                                                 <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{calculateAge(record.birth_date)}</td>
//                                                 <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.height}</td>
//                                                 <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.weight}</td>
//                                                 <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.gender}</td>
//                                                 <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.address}</td>
//                                                 <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.parent_name}</td>
//                                                 <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.phone_number}</td>
//                                                 <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
//                                                     <Link
//                                                         href={`/health_workers/records/${record.id}`}
//                                                         className="text-indigo-600 hover:text-indigo-900"
//                                                     >
//                                                         Edit
//                                                     </Link>
//                                                 </td>
//                                             </motion.tr>
//                                         ))}
//                                     </AnimatePresence>
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//
//                 {/* Pagination */}
//                 <div className="flex justify-end gap-2 px-4 py-4">
//                     {records.links.map((link) =>
//                         link.url ? (
//                             <Link
//                                 key={link.label}
//                                 href={link.url}
//                                 className={`px-4 py-2 text-sm font-medium rounded-md border border-gray-300 shadow-md transition-all duration-200
//                                     ${link.active
//                                     ? "bg-green-600 text-white font-bold hover:bg-green-500"
//                                     : "bg-white text-gray-700 hover:bg-green-50"
//                                 }`}
//                                 dangerouslySetInnerHTML={{ __html: link.label }}
//                             />
//                         ) : (
//                             <span
//                                 key={link.label}
//                                 className="px-4 py-2 text-sm font-medium text-slate-400 bg-white border border-gray-300 shadow-md rounded-md cursor-not-allowed"
//                                 dangerouslySetInnerHTML={{ __html: link.label }}
//                             />
//                         )
//                     )}
//                 </div>
//             </div>
//         </WorkerLayout>
//     );
// };
//
// export default RecordIndex;


import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import React from "react";
import {Link} from "@inertiajs/react";
import {DocumentPlusIcon} from "@heroicons/react/16/solid/index.js";

const RecordIndex = ( {programs} ) => {
    return (
        <WorkerLayout>
            <div className="p-4">
                <h1 className="text-lg font-semibold text-gray-900">Records</h1>
                <p className="mt-1 text-sm text-gray-700">All child monitoring records listed below.</p>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 border border-gray-200 rounded-md p-4">
                    <div>
                        <h1 className="flex flex-col text-lg font-semibold text-gray-900">
                            General Records
                            <span className="text-sm text-gray-500">
                                All initial records of all children.
                            </span>
                        </h1>
                    </div>
                    <div>
                        <Link href={'/health_workers/records/0'}
                            className="flex items-center gap-1 px-2 py-1 text-sm rounded-md border border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                        >
                            <DocumentPlusIcon className="w-4 h-4" />
                            <span>Add Record</span>
                        </Link>
                    </div>
                </div>
                {programs.map((program) => (
                    <div key={program.id} className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 border border-gray-200 rounded-md p-4">
                        <div>
                            <h1 className="flex flex-col text-lg font-semibold text-gray-900">
                                {program.title}
                                <span className="text-sm font-medium text-gray-500">
                                    {program.description.length > 100
                                        ? `${program.description.slice(0, 100)}...`
                                        : program.description}
                                </span>
                            </h1>
                        </div>

                        <div>
                            <Link href={`/health_workers/records/${program.id}`}
                                  className="flex items-center gap-1 px-2 py-1 text-sm rounded-md border border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                            >
                                <DocumentPlusIcon className="w-4 h-4" />
                                <span>Add Record</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>


        </WorkerLayout>
    );
}
export default RecordIndex;
